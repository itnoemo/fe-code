/**
* @file webpack env 编译常量
*/


const MODE_DEVELOPMENT = 'development'; // 开发环境
const MODE_PRODUCTION = 'production'; // 生产环境

// 获取定义的变量值
const getEnv = () => {
    const raw = process.env;

    // 字段前缀
    const environmentPrefix = 'process.env';
    const stringified = {};

    Object.keys(raw).forEach(key => {
        stringified[`${environmentPrefix}.${key}`] = JSON.stringify(raw[key]);
    });
    return {raw, stringified};
};

module.exports = {
    MODE_DEVELOPMENT,
    MODE_PRODUCTION,
    getEnv
};