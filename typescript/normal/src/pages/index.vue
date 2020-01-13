<template>
    <div>
        <h1>hello</h1>
        <some-component></some-component>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SomeComponent from '../components/some-component.vue';

@Component({
    components: {
        SomeComponent,
    },
})
export default class Index extends Vue {}
</script>
