/**
 * @file webpack.dev.server 配置
 */

const PATH = require('./webpack.path');

module.exports = {
    // 告诉服务器从哪里提供内容
    static: {
        directory: PATH.DIST
    },
    // 一切服务都启用gzip 压缩
    compress: true,
    port: 9000,
    // 启动时打开浏览器
    open: true,
    client: {
        // 'log' | 'info' | 'warn' | 'error' | 'none' | 'verbose' : 允许在浏览器中设置日志级别
        logging: 'info',
        // 当出现编译错误或警告时，在浏览器中显示全屏覆盖
        overlay: true
    },
    historyApiFallback: true
};