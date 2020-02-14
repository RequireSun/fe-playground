<template>
    <div>
        <h1 :style="{backgroundColor:colors[colorIndex]}">Hello, world!</h1>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class App extends Vue {
        colors: string[] = ['red', 'green', 'blue'];
        colorIndex: number = 0;
        changeColor() {
            this.colorIndex = (this.colorIndex + 1) % this.colors.length;
        }
    }
</script>
