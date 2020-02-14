<template>
    <div class="markdown-body">
        <h1>shims 原理解析</h1>
        <p>shims 的核心原理就是 <code>module</code> 关键字的通配符匹配</p>
        <p>通过 <code>*</code> 与所有 <code>.vue</code> 结尾的文件进行配对, 声明它们的输出为我们所编写的内容</p>
        <p><i>标准 shims-vue.d.ts:</i></p>
        <!-- WEBPACK_SNIPPET_LOADER ./types/shims-vue.d.ts#TAG:ORIGIN LANGUAGE:typescript -->
        <p>内容两行就比较简单:</p>
        <p>第一行引入 Vue 的解构声明</p>
        <p>第二行声明所有 '*.vue' 的模块的 export default 均是标准 vue 模块</p>
        <h2>进阶使用</h2>
        <p>也许你会发现, 自定义组件向外暴露的方法因为没有定义, 在父组件调用时会报错</p>
        <img src="./images/TS2339.png" />
        <p>这是因为他们在 import 时被覆盖声明为了标准的 vue 输出</p>
        <p>此时我们可以通过在调用者模块中通过继承的方式为组件扩展对应方法:</p>
        <p><i>parent.vue</i></p>
        <pre>
            <code>
import ComponentA from 'xxx/componentA.vue';
declare class ComponentB extends ComponentA {
    method(): void;
}
            </code>
        </pre>
        <p>这样确实可以实现我们想要的效果, 但是声明和实现分离, 并且用一次声明一次, 非常麻烦</p>
        <p>这时我们就可以使用通配符的特性进行声明的扩展:</p>
        <p><i>shims-vue.d.ts</i></p>
        <!-- WEBPACK_SNIPPET_LOADER ./types/shims-vue.d.ts#TAG:CUSTOM LANGUAGE:typescript -->
        <p><i>Ps: 请一定将此声明放在 <code>module '*.vue'</code> 的声明之前, 因为 ts 在解析到第一个声明之后便不会继续向后寻找, 所以我们的自定义组件声明会被原生对象覆盖</i></p>
        <p><i>Ps2: 另外这个 module 是字符串的强匹配的, 并不会非常智能的定义到相应模块的位置, 所以请谨慎编写通配符字符串, 不要殃及无辜</i></p>
        <p>这样之后, 我们只需要在父组件中进行一下声明即可生效:</p>
        <p><i>parent.vue</i></p>
        <!-- WEBPACK_SNIPPET_LOADER ./App.vue#TAG:CUSTOM LANGUAGE:typescript -->
        <p>上面的代码声明了 <code>$refs</code> 中的 <code>cp_a</code> 为 <code>ComponentA</code> 类型组件, 这样 <code>cp_a</code> 便自动拥有了 <code>changeColor</code> 方法</p>
        <h2>效果展示</h2>
        <component-a ref="cp_a"></component-a>
        <button @click="handleClick">change color</button>
    </div>
</template>

<script lang="ts">
    // WEBPACK_SNIPPET_LOADER_GUIDEPOST start:CUSTOM
    import { Component, Vue } from 'vue-property-decorator';
    import ComponentA from './component/componentA.vue';

    @Component({
        components: {
            ComponentA,
        },
    })
    export default class App extends Vue {
        $refs!: {
            cp_a: ComponentA;
        };

        handleClick() {
            this.$refs.cp_a.changeColor();
        }
    }
    // WEBPACK_SNIPPET_LOADER_GUIDEPOST end:CUSTOM
</script>
