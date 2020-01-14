const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/main.ts'),
    output: {
        filename: 'main.js',
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: [{
            // 好像不用 babel 也 ok (毕竟我 ts 的产物是 es5 的
            //     loader: 'babel-loader',
            // }, {
                loader: 'ts-loader',
                options: {
                    // configFile: 'tsconfig.json',
                    appendTsSuffixTo: [
                        '\\.vue$',
                    ],
                    happyPackMode: false,
                    // 因为 ts 编译后会直接覆写原文件, 导致后续流程处理出错
                    // 这里设置为 true 便可只保留内存中的编译结果, 不再回写
                    // 详见:
                    // https://webpack.toobug.net/zh-cn/chapter6/ts-and-vue.html
                    transpileOnly: true,
                },
            }, ],
        }, {
            test: /\.css$/,
            use: [{
                // 必须加 style-loader 否则样式文件全丢
                loader: 'style-loader',
            }, {
                loader: 'css-loader',
            }, ],
        }, {
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader',
            }, {
                loader: path.resolve(__dirname, '../webpack-snippet-loader'),
            }, ]
        }, ],
    },
    devtool: 'source-map',
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.js', '.vue',],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/public/index.html'),
        }),
    ],
};
