const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];

if (!filePath) {
    console.error('please input file path');
}

function vm2(code, sandbox = Object.create(null)) {
    const fn = new Function('sandbox',
        `const obj = Object.create(null);
        obj.fn = function () {
            with(sandbox) {
                ${code}
            }
        };
        return obj.fn();`
    );
    const proxy = new Proxy(sandbox, {
        has(target, key) {
            // 让动态执行的代码认为属性已存在
            return true;
        },
        get(target, PropertyKey) {
            if (PropertyKey === 'console') {
                return console;
            } else {
                return undefined;
            }
        }
    });
    return fn(proxy);
}

const content = fs.readFileSync(path.join(process.cwd(), filePath));
vm2(content);
