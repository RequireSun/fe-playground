// WEBPACK_SNIPPET_LOADER_GUIDEPOST start:CUSTOM
declare module '*componentA.vue' {
    import { Vue } from 'vue-property-decorator';
    export default class ComponentA extends Vue {
        changeColor(): void;
    }
}
// WEBPACK_SNIPPET_LOADER_GUIDEPOST end:CUSTOM

// WEBPACK_SNIPPET_LOADER_GUIDEPOST start:ORIGIN
declare module '*.vue' {
    import { Vue } from 'vue-property-decorator';
    export default Vue;
}
// WEBPACK_SNIPPET_LOADER_GUIDEPOST end:ORIGIN
