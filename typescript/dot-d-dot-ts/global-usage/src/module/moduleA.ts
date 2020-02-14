// 该扩展的实现
console.plainSpecificObj = (obj: SpecificObj) => console.log(obj.str1, obj.str2, enumA.a);

// 调用 (运行时因为 enum 报错)
console.plainSpecificObj({
    str1: '1',
    str2: '2',
    enum: enumA.a,
});

// 以下代码编译会报错

// // 该扩展的实现
// console.plainSpecificObj2x = (obj: SpecificObj2) => console.log(obj.num1, obj.num2);
//
// // 调用
// console.plainSpecificObj2x({
//     num1: 1,
//     num2: 2,
// });

// 该扩展的实现
console.plainSpecificObj2 = (obj: SpecificObj2) => console.log(obj.num1, obj.num2);

// 调用
console.plainSpecificObj2({
    num1: 1,
    num2: 2,
});


// 该扩展的实现
console.plainSpecificObj3 = (obj: SpecificObj3) => console.log(obj.num3);

// 调用
console.plainSpecificObj3({
    num3: 1,
});
