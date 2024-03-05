/**
 * @file wepack dev
 */

const {merge} = require('webpack-merge');
// 公共配置文件
const webpackCommonConfig = require('./webpack.common');
// 开发服务
const devServer = require('./webpack.devServer');
// 环境变量
const { MODE_DEVELOPMENT } = require('./webpack.env');

module.exports = () => {
    return merge(webpackCommonConfig, {
        mode: MODE_DEVELOPMENT, // 开发环境
        watchOptions: {
            ignored: /node_modules/,
        },
        devServer
    });
};
