<template>
    <div>
        <h1>store 用法</h1>
        <p>combineProps: {{combinedProps}}</p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const moduleSubStore = namespace('subStore');

@Component
export default class Store extends Vue {
    @moduleSubStore.Getter('combinedProps') combinedProps!: string;
}
</script>
