/**
 * @file 获取url中参数值
 */

const getQueryString = name => {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const r = location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return '';
};

export default getQueryString;
