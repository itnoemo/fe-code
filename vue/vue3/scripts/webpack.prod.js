/**
 * @file wepack prod
 */

const {merge} = require('webpack-merge');
// 公共配置文件
const webpackCommonConfig = require('./webpack.common');

const { MODE_PRODUCTION } = require('./webpack.env');

module.exports = () => {
    return merge(webpackCommonConfig, {
        mode: MODE_PRODUCTION // 生产环境
    });
};