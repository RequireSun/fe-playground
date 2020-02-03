<style src="../node_modules/highlight.js/styles/solarized-light.css"></style>
<style type="text/css">
    .markdown-body, .code-area {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
    }

    @media (max-width: 767px) {
        .markdown-body, .code-area {
            padding: 15px;
        }
    }

    .markdown-body+.code-area {
        padding-top: 0;
    }
</style>

<template>
    <div class="markdown-body">
        <h1>使用 .d.ts 为外部引用库提供类型声明补全</h1>
        <p>在 typescript 中使用没有提供 type 声明的外部库时, 会出现 TS2307 错误:</p>
        <img src="./images/TS2307.png" alt="">
        <p>这时我们需要通过安装外部 type 声明库或者手动声明库接口来进行完善.</p>
        <p>安装外部 type 声明库的方法并不是本文的重点, 在此不再赘述.</p>
        <p>根据官方文档, 将对应库的接口进行声明的方法如下:</p>
        <!-- WEBPACK_SNIPPET_LOADER ./types/highlight.js.d.ts#TAG:LIBRARY LANGUAGE:typescript -->
        <p>这样就可以在 typescript 项目中使用对应的外部库了:</p>
        <!-- WEBPACK_SNIPPET_LOADER ./app.vue#TAG:USE LANGUAGE:typescript -->
        <p>操作重点:</p>
        <ol>
            <li>.d.ts 文件一定要放在 src 目录下的 types 目录中 (types 是默认值, 也可在 tsconfig 中进行修改, 但一定要保证整个目录在 tsconfig.js 声明的 include 范围内);</li>
            <li>.d.ts 文件中 <code>declare module</code> 时的模块名一定要与使用时 import 的路径一致;</li>
        </ol>
        <h2>highlight.js 效果</h2>
        <pre>
            <code ref="code-space" v-html="code"></code>
        </pre>
    </div>
</template>

<script lang="ts">
// WEBPACK_SNIPPET_LOADER_GUIDEPOST start:USE
import { Component, Vue } from 'vue-property-decorator';
import hljs from 'highlight.js/lib/highlight.js';

hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));

@Component
export default class App extends Vue {
    private codeOrigin: string =
`
function testFn(argv: any[], argc: number): boolean {
    return argv.every(item => item) && argc === argv.length;
}

console.log(testFn([1, 2, 3, 4], 4));`;

    private get code(): string {
        return hljs.highlight('typescript', this.codeOrigin).value;
    }
}
// WEBPACK_SNIPPET_LOADER_GUIDEPOST end:USE
</script>
