/**
 * 因为在沙箱中运行
 */
const vm = require('vm');
const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];

if (!filePath) {
    console.error('please input file path');
}

const content = fs.readFileSync(path.join(process.cwd(), filePath));

try {
    const sandbox = {};
    const script = new vm.Script(content);
    const context = vm.createContext(sandbox);
    script.runInContext(context);
} catch (ex) {
    console.error('wtf');
}
