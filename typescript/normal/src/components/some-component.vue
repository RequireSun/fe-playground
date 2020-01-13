<template>
    <div>
        <p>count:{{count}}</p>
        <button @click="handleClick">click +1 (inner)</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SomeComponent extends Vue {
    count: number = 0;

    public handleClick() {
        this.count += 1;
    }
}
</script>
