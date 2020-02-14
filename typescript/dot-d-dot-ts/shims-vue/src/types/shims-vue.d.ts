
declare module '*componentA.vue' {
    import { Vue } from 'vue-property-decorator';
    export default class ComponentA extends Vue {
        changeColor(): void;
    }
}

declare module '*.vue' {
    import { Vue } from 'vue-property-decorator';
    export default Vue;
}
