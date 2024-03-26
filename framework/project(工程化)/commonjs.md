# commonjs
## 概念
## 应用
```js
// 引入
let { stat, exists, readfile } = require('fs');
// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```
- 实质是整体加载fs模块（即加载fs的所有方法）
- 生成一个对象（_fs），然后再从这个对象上面读取 3 个方法
- 这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”

## require逻辑
```js
  当node遇到 require(X),按照下面的顺序处理。
  
  （1）如果 X 是内置模块（比如 require('http')）
  
       a. 返回该模块
       b. 不再继续执行
       
   （2）如果 X 以'./' 或者 '../ '开头
       
       a. 根据 X 所在的父模块，确定X的绝对路径。
       b. 将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。(也就是把 X 跟下面的几种文件格式进行匹配，匹配到了就会依照相应的文件格式进行加载)
     
       +----------------------+
       |  .x                  |
       |  .x.js               |
       |  .x.json             |
       |  .x.node             |
       +--------------------  + 
    c.将 X 当成目录，一次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
    
       +----------------------------+
       |  .X/package.json(main字段) |
       |  .X/index.js               |
       |  .X/index.json             |
       |  .X/index.node             |
       +--------------------------- +
       
   （3）如果 X 不带路径
      a.根据 X 所在的父模块，确定 X 可能的安装目录。
      b. 依次在每个目录中， 将 X 当成文件名或目录名加载
    
   （4）抛出 "not found"

```
## 代码实现
### module
- Node内部提供了一个 Mudule构建函数。所有模块都是Module的实例。 require 的源码在 Node 的 lib/module.js 文件。
```js
function Module(id, parent){
    this.id = id; // 模块的识别符，通常是带有绝对路径的模块文件名
    this.exports = {}; // 表示模块对外输出的值
    this.parent = parent; // 返回一个对象，表示调用该模块的模块, 如果没有父模块，直接调用当前模块则parent为null
    this.filename = null; // 模块的文件名，带有绝对路径
    this.loaded = false; // 返回一个布尔值，表示模块是否已经完成加载
    this.children = [] // 返回一个数组，表示该模块要用到的其他模块
}
module.exports = Module;
var module = new Module(filename, parent)
```
### 实例require方法
- 每个模块实例都有一个 require 方法
- require 并不是全局命令，而是每个模块提供的一个内部方法
```js
Module.prototype.require = function(path){
  return Module._load(path, this)  
}
```
### Module._load()方法源码
#### 流程
>- 检查 Module._cache，是否在缓存中有指定的模块，如果模块已经在缓存中，就从缓存取出。
>- 如果没有判断是否为内置模块，如果是内置模块就返回内置模块。
>- 如果缓存之中没有就会创建一个新的Moudle实例，将它保存到缓存中。
>- 加载模块
>- 如果加载/解析过程报错，就从缓存删除该模块
>- 返回该模块的 module.exports

#### 具体实现
```js
Module._load = function(request, parent, isMain) {
  //  计算绝对路径, 首先解析出模块的绝对路径（filename），以它作为模块的识别符
  var filename = Module._resolveFilename(request, parent);
  //  第一步：如果有缓存，取出缓存
  var cachedModule = Module._cache[filename];
  if (cachedModule) {
    return cachedModule.exports;
  }
  // 第二步：是否为内置模块
  if (NativeModule.exists(filename)) {
    return NativeModule.require(filename);
  }
  // 第三步：生成模块实例，存入缓存
  var module = new Module(filename, parent);
  Module._cache[filename] = module;
  // 第四步：加载模块
  try {
    module.load(filename);
    hadException = false;
  } finally {
    if (hadException) {
      delete Module._cache[filename];
    }
  }
  // 第五步：输出模块的exports属性
  return module.exports;
};
```
### Module._resolveFilename() 方法源码
```js
Module._resolveFilename = function(request, parent) {
 // 第一步：如果是内置模块，不含路径返回
 if (NativeModule.exists(request)) {
   return request;
 }
 // 第二步：确定所有可能的路径
 var resolvedModule = Module._resolveLookupPaths(request, parent);
 var id = resolvedModule[0];
 var paths = resolvedModule[1];

 // 第三步：确定哪一个路径为真
 var filename = Module._findPath(request, paths);
 if (!filename) {
   var err = new Error("Cannot find module '" + request + "'");
   err.code = 'MODULE_NOT_FOUND';
   throw err;
 }
 return filename;
};
```