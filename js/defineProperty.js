const obj = {
    name: '张三',
    info: {
        age: 12,
        sex: '男'
    }
};

function reactive(obj) {
    // 判断是否是对象类型
    if (obj === null || typeof obj !== 'object') {
        console.error('参数无效');
        return;
    }
    // 结果
    const result = {};
    // deep属性
    const deepAttr = dObj => {
        Object.keys(dObj).forEach(key => {
            const value = dObj[key];
            const valType = typeof value;
            // 不是对象类型,则直接设置
            if (valType !== 'object') {
                Object.defineProperty(dObj, key, {
                    set: value => {
                        dObj[key] = value;
                        console.log('属性被设置');
                    },
                    get: () => {
                        console.log('属性被访问');
                        return dObj[key];
                    }
                });
            } else {
                // 对象类型
                deepAttr(value);
            }
        });
    };
    deepAttr(obj);
    return obj;
}
const foo = reactive({
    name: 'test',
    info: {
      age: 18,
      job: '前端',
    }
})
foo.info.job // 打印 job被读取
foo.info.age = 6 // 打印 age被修改为6

