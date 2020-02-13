// 该扩展的实现
console.plainMyObj = (obj: MyObj) => console.log(obj.str, obj.num);

// 调用
console.plainMyObj({
    str: '',
    num: 0,
});
