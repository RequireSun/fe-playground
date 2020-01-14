<!-- WEBPACK_SNIPPET_LOADER_GUIDEPOST start:IDEA start:VSCODE -->
<template>
    <div>
        <!-- WEBPACK_SNIPPET_LOADER_GUIDEPOST end:IDEA end:VSCODE -->
        <h1>自定义组件</h1>
        <h2>IDEA & VSCode 都不会报错的方法</h2>
        <!-- WEBPACK_SNIPPET_LOADER_GUIDEPOST start:IDEA -->
        <em>idea-component.vue</em>
        <!-- WEBPACK_SNIPPET_LOADER_GUIDEPOST end:IDEA -->
        <!-- WEBPACK_SNIPPET_LOADER ../components/idea-component.vue -->
        <!-- WEBPACK_SNIPPET_LOADER_GUIDEPOST start:IDEA -->
        <idea-component ref="ic"></idea-component>
        <!-- WEBPACK_SNIPPET_LOADER_GUIDEPOST end:IDEA -->
        <em>index.vue</em>
        <!-- WEBPACK_SNIPPET_LOADER ./index.vue#TAG:IDEA -->
        <button @click="handleClickIdea">click +1 (outer)</button>
        <h2>IDEA 会报错 VSCode 不会报错的方法</h2>
        <em>vscode-component.vue</em>
        <!-- WEBPACK_SNIPPET_LOADER ../components/vscode-component.vue -->
        <vscode-component ref="vc"></vscode-component>
        <button @click="handleClickVscode">click +1 (outer)</button>
        <!-- WEBPACK_SNIPPET_LOADER_GUIDEPOST start:IDEA -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IdeaComponent, { FixComponent as FixIdeaComponent } from '../components/idea-component.vue';
/* WEBPACK_SNIPPET_LOADER_GUIDEPOST end:IDEA */
import VscodeComponent from '../components/vscode-component.vue';
// WEBPACK_SNIPPET_LOADER_GUIDEPOST start:IDEA

@Component({
    components: {
        IdeaComponent,
        // WEBPACK_SNIPPET_LOADER_GUIDEPOST end:IDEA
        VscodeComponent,
        /* WEBPACK_SNIPPET_LOADER_GUIDEPOST start:IDEA */
    },
})
export default class Index extends Vue {
    $refs!: {
        ic: FixIdeaComponent,
        /* WEBPACK_SNIPPET_LOADER_GUIDEPOST end:IDEA */
        vc: VscodeComponent,
        /* WEBPACK_SNIPPET_LOADER_GUIDEPOST start:IDEA */
    };

    handleClickIdea() {
        // VSCode IDEA 都正常工作
        this.$refs.ic.increase();
    }
    /* WEBPACK_SNIPPET_LOADER_GUIDEPOST end:IDEA */

    handleClickVscode() {
        // VSCode 正常工作
        // IDEA 会提示找不到方法的错误 (TS2339), 但是 ctrl + 左键还是能正常跳转到定义位置
        this.$refs.vc.increase();
    }
    /* WEBPACK_SNIPPET_LOADER_GUIDEPOST start:IDEA */
}
</script>
<!-- WEBPACK_SNIPPET_LOADER_GUIDEPOST end:IDEA -->
