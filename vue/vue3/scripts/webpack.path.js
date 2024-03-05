/**
 * @file wepack 路径配置
 */

const path = require('path');

// 获取根目录
const projectPath = path.resolve(__dirname, '../');
// 获取绝对路径
const getAbsolutePath = relativePath => {
    return path.resolve(projectPath, relativePath);
};

module.exports = {
    // webpack 入口文件
    INDEX_JS: getAbsolutePath('./src/index.js'),
    // index.html文件
    INDEX_HTML: getAbsolutePath('./public/index.html'),
    // webpack 输入路径
    DIST: getAbsolutePath('./dist'),
    // 资源文件夹名称
    STATIC_ASSET_NAME: 'asset',
    // 文件目录
    SRC_PATH: path.resolve(__dirname, '../src/')
};