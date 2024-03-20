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






function patch(oldVnode, vnode, hydrating, removeonly){
    // 判断新的vnode是香为空
    // 老的节点在 新的节点 不在
    if (isUndef (vnode)）{
    // 如果老的vnode不为空 卸载所有的老vnode
    if (isDef (oldVnode)) invokeDestroyHook(oldVnode)
    return
    let isInitialpatch = false
    // 用来存储 insert钩子西数，在插入节点之前调用
    const insertedVnodeQueue = I]
    // 如果老节点不存在，直接创建新节点
    if (isUndef (oldVnode)) {
        isInitialPatch = true
        createElm(vode, insertedVnodeQueue)
    } else {
     // 是不是元素节点
    const isRealelement - isDef (oldVnode. nodeType)
    1/当老节点不是真实的DON节点，并目新老节点的type和key相同，进行patchvnode更新工作
    if (lisRealelement && sameVnode(oldVnode, vode)) {
    patchvnode(oldVnode, vnode, insertedvnodeQueue, null, null, removeOnly)
    } else
    1/如果不是同一元素节点的话
    //当老节点是真实DON节点的时候
    if (isRealelement)
    //如果是元義节点 并目在SSR环境的时候 修改SSR ATTR属性
    if (oldvnode.nodeType == = 1 8& oldvnode.hasAttribute (SSR ATTR))，
    1/ 就是服务端渲染的，删掉这个厲性