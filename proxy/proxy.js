/**
 * 按理来说可以监控到所有属性的变动, 但这里只模拟了 watch 某些属性的 case
 */
// ES6 with Proxy
function tracePropAccess(obj, propKeys) {
    const propKeySet = new Set(propKeys);
    return new Proxy(obj, {
        get(target, propKey, receiver) {
            if (propKeySet.has(propKey)) {
                console.log(`GET ${propKey}`);
            }
            return Reflect.get(target, propKey, receiver);
        },
        set(target, propKey, value, receiver) {
            if (propKeySet.has(propKey)) {
                console.log(`SET ${propKey} = ${value}`);
            }
            return Reflect.set(target, propKey, value, receiver);
        },
    });
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `Point( ${this.x} , ${this.y} )`;
    }
}

p = tracePropAccess(new Point(7), ['x', 'y']);
p.x; // GET x
p.x = 666; // SET x = 666
p.toString();
// GET x
// GET y

console.log('========== ========== ==========');

/**
 * 有关 this 指向的问题, this 还是指向了 target
 */
const obj1 = {
    myObj: 1
};

Object.setPrototypeOf(obj1, new Proxy({
    test: 123
}, {
    get(target, property, receiver) {
        // 这里不能打印, 因为打印 target 时需要遍历 target 的所有属性
        // (仅限 node 环境, 因为浏览器环境下会直接打印对象引用, 所以不会有这个问题)
        // console.log(target, property, receiver);
        return 1;
    }
}));

console.log(obj1.test);
// {test: 123}, "test" ,{myObj: 1}
// 可以看见 receiver 是最初被调用的对象, target 是指向的真正目标 (proxy 之源)

console.log('========== ========== ==========');

const obj2 = {
    multiply(x, y) {
        return x * y;
    },
    squared(x) {
        // 在第二次调用时, 这里的 this 很明显是指向了 proxy
        // 从逻辑上来讲, 第一次的 squared 是获取到了一个被 proxy 包裹的原函数
        // get 之后进入被包裹的函数进行执行, 此时 this 还是指向了外面那个 proxy 了的对象
        // 所以此时再从 this 上执行 multiply, 又会再次回到 proxy 的 get 包装中
        return this.multiply(x, x);
    },
};

function traceMethodCalls(obj) {
    const handler = {
        get(target, propKey, receiver) {
            const origMethod = Reflect.get(target, propKey, receiver);
            // 这里因为是直接返回一个函数, 所以 this 的指向还是被调用方 (. 前面的那个对象)
            return function (...args) {
                const result = origMethod.apply(this, args);
                console.log(`${propKey}${JSON.stringify(args)} -> ${JSON.stringify(result)}`);
                return result;
            };
        }
    };
    return new Proxy(obj, handler);
}
const tracedObj = traceMethodCalls(obj2);

console.log(tracedObj.multiply(2,7));
// multiply[2,7] -> 14
// test.js:25 14
console.log(tracedObj.squared(9));
// multiply[9,9] -> 81
// test.js:16 squared[9] -> 81
// test.js:26 81

