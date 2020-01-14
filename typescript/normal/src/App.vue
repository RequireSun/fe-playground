<template>
    <index></index>
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
