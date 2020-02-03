// WEBPACK_SNIPPET_LOADER_GUIDEPOST start:LIBRARY
declare module 'highlight.js/lib/highlight.js' {
    export function registerLanguage(langName: string, langConf: any): any;
    export function highlight(langName: string, codeCtx: string): any;
}

declare module 'highlight.js/lib/languages/typescript' {
    export default any;
}
// WEBPACK_SNIPPET_LOADER_GUIDEPOST end:LIBRARY
