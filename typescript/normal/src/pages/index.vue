<template>
    <div>
        <h1>自定义组件</h1>
        <h2>IDEA & VSCode 都不会报错的方法</h2>
        <em>idea-component.vue</em>
        <!-- WEBPACK_SNIPPET_LOADER ../components/idea-component.vue -->
        <idea-component ref="ic"></idea-component>
        <em>index.vue</em>
        <!-- WEBPACK_SNIPPET_LOADER ./index.vue#L1-L2L7L10L16-L18L19-L21L23-L26L28-L32L34-L39L46-L47 -->
        <button @click="handleClickIdea">click +1 (outer)</button>
        <h2>IDEA 会报错 VSCode 不会报错的方法</h2>
        <em>vscode-component.vue</em>
        <!-- WEBPACK_SNIPPET_LOADER ../components/vscode-component.vue -->
        <vscode-component ref="vc"></vscode-component>
        <button @click="handleClickVscode">click +1 (outer)</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IdeaComponent, { FixComponent as FixIdeaComponent } from '../components/idea-component.vue';
import VscodeComponent from '../components/vscode-component.vue';

@Component({
    components: {
        IdeaComponent,
        VscodeComponent,
    },
})
export default class Index extends Vue {
    $refs!: {
        ic: FixIdeaComponent,
        vc: VscodeComponent,
    };

    handleClickIdea() {
        // VSCode IDEA 都正常工作
        this.$refs.ic.increase();
    }

    handleClickVscode() {
        // VSCode 正常工作
        // IDEA 会提示找不到方法的错误 (TS2339), 但是 ctrl + 左键还是能正常跳转到定义位置
        this.$refs.vc.increase();
    }
}
</script>
