interface SpecificObj {
    str1: string;
    str2: string;
    enum: enumA;
}

interface Console {
    plainSpecificObj(obj: SpecificObj): void;
}

declare enum enumA {
    a = 1,
    b = 2,
}
