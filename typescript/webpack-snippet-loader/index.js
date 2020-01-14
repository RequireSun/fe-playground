/**
 * 很简单的功能, 没必要用语法解析树, 以后用到再改
 */
// const { getOptions } = require('loader-utils');
const fs = require('fs');
const path = require('path');
const hljs = require('highlight.js/lib/highlight.js');
const hljsDefineVue = require('highlightjs-vue/dist/highlightjs-vue.esm');
const regex = /\s*<!--\s*WEBPACK_SNIPPET_LOADER\s*([\w-./]+)\s*-->\s*/g;

hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljsDefineVue(hljs);

function htmlEncode(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/ /g, '&nbsp;')
        .replace(/'/g, '&#39;')
        .replace(/"/g, '&quot;')
        .replace(/"/g, '&quot;')
        // vue 会自动解析 html 内的 {{}} 所以直接在这里转义了
        .replace(/{{/g, '<span v-text="\'{{\'"/>')
        .replace(/}}/g, '<span v-text="\'}}\'"/>');
}

function vueQuoteEncode(str) {
    return str
        // vue 会自动解析 html 内的 {{}} 所以直接在这里转义了
        .replace(/{{/g, '<span v-text="\'{{\'"/>')
        .replace(/}}/g, '<span v-text="\'}}\'"/>');
}

module.exports = function(source) {
    // const options = getOptions(this);
    const { resourcePath } = this;

    return source.replace(regex, (allTag, filePath, startPos, allStr) => {
        filePath = path.resolve(path.dirname(resourcePath), filePath);
        return `<pre code-snippet><code>${vueQuoteEncode(hljs.highlight('vue', fs.readFileSync(filePath, {
            encoding: 'utf-8',
        })).value)}</code></pre>`;
    });
};
