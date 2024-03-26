# ES Module
## 用法
- 模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能
- 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取
- 如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量
### export细节点
- export输出的变量就是本来的名字，但是可以使用as关键字重命名
- export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系
```js
// 报错
export 1; // ❌
// 报错
var m = 1;
export m; // ❌


// 写法一
export var m = 1; ✅
// 写法二
var m = 1;
export {m}; ✅
// 写法三
var n = 1;
export {n as m}; ✅
```
- export命令可以出现在模块的任何位置，只要处于模块顶层就可以
```js
function foo() {
// 这是因为处于条件代码块之中，就没法做静态优化了
export default 'bar' // ❌
}
foo()
```
### export default
- 本质上就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字
```js
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
```
- export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句
```js
// ✅
export var a = 1;
// ✅
var a = 1;
export default a; // 将变量a的值赋给变量default
// ❌
export default var a = 1;


// ✅
export default 42; // 指定对外接口为default
// ❌
export 42; // 没有指定对外的接口
```

### import细节点
- import命令要使用as关键字，将输入的变量重命名
- import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口
- 若导出的变量是对象的话是可以修改的
```js
// ❌
export let a = {name: '123'};
import { a } from './a';
a = {}; // ❌
a.age = 12; ✅

```
- import命令具有提升效果，会提升到整个模块的头部，首先执行
```js
// ✅
a();
import { a } from './a';
```
- 如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次
### 模块的整体加载(* as)
- 模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变
```js
import * as a from './';
// 下面两行都是不允许的
a.name = 'hello'; // ❌
```
### 复合写法(import和export混合使用)
```js
// demo1: 简单使用
export { foo, bar } from 'my_module';
// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };

// demo2: 接口改名
export { foo as myFoo } from 'my_module';

// demo3: 整体输出
export * from 'my_module';

// demo4: 默认接口
export { default } from 'foo';

// demo5: 具名接口改为默认接口
export { es6 as default } from './someModule';
// 等同于
import { es6 } from './someModule';
export default es6;

// demo6: 默认接口改为具名接口
export { default as es6 } from './someModule';

// es2020
export * as ns from "mod";
// 等同于
import * as ns from "mod";
export {ns};
```
### import()方法
- 适用场合
    - 按需加载
    ```js
    import('./a.js')
    .then(a => {
        // ...
    })
    .catch(error => {
        /* Error handling */
    })
    ```
    - 条件加载
    ```js
    // 加载a模块
    if () {
        import('./a.js')
        .then(a => {
            // ...
        })
        .catch(error => {
            /* Error handling */
        })
    }
    // 加载b模块
    if () {
        import('./b.js')
        .then(b => {
            // ...
        })
        .catch(error => {
            /* Error handling */
        })
    }
    ```
    - 动态的模块路径, import()允许模块路径动态生成
    ```js
    import(f()).then(...);
    ```
### import.meta
- import.meta.url
    - 返回当前模块的 URL 路径
    - Node.js 环境中，import.meta.url返回的总是本地路径，即file:URL协议的字符串，比如file:///home/user/foo.js
- import.meta.scriptElement
    - 是浏览器特有的元属性，返回加载模块的那个<script>元素，相当于document.currentScript属性
    ```html
    // HTML 代码为
    <script type="module" src="my-module.js" data-foo="abc"></script>

    // my-module.js 内部执行下面的代码
    import.meta.scriptElement.dataset.foo
    // "abc"
    ```
## 思想
- ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量
- CommonJS 和 AMD 模块，都只能在运行时确定这些东西
- ES6 模块不是对象, 而是通过export命令显式指定输出的代码，再通过import命令输入
## 特性
- ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";
- 代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
- 模块脚本自动采用严格模式，不管有没有声明use strict。
- 模块之中，可以使用import命令加载其他模块（.js后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用export命令输出对外接口。
- 模块之中，顶层的this关键字返回undefined，而不是指向window。也就是说，在模块顶层使用this关键字，是无意义的。
- 同一个模块如果加载多次，将只执行一次
## 应用
- 利用顶层的this等于undefined这个语法点，可以侦测当前代码是否在 ES6 模块之中。
    ```js
    // 不在模块中
    const isNotModuleScript = this !== undefined;
    ```

## 问题
- ES6 模块与 CommonJS 模块的差异
    - CommonJS 模块就是对象, ES6 模块不是对象
    - CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
    - CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
    - CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。
- ES Module 的原理
可参考[相关文章](https://juejin.cn/post/7069647533160529950)