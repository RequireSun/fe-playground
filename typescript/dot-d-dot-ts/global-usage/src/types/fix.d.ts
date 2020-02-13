// 自定义接口, 整个项目随处可用 (但编译后并不会暴露给外部使用者)
declare interface MyObj {
    str: string;
    num: number;
}

// 向全局对象上扩展方法
declare interface Console {
    plainMyObj(obj: MyObj): void;
}
