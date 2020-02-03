/**
 * 使用方法详见:
 * https://github.com/webpack/webpack-dev-server/tree/master/examples/api/simple
 */
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const conf = require('../webpack.config');

const compiler = Webpack(conf);
const devServerOptions = Object.assign({}, conf.devServer, {
    open: true,
    stats: {
        colors: true,
    },
});

const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(8080, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:8080');
});
