虽然 new Function 的作用域永远在全局

但是有个很奇怪的现象:

Node 环境下只会找直接声明在 global 上的属性

而浏览器环境则会寻找 window 上 & 全局 var 变量

node 环境还特别神奇, 在 console 里直接执行的语句, var a 可以挂到 global 上

但是脚本中执行的 var a, 却挂不到 global 上 (也没有挂到 this 上)
