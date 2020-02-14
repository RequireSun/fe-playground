<template>
    <div>
        <component-a ref="cp_a"></component-a>
        <button @click="handleClick">change color</button>
    </div>
</template>

<script lang="ts">
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
</script>
