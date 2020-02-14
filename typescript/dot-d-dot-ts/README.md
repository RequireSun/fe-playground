.d.ts 小教程
===

## 引用库类型补齐

目前有许多第三方库未提供接口声明的 .d.ts 文件, 因而在使用时会引起 TS2307 错误, 此时便需要自行手动补齐我们所需的接口声明.

详情请见:

[fix-library](fix-library)

## 为外部使用者提供接口声明

当我们编写 npm 包时, 需要为 typescript 的使用者生成接口定义, 否则他们就需要像上面的 case 一样自己编写接口声明, 非常不便.

详情请见:

[export-library](export-library)

[user](user)

## 项目内部全局结构声明

有时有些 interface / type 声明使用范围十分广阔, import 与 export 十分繁琐. 此时我们可以将这些声明统一提取到全局声明的文件中, 减少冗余代码.

详情请见:

[global-usage](global-usage)
