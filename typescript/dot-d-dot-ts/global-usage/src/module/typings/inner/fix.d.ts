// 文件不在 types 目录中, 无效
declare interface SpecificObj3 {
    num3: number;
}

declare interface Console {
    plainSpecificObj3(obj: SpecificObj3): void;
}
