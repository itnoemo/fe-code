# single-spa
## 概念
- 是一个将多个单页面应用聚合为一个整体应用的 JavaScript 微前端框架
## 特性
- 在同一页面上使用多个前端框架 而不用刷新页面 (React, AngularJS, Angular, Ember, 你正在使用的框架)
- 独立部署每一个单页面应用
- 新功能使用新框架，旧的单页应用不用重写可以共存
- 改善初始加载时间，延迟加载代码
## 简单应用
- step1、创建一个 html 文件
```html
<html>
<body>
    <script src="single-spa-config.js"></script>
</body>
</html>
```
- step2、创建一个single-spa-config。查看文档以获取更多详细信息。
```js
//main.js
import * as singleSpa from 'single-spa';
const name = 'app1';
/* loading 是一个返回 promise 的函数，用于 加载/解析 应用代码。
 * 它的目的是为延迟加载提供便利 —— single-spa 只有在需要时才会下载应用程序的代码。
 * 在这个示例中，在 webpack 中支持 import ()并返回 Promise，但是 single-spa 可以使用任何返回 Promise 的加载函数。
 */
const app = () => import('./app1/app1.js');
/* Single-spa 配置顶级路由，以确定哪个应用程序对于指定 url 是活动的。
 * 您可以以任何您喜欢的方式实现此路由。
 * 一种有用的约定是在url前面加上活动应用程序的名称，以使顶层路由保持简单。
 */
const activeWhen = '/app1';
singleSpa.registerApplication({ name, app, activeWhen });
singleSpa.start();
```
- step3、创建一个应用程序。查看文档以获取更多详细信息
```js
//app1.js
let domEl;
export function bootstrap(props) {
    return Promise
        .resolve()
        .then(() => {
            domEl = document.createElement('div');
            domEl.id = 'app1';
            document.body.appendChild(domEl);
        });
}
export function mount(props) {
    return Promise
        .resolve()
        .then(() => {
            // 在这里通常使用框架将ui组件挂载到dom。请参阅https://single-spa.js.org/docs/ecosystem.html。
            domEl.textContent = 'App 1 is mounted!'
        });
}
export function unmount(props) {
    return Promise
        .resolve()
        .then(() => {
            // 在这里通常是通知框架把ui组件从dom中卸载。参见https://single-spa.js.org/docs/ecosystem.html
            domEl.textContent = '';
        })
}
```
## 详细讲解


### Root Config（配置 single-spa）
```js
// single-spa-config.js
import { registerApplication, start } from 'single-spa';
// Simple usage
registerApplication(
  'app2',
  () => import('src/app2/main.js'),
  (location) => location.pathname.startsWith('/app2'),
  { some: 'value' }
);
// Config with more expressive API
registerApplication({
  name: 'app1',
  app: () => import('src/app1/main.js'),
  activeWhen: '/app1', // ['/myApp', (location) => location.pathname.startsWith('/some/other/path')]
  customProps: {
    some: 'value',
  }
);
start();
```
#### registerApplication: 注册应用方法
- registerApplication: 注册应用的方法
- 方法参数
    - name: **string**
        `应用的名字将会在single-spa中注册和引用, 并在开发工具中标记, 用于过滤防止加载重复的应用`
    - app: **Application | () => Application | Promise<Application>**
    `
    可以是应用的实例对象，也可是返回应用的实例对象的函数（Promise或者普通函数都可以）。
    它可以是一个单spa生命周期的对象，加载函数或者与第二个参数相同
    `
    - activeWhen: **string | (location) => boolean | (string | (location) => boolean)[]**
    `可以是激活函数，比如参数API、路径前缀或两者的数组。因为最常见的用例是使用window.location 将其URL前缀进行匹配，所以我们帮你实现了这个方法`
        - 字符串类型: '/app1', 以/app1开头的路径都会匹配到
        - 函数形式，(location) => location.pathname.startsWith('/some/other/path')
        - 数组形式: ['/myApp', (location) => location.pathname.startsWith('/some/other/path')], 多种路径匹配
        ```js
        // 路径前缀会匹配url，允许以下每一种前缀：
        '/app1'
            ✅ https://app.com/app1
            ✅ https://app.com/app1/anything/everything
            🚫 https://app.com/app2
        '/users/:userId/profile'
            ✅ https://app.com/users/123/profile
            ✅ https://app.com/users/123/profile/sub-profile/
            🚫 https://app.com/users//profile/sub-profile/
            🚫 https://app.com/users/profile/sub-profile/
        '/pathname/#/hash'
            ✅ https://app.com/pathname/#/hash
            ✅ https://app.com/pathname/#/hash/route/nested
            🚫 https://app.com/pathname#/hash/route/nested
            🚫 https://app.com/pathname#/another-hash
        ['/pathname/#/hash', '/app1']
            ✅ https://app.com/pathname/#/hash/route/nested
            ✅ https://app.com/app1/anything/everything
            🚫 https://app.com/pathname/app1
            🚫 https://app.com/app2
        ```
    - customProps: 传递给子应用的参数值
        - 对象形式，自定义属性可以是一个对象，也可以是一个返回Object的函数
        - 函数形式，如果自定属性是一个函数，函数的参数是应用的名字（application name)和当前window.location
        ```js
        singleSpa.registerApplication({
            name: 'myApp',
            app: () => import('src/myApp/main.js'),
            activeWhen: ['/myApp', (location) => location.pathname.startsWith('/some/other/path')],
            customProps: {
                some: 'value',
            },
        });
        singleSpa.registerApplication({
            name: 'myApp',
            app: () => import('src/myApp/main.js'),
            activeWhen: ['/myApp', (location) => location.pathname.startsWith('/some/other/path')],
            customProps: (name, location) => ({
                some: 'value',
            }),
        });
        ```
### start: 挂在应用方法
- start: 必须被single-spa配置文件的js调用，这时应用才会被真正挂载。
- start被调用之前，应用先被下载，但不会初始化/挂载/卸载
- start方法可以协助我们更好提升应用的性能
```js
//single-spa-config.js
import { start } from 'single-spa';
// 
 /*在注册应用之前调用start意味着single-spa可以立即安装应用，无需等待单页应用的任何初始设置。*/
 // 等一个AJAX请求，这种情况下，最佳实践是先调用registerApplication，等AJAX请求完成后再调用start。
 fetch(xxxx).then(() => {
    start();
 })
```
### Application（应用）
#### 构建应用
##### 生命周期
- 概念:
    - 注册的应用会经过下载(loaded)、初始化(initialized)、被挂载(mounted)、卸载(unmounted)和unloaded（被移除）等过程
    - single-spa会通过“生命周期”为这些过程提供钩子函数
- 约定:
    - `bootstrap, mount, and unmount`的实现是必须的，unload则是可选的
    - 生命周期函数必须有返回值，可以是Promise或者async函数
    - 如果导出的是函数数组而不是单个函数，这些函数会被依次调用，对于promise函数，会等到resolve之后再调用下一个函数
    - 如果 single-spa 未启动，各个应用会被下载，但不会被初始化、挂载或卸载
- 参数:
    - 生命周期函数使用"props" 传参，这个对象包含single-spa相关信息和其他的自定义属性
    ```js
    function bootstrap(props) {
        const {
            name,        // 应用名称
            singleSpa,   // singleSpa实例
            mountParcel, // 手动挂载的函数
            customProps  // 自定义属性
        } = props;     // Props 会传给每个生命周期函数
        return Promise.resolve();
    }
    ```
- 示例
```js
// 定义
singleSpa.registerApplication({
  name: 'app1',
  activeWhen,
  app,
  customProps: { authToken: "d83jD63UdZ6RS6f70D0" }
});
singleSpa.registerApplication({
  name: 'app1',
  activeWhen,
  app,
  customProps: (name, location) => {
    return { authToken: "d83jD63UdZ6RS6f70D0" };
  }
});
// 子应用
export function mount(props) {
  console.log(props.authToken); // 可以在 app1 中获取到authToken参数
  return reactLifecycles.mount(props);
}
```
#### 拆分应用
##### 选择 1: 一个代码仓库, 一个build包
- 概念
    - 使用single-spa的最简单方法是拥有一个包含所有代码的仓库。通常，您只有一个package.json,一个的webpack配置，产生一个包，它在一个html文件中通过<script>标签引用。
- 优势
   最容易部署
   单一版本（monorepo）控制的优点
- 劣势
    - 对于每个单独的项目来说，一个Webpack配置和package.json意味着的灵活性和自由度不足。
    - 当你的项目越来越大时，打包速度越来越慢。
    - 构建和部署都是捆绑在一起的，这要求固定的发版计划，而不能临时发布。
##### 选择 2: NPM包
- 概念
    - 创建一个父应用，npm安装每个single-spa应用。每个子应用在一个单独的代码仓库中，负责每次更新时发布一个新版本。当single-spa应用发生更改时，根应用程序应该重新安装、重新构建和重新部署。
    - 通常，single-spa应用分别使用babel或者webpack来编译。
    - 请注意，您还可以使用monorepo方法，该方法允许单独构建，而不需要单独的代码仓库。
- 优势
    - npm安装对于开发中更熟悉，易于搭建。
    - 独立的npm包意味着，每个应用在发布到npm仓库之前可以分别打包。
- 劣势
    - 父应用必须重新安装子应用来重新构建或部署。
    - 中等难度搭建。
##### 选择 3: 动态加载模块
- 概念
    - 创建一个父应用，允许子应用单独部署。为了实现这一点，创建一个manifest文件，当子应用部署更新时，它控制子应用的“上线”版本及加载的JavaScript文件。
    - 改变每个子应用加载的JavaScript文件有很多的方法
    - Web服务器：在你的web服务器为每个子应用的正确版本创建一个动态脚本。使用模块加载 例如 SystemJS 可以在浏览器通过动态urls下载并执行JavaScript代码。

## 脚手架
- create-single-spa，具体已使用可(参考)[https://zhuanlan.zhihu.com/p/367710216]

## 案例
- [简单](./demo1.html)
