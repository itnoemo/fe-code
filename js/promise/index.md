# 知识点汇总
## 特性
    - 初始化
        - 构造函数需要传递的一个函数A
        - A函数需要接收两个函数类型的参数，resolve和reject
        - 若A函数在执行的时候报错了则状态由pending->rejected
        - 初始化状态为pending, 状态改变情况分为pending->fulfilled和pending->rejected
        - resolve和reject函数作用是改变状态并赋值，resolve是将pending->fulfilled，reject是将pending->rejected’
    - 对象调用
        - 实例具备then和catch方法，参数均是函数类型，并会将回调函数放到微队列中
        ```javascript
        function queueMicrotask(callback) {
        }
        ```
        - then方法传递两个函数参数，参数1为成功的回调，参数2为失败的回调
        - then方法的参数并不是立马将其放到微队列中，必须等到状态为fulfilled时才将其第一个参数放到微队列中
        - then方法中有报错时则会调用参数2失败的回调函数
        - then和catch因为可以链式调用故此是返回的一个新的promise
        ```javascript
        const p = new Promise((resolve)=>{resolve(1)});
        p.then(()=>{console.log(1);})
        .then(()=>{console.log(2);})
        .then(()=>{console.log(3);})
        ```
        - 同一个对象的then可以多次调用并且会按照调用次数以此将then的回调函数加入到微队列以此去执行
        ```javascript
        const p = new Promise((resolve)=>{resolve(1)});
        p.then(()=>{console.log(1);});
        p.then(()=>{console.log(2);});
        p.then(()=>{console.log(3);});
        ```
        - 只要是执行具体的函数则就要通过try catch进行异常捕获
        - 状态穿透，若一个promise实例的状态为rejected,但then方法中第二个参数没有，则返回当前实例的状态，直到调用catch方法才会执行输出error信息并将其状态改为fulfilled
        ```javascript
        const p = new Promise((resolve, reject)=>{reject(1)});
        const a = p.then();
        .catch(()=>{console.log(2);});
        .catch(()=>{console.log(3);});
        ```
## 知识点、注意点
- class是默认内部是严格模式
```javascript
/**
 * this._status = 'fulfilled'; // 报错，TypeError: Cannot set property '_status' of undefined
 * 分析:
 *    1、resolve(123); 是直接调用的方式，所以this指向的不是实例本身，而且全局的
 *    2、class是默认内部是严格模式，故此 this为undefined
 * 优化:
 *      executor(this._resolve.bind(this), this._reject.bind(this));
 */
class MyPromise {
    // 初始化传递一个执行器
    constructor(executor) {
        this._status = 'pending'; // 当前状态
        executor(this._resolve, this._reject);
    }
    // 成功函数
    _resolve(data) {
        this._status = 'fulfilled'; // 报错，TypeError: Cannot set property '_status' of undefined
        console.log('已完成，', data);
    }
    // 异常函数
    _reject(error) {
        this._status = 'rejected';
        console.log('失败了，', error);
    }
};
const p1 = new MyPromise((resolve, reject) => {
    resolve(123);
});
const p2 = new MyPromise((resolve, reject) => {
    reject('Error');
});
```
- shift和数组遍历共存情况下会有错误
```javascript
const a = [1,2,3,4,5]
for(const n of a) {
    console.log(n);
    a.shift();
}
// 1,3,5 原因在于每次循环把第一项移除后，当前的指针指向了第二项，随着每次循环指针移动逻辑+1则就会略过偶数项

// 正确的输出是
while(a[0]) {
    console.log(n);
    a.shift();
}
// 1,2,3,4,5
```
- then状态多情况
```javascript
const pf = new Promise((resolve, reject) => {
    resolve('pf');
});
const pr = new Promise((resolve, reject) => {
    reject('pr');
});
// then参数为空时, 根据状态穿透则直接返回实例的状态,
const pf1 = pf.then(); // pf1和pf：{<fulfilled>: 'pf'}
const pr1 = pr.then(); // pr1和pr：{<rejected>: 'pf'}
console.log(pf1 === pf); // false
console.log(pr1 === pr); // false

// then只有一个参数,
const pf2 = pf.then(()=>{}); // pf2: <fulfilled>: undefined || pf: {<fulfilled>: 'pf'}
const pr2 = pr.then(()=>{}); // pr2和pr：{<rejected>: 'pf'}
console.log(pf2 === pf); // false
console.log(pr2 === pr); // false

// then两个参数,
const pf3 = pf.then(()=>{}, ()=>{}); // pf2: <fulfilled>: undefined || pf: {<fulfilled>: 'pf'}
const pr3 = pr.then(()=>{}, ()=>{}); // pr2: <fulfilled>: undefined || pr：{<rejected>: 'pf'}
console.log(pf3 === pf); // false
console.log(pr3 === pr); // false

// then其中函数返回的是一个promise A时状态值则根据返回A的状态来控制

```
- 如何判断是否是一个promise，需要依据promise A+规范
```javascript
// A+规范中提到: 只要是带有then方法的对象或者函数皆可以成为promise
function isPromise(obj) {
    return !!(obj && typeof obj === 'object' && typeof obj.then === 'function')
}
```
- 模拟微任务
```javascript
function addMicrotask(callback) {
    // node环境
    if (process.nextTick) {
        process.nextTick(callback);
        return;
    }
    // 原生微任务方法
    if (queueMicrotask) {
        queueMicrotask(callback);
        return;
    }
    // promise
    if (Promise) {
        Promise.resolve().then(callback);
        return;
    }
    // MutationObserver
    if (MutationObserver) {
        const div = document.createElement('div');
        const observer = new MutationObserver(callback);
        // 在 MutationObserver 实例上调用 `observe` 方法，
        // 并将要观察的元素与选项传给此方法
        observer.observe(div, { childList: true });
        div.innerHTML = '';
    }
    // 兜底方案-setTimeout
    setTimeout(callback,0);
}
```