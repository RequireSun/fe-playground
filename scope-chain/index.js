// 直接写到 global 上也可以
global.b = 2;
// 隐式声明到 global 上就可以读到
c = 3;
// var 到作用域上就不行
var d = 4;
// 所以会因为找不到 d 而报错
// 这里和直接声明一个函数时绑定的作用域链相同
const foo = new Function(
    'a',
    `
console.log(a);
console.log(b);
console.log(c);
try { 
    console.log(d); 
} catch(ex) { 
    console.error('d error'); 
} `
);
foo(1);

const bar = function (fn) {
    var b = 3;
    var c = 4;
    var d = 5;
    return fn(1);
};

bar(foo);

var e = 1;
var f = 2;
var g = 3;
var h = 4;

const loop1 = () => {
    var f = 5;
    return function loop2 () {
        var g = 6;
        return function loop3 () {
            var h = 7;
            // 很明显是找到 global 上去了
            return new Function('console.log(e, f, g, h);');
        };
    };
};

console.log(loop1()()()());
