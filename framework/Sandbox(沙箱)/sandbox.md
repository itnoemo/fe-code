# sandbox(沙箱)， 此处之探讨js沙箱
## 概念
- 沙箱（Sandbox）是一种用于隔离正在运行程序的安全机制
- 通常用于执行未经测试或不受信任的程序或代码
- 为待执行的程序创建一个独立的执行环境，内部程序的执行不会影响到外部程序的运行
## 场景
### 常见场景
- 浏览器，只能使用浏览器中相关api，无法使用浏览器之外的api去影响其他的逻辑
- 浏览器的标签页，每个标签页运行一个独立的网页，标签页之间互不影响
### 前端场景
- JSONP 请求， 由于请求回来的数据未知
- 引入不知名第三方 JS 库
- Vue 模板表达式的计算，可参考[源码](https://github.com/vuejs/vue/blob/v2.6.10/src/core/instance/proxy.js)
- 在线编辑器
- 插件（Plugin）机制， 插件所依赖的宿主环境和规则其实就是一个沙箱
## 原则
- 只要遇到不可信的第三方代码，我们就可以使用沙箱将代码进行隔离，从而保障外部程序的稳定运行
- 如果不做任何处理地执行不可信代码，在前端中最直观的副作用/危害就是污染、篡改全局 window 状态，影响主页面功能甚至被 XSS 攻击
```js
// 重定向页面
window.location.href = 'xxxx'
// 利用原型链特性重写原生js方法
Object.prototype.toString = () => {}
// 修改dom元素
document.querySelectorAll('div').forEach(node => node.classList.add('hhh'))
// 非法获取当前页面的cookie
sendRequest(document.cookie)
```
## 实现（就是为当前执行的相关逻辑代码提供一个单独的执行上下文）
- iframe
	- 优势: 
		- 天然的优质沙箱
	    - iframe 标签可以创造一个独立的浏览器原生级别的运行环境，这个环境由浏览器实现了与主环境的隔离
        - 使用 iframe 来实现一个沙箱是目前最方便、简单、安全的方法
	- 弊端:
		- 一个页面中有多个沙箱窗口，其中有一个沙箱需要与主页面共享几个全局状态（eg: 点击浏览器回退按钮时子应用也会跟随着回到上一级），另一个沙箱需要与主页面共享另外一些全局状态
		- 浏览器为主页面和 iframe 之间提供了 postMessage 等方式进行通信，但单单使用 iframe 来实现这个场景是比较困难且不易维护的
- with+eval
	- 优势: 实现了执行程序中的变量在沙箱提供的上下文环境中查找先于外部执行环境的效果
	- 弊端: 在提供的上下文对象中没有找到某个变量时，代码仍会沿着作用域链一层一层向上查找，这样的一个沙箱仍然无法控制内部代码的执行
```js
// 执行上下文对象
const ctx = 
    funcA: obj => {
        console.log(obj)
    },
    a: 'a'
}
// 最简陋的沙箱
function poorestSandbox(code, ctx) {
	with(ctx) {
		eval(code) // 为执行程序构造了一个函数作用域
	}
}
// 待执行程序
const code = `
    ctx.a = 'b'
    ctx.funcA(ctx.a)
`
poorestSandbox(code, ctx) // b
```
- ES6 proxy,proxy用于创建一个对象的代理，从而实现对基本操作的拦截以及自定义
	- 优势: 解决上述with存在的问题和可自行控制开放的方法   
	- 弊端: 该案例在浏览器中运行正常，在node中运行可能出现问题，原因是使用了new Function,创建的函数只能在全局作用域中运行，而在node中顶级的作用域不是全局作用域，当前全局声明的变量是在当前模块的作用域里的
```js
const obj = {
  a: 1
}
const obj2 = {
  b: 2
}
let b = 3

// 用with改变作用域
const withedCode = (code) => {
  code = `with(obj) { ${ code } }`
  const fun = new Function('obj', code)
  return fun
}
// 执行代码
const code = 'console.log(b)'
// 白名单
const whiteList = ['console', 'b']
// // 访问拦截
const ctxProxy = (ctx) => new Proxy(ctx, {
  has: (target, prop) => { // 当返回false的时候会沿着作用域向上查找，true为在当前作用域进行查找
    if(whiteList.includes(prop)) { 
      return false
    }
    if(!target.hasOwnProperty(prop)) { 
      throw new Error(`can not find - ${prop}!`)
    }
    return true
  },
})
withedCode(code)(ctxProxy(obj2)) // 3
```
- with + proxy + iframe
	- 利用 iframe 对全局对象的天然隔离性，将 iframe.contentWindow 取出作为当前沙箱执行的全局对象
	- 将上述沙箱全局对象作为 with 的参数限制内部执行程序的访问，同时使用 Proxy 监听程序内部的访问。
	- 维护一个共享状态列表，列出需要与外部共享的全局状态，在 Proxy 内部实现访问控制
```js
// 沙箱全局代理对象类
class SandboxGlobalProxy {

    constructor(sharedState) {
        // 创建一个 iframe 对象，取出其中的原生浏览器全局对象作为沙箱的全局对象
        const iframe = document.createElement('iframe', {url: 'about:blank'})
        document.body.appendChild(iframe)
        const sandboxGlobal = iframe.contentWindow // 沙箱运行时的全局对象

        return new Proxy(sandboxGlobal, {
            has: (target, prop) => { // has 可以拦截 with 代码块中任意属性的访问
                if (sharedState.includes(prop)) { // 如果属性存在于共享的全局状态中，则让其沿着原型链在外层查找
                    return false
                }

                if (!target.hasOwnProperty(prop)) {
                    throw new Error(`Invalid expression - ${prop}! You can not do that!`)
                }
                return true
            }
        })
    }
}

function maybeAvailableSandbox(code, ctx) {
    withedYourCode(code).call(ctx, ctx)
}
const code_1 = `
    console.log(history == window.history) // false
    window.abc = 'sandbox'
    Object.prototype.toString = () => {
        console.log('篡改后的方法')
    }
    console.log(window.abc) // sandbox
`
const sharedGlobal_1 = ['history'] // 希望与外部执行环境共享的全局对象
const globalProxy_1 = new SandboxGlobalProxy(sharedGlobal_1)
maybeAvailableSandbox(code_1, globalProxy_1)

window.abc // undefined 

Object.prototype.toString() // [object Object] 并没有打印 篡改后的方法
```
## 深入优化
- step1: Symbol.unscopables设置了true会对with进行无视，沿着作用域进行向上查找
```js
const obj = {
    a: 1
}
let a = 2
obj[Symbol.unscopables] = {
    a: true
}
with(obj) {
    console.log(a) // 2
}


// 优化此问题
return new Proxy(globalObj, {
	has: (target, prop) => {
		if(shareState.includes(prop)) {
			return false
		}
		if(!target.hasOwnProperty(prop)) {
			throw new Error(`can not find - ${prop}!`)
		}
		return true
	},
	get: (target, prop) => {
						// 处理Symbol.unscopables逃逸
		if(prop === Symbol.unscopables) return undefined
		return target[prop]
	}
})
```
- step2: window.parent 可以在沙箱的执行上下文中通过该方法拿到外层的全局对象
```js
// 改进后
get: (target, prop) => {
    // 处理Symbol.unscopables逃逸
    if(prop === Symbol.unscopables) return undefined
        // 阻止window.parent逃逸
    if(prop === 'parent') {
        return target
    }
    return target[prop]
}
```
- step3: 通过某个变量的原型链向上查找，从而达到篡改全局对象的目的
```js
// 现象
const code = `([]).constructor.prototype.toString = () => {
    return 'Escape!'
}`
console.log([1,2,3].toString()) // Escape!

// 改进的方案就是 需要针对相关对象进行proxy的监听拦截
```
- 
## 相关完成方案可参考 qiankun框架，此文档旨在提供相关方案思路