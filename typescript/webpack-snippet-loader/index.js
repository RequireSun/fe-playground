/**
 * 很简单的功能, 没必要用语法解析树, 以后用到再改
 * 如何编写 loader
 * https://webpack.docschina.org/contribute/writing-a-loader/
 */
// const { getOptions } = require('loader-utils');
const fs = require('fs');
const path = require('path');
const hljs = require('highlight.js/lib/highlight.js');
const hljsDefineVue = require('highlightjs-vue/dist/highlightjs-vue.esm');

const regex = /^\s*<!--\s*WEBPACK_SNIPPET_LOADER\s*([\w-./#:]+)\s*-->\s*$/gm;
const regexGuidepostHtml = /^\s*<!--\s*WEBPACK_SNIPPET_LOADER_GUIDEPOST((?:\s(?:start|end):\w+)+)\s*-->\s*$/m;
const regexGuidepostJavascript1 = /^\s*\/\*\s*WEBPACK_SNIPPET_LOADER_GUIDEPOST((?:\s(?:start|end):\w+)+)\s*\*\/\s*$/m;
const regexGuidepostJavascript2 = /^\s*\/\/\s*WEBPACK_SNIPPET_LOADER_GUIDEPOST((?:\s(?:start|end):\w+)+)\s*$/m;

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
        let parts;
        let tag;

        if (filePath.includes('#')) {
            const strParts = filePath.slice(filePath.indexOf('#') + 1);
            filePath = filePath.slice(0, filePath.indexOf('#'));

            if (strParts.startsWith('TAG:')) {
                tag = strParts.replace(/^TAG:/, '');
            } else {
                parts = [];

                const regexParts = /(L\d+(?:-L\d+)?)/g;
                let regRes;

                while(regRes = regexParts.exec(strParts)) {
                    parts.push(regRes[0]);
                }

                parts = parts.map(part => {
                    if (part.includes('-')) {
                        const [start, end] = part.split('-');

                        return {
                            start: start.replace(/^L/, ''),
                            end: end.replace(/^L/, ''),
                        };
                    } else {
                        return {
                            start: part.replace(/^L/, ''),
                            end: part.replace(/^L/, ''),
                        };
                    }
                });

                if (!parts.length) {
                    parts = undefined;
                }
            }
        }

        filePath = path.resolve(path.dirname(resourcePath), filePath);
        let fileContent = fs.readFileSync(filePath, {
            encoding: 'utf-8',
        });

        if (parts) {
            fileContent = fileContent.split('\n');
            fileContent = parts.map(({ start, end }) => {
                // 因为行号从 0 开始, 故开始位置 -1
                return fileContent.slice(start - 1, end).join('\n');
            }).join('\n');
        }

        if (tag) {
            const regexTag = new RegExp(`^(start|end):${tag}$`);
            fileContent = fileContent.split('\n');
            let isStart = false;

            fileContent = fileContent.reduce((lines, cur, index) => {
                let matchRes;

                // 利用 if 语句的阻断原理, 某一步匹配到了, 后面的 match 就不会执行了
                if (matchRes = cur.match(regexGuidepostHtml)) {
                } else if (matchRes = cur.match(regexGuidepostJavascript1)) {
                } else if (matchRes = cur.match(regexGuidepostJavascript2)) {
                }

                if (matchRes) {
                    // 分拆寻找 tag
                    const tags = matchRes[1].split(' ').filter(item => item);
                    const stat = tags.find(_t => regexTag.test(_t));
                    if (stat) {
                        // true 开始 false 结束 其他不管
                        isStart = stat.startsWith('start') ? true : (stat.startsWith('end') ? false : isStart);
                    }
                    // 如果本行是标记行, 跳过, 不要加到输出里去
                    return lines;
                }

                if (isStart) {
                    lines.push(cur);
                }

                return lines;
            }, []).join('\n');
        }

        return `<pre code-snippet><code>${vueQuoteEncode(hljs.highlight('vue', fileContent).value)}</code></pre>`;
    });
};
