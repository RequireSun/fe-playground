const webpack = require('webpack');
const conf = require('../webpack.config');

webpack(conf, (err, stats) => {
    if (err || stats.hasErrors()) {
        // 在这里处理错误
        console.error(err);
        // 处理完成
        console.log(stats.toString({
            chunks: false,  // 使构建过程更静默无输出
            colors: true    // 在控制台展示颜色
        }));
    } else {
        // 处理完成
        console.log(stats.toString({
            chunks: false,  // 使构建过程更静默无输出
            colors: true    // 在控制台展示颜色
        }));
    }
});
