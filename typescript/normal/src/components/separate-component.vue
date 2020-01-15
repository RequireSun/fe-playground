<template>
    <div>
        <p>count:{{count}}</p>
        <button @click="increase">click +1 (inner)</button>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class SeparateComponent extends Vue {
        count: number = 0;

        public increase() {
            this.count += 1;
        }
    }
</script>
