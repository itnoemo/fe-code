/**
 * 什么是响应式?
 *      1、表面上: 数据的修改导致页面上数据实时更新
 *      2、实质上: 数据的修改触发函数的调用
 */
// 简易版响应式代码逻辑
function defineObj(obj) {
    // 循环遍历数据
    for(let key in obj) {
        // 定义原始值
        let currValue = obj[key];
        // 定义依赖集
        let funcs = [];
        Object.defineProperty(obj, key, {
            get: function () {
                // 依赖收集, 记录使用此数据的函数, 每次运行函数时将使用当前变量的函数保存到临时变量中并且收集对应的函数
                if (window.__func && !funcs.includes(window.__func)) {
                    funcs.push(window.__func);
                }
                return currValue;
            },
            set: function (value) {
                currValue = value;
                // 派发更新
                for (let i = 0; i < funcs.length; i++) {
                    funcs[i]();
                }
            }
        })
    }
}
// 含义包装
function autoRun(func) {
    window.__func = func;
    func();
    window.__func = null;
}

// 调用时候
const person = {
    name: '张三',
    age: 20
};
// 方法-设置姓名
function setName() {
    document.querySelector('.name').textContent = person.name;
}
// 方法-设置年龄
function setAge() {
    document.querySelector('.age').textContent = person.age;
}

autoRun(setName);
autoRun(setAge);