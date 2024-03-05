const _instanceof = (obj, fun) => {
    // 未找到
    if (obj === null) {
        return false;
    }
    // 找到
    if (obj.__proto__ === fun.prototype) {
        return true;
    } else {
        return _instanceof(obj.__proto__, fun);
    }
};
const a = {};
const b = 1;
const c = '1111';
const d = [];
const e = function (){}
console.log(_instanceof(a, Object));
console.log(_instanceof(a, Number));
console.log(_instanceof(b, Object));