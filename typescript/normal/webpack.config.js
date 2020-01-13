const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    output: {
        filename: 'main.js',
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: [{
                loader: 'babel-loader',
            }, {
                loader: 'ts-loader',
                options: {
                    // configFile: 'tsconfig.json',
                    appendTsSuffixTo: [
                        '\\.vue$',
                    ],
                    happyPackMode: false,
                    transpileOnly: true,
                },
            }, ],
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
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
            template: 'src/public/index.html',
        }),
    ],
};
