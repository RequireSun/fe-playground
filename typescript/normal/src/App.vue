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
        <index></index>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Index from './pages/index.vue';

@Component({
    components: {
        Index,
    },
})
export default class App extends Vue {}
</script>
