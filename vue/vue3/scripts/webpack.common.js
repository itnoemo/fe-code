/**
 * @file wepack common
 */
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 访问内置的插件
const PATH = require('./webpack.path');
const { getEnv, JSSDK_PATH_MAP, MODE_DEVELOPMENT } = require('./webpack.env');
const { VueLoaderPlugin } = require("vue-loader");

const nodeMode = process.env.NODE_MODE;
const isDev = nodeMode === MODE_DEVELOPMENT;

module.exports = {
    // 主入口
    entry: {
        main: PATH.INDEX_JS
    },
    // 输出
    output: {
        path: PATH.DIST,
        filename: PATH.STATIC_ASSET_NAME + '/js/[name].[hash:8].js',
        chunkFilename: PATH.STATIC_ASSET_NAME + '/js/[name].[chunkhash:8].js',
        clean:true,
        pathinfo: true
    },
    // 加载器
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: ['/node_modules/'],
                use: 'babel-loader'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.css$/i,
                use: [ 'style-loader', 'css-loader' ]
            }, {
                test: /\.less$/,
                use: [ 'style-loader', 'css-loader', 'less-loader' ]
            }, {
                test: /\.vue$/,
                use: 'vue-loader'
            }, {
                test: /\.(jpg|png|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'asset/img/[hash][ext][query]'
                }
            }
        ]
    },
    target: 'web',
    resolve: {
        alias: {
            src: PATH.SRC_PATH
        },
        mainFiles: ['index', 'Index'],
        extensions: ['.vue', '.js', '.json', '.css'],
        fallback: {
            path: require.resolve('path-browserify')
        }
    },
    // 插件
    plugins: [
        // 定义编译变量
        new webpack.DefinePlugin(getEnv().stringified),
        // 编译过程
        new webpack.ProgressPlugin(),
        // html模板
        new HtmlWebpackPlugin({
            template: PATH.INDEX_HTML,
            jssdkPath: JSSDK_PATH_MAP[nodeMode]
        }),
        new VueLoaderPlugin()
    ]
};
