declare module "*/components/separate-component.vue" {
    import { Vue } from 'vue-property-decorator';
    export default class SeparateComponent extends Vue {
        increase(): void;
    }
}

// 告诉 TypeScript *.vue 后缀的文件交给 vue 来处理
declare module "*.vue" {
    import { Vue } from 'vue-property-decorator';
    export type FixComponent = Vue & any;
    export default Vue;
}
