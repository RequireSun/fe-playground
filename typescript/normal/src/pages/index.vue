<template>
    <div>
        <h1>hello</h1>
        <some-component ref="sc"></some-component>
        <button @click="handleClick">click +1 (outer)</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SomeComponent, { FixComponent as FixSomeComponent } from '../components/some-component.vue';

@Component({
    components: {
        SomeComponent,
    },
})
export default class Index extends Vue {
    $refs!: {
        sc: FixSomeComponent,
    };

    handleClick() {
        this.$refs.sc.increase();
    }
}
</script>
