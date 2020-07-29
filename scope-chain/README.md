虽然 new Function 的作用域永远在全局

但是有个很奇怪的现象:

Node 环境下只会找直接声明在 global 上的属性

而浏览器环境则会寻找 window 上 & 全局 var 变量
