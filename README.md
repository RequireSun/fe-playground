测试场
===

GitHub Page 地址: [https://requiresun.github.io/fe-playground/](https://requiresun.github.io/fe-playground/)

## 开始

```
yarn start
```

## 目录

### [Web Component](./web-components)

Polymer 看了下，其实也是个 mvvm 框架，不想再操心了。

+ [inline.html](./web-components/inline.html)

    内联在 html 文件里的写法，来源：
    
    [https://zhuanlan.zhihu.com/p/48811872](https://zhuanlan.zhihu.com/p/48811872)

+ [js-module.html](./web-components/js-module.html)

    独立的 js 模块声明，来源（html 独立文件版本的）：
    
    [https://stackoverflow.com/questions/52435955/use-of-template-with-html-custom-elements](https://stackoverflow.com/questions/52435955/use-of-template-with-html-custom-elements)

+ [wasted.html](./web-components/wasted.html)

    实在是实现不出来，看样子 html-modules 提案是没有实现，来源：
    
    [https://github.com/w3c/webcomponents/blob/gh-pages/proposals/html-modules-proposal.md](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/html-modules-proposal.md)

    看起来之前的支持已经被移除了：
    
    [https://developers.google.com/web/updates/2019/07/web-components-time-to-upgrade](https://developers.google.com/web/updates/2019/07/web-components-time-to-upgrade)

    这个 Polyfill 并不好用：
    
    [https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs)

    一个已经过期的 Polyfill：
    
    [https://github.com/webcomponents/html-imports](https://github.com/webcomponents/html-imports)

+ [complex.html](./web-components/complex.html)

    一个综合性的 demo，API 都用了一下，参考 MDN 比较好用的文档：
    
    [https://developer.mozilla.org/zh-CN/docs/Web/Web_Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)
