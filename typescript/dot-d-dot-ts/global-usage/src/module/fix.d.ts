// 文件不在 types 目录中, 无效
declare interface SpecificObj2 {
    num1: number;
    num2: number;
}

declare interface Console {
    plainSpecificObj2(obj: SpecificObj2): void;
}
