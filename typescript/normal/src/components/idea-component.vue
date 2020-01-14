<template>
    <div>
        <p>count:{{count}}</p>
        <button @click="increase">click +1 (inner)</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export interface FixComponent extends IdeaComponent {
    increase(): void;
}

@Component
export default class IdeaComponent extends Vue {
    count: number = 0;

    public increase() {
        this.count += 1;
    }
}
</script>
