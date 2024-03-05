// 深拷贝
// 1、通过 JSON 对象实现深拷贝, * 无法实现对对象中方法的深拷贝
//通过js的内置对象JSON来进行数组对象的深拷贝
function deepClone2(obj) {
    var _obj = JSON.stringify(obj),
    objClone = JSON.parse(_obj);
    return objClone;
}
// 2、Object.assign()拷贝, * 当对象中只有一级属性，没有二级属性的时候，此方法为深拷贝，但是对象中有对象的时候，此方法，在二级属性以后就是浅拷贝。
// 3、lodash函数库实现深拷贝, lodash.cloneDeep()实现深拷贝
// 4、自定义
const cloneDeep = (obj) => {
    let result = obj instanceof Array ? [] : {};
    // obj && 对象类型
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            // 对象类型
            const val = obj[key];
            const type = typeof val;
            // 对象
            if (type === 'object') {
                result[key] = cloneDeep(val);
            } else {
                result[key] = val;
            }
        }
    }
    return result;
};

const obj = {
    name: '张三',
    info: {
        age: 12,
        getAge: function () {
            return this.age;
        }
    }
};
var a = cloneDeep(obj);
a.info.age = 14;
console.log(a.info.getAge());