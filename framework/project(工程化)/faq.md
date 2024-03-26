# 常见问题
## 模块化默认规范
> - 浏览器环境使用ES Modules
> - nodejs使用CommonJS
> - Node v12 之后的版本，可以通过package.json 中添加type字段为module，将默认模块系统修改为 ES Module此时就不需要修改文件扩展名为 .mjs 了
> - 如果需要在type=module的情况下继续使用CommonJS，
需要将文件扩展名修改为 .cjs

## 你讲讲前端模块化吧
>模块化的开发方式可以提高代码复用率，方便进行代码的管理。通常一个文件就是一个模块，有自己的作用域，只向外暴露特定的变量和函数。
## 模块化有哪几种标准？
>目前流行的js模块化规范有CommonJS、AMD、CMD以及ES6的模块系统
## ES Modules 和 CommonJS的一些区别
>   - 使用语法层面，CommonJs是通过module.exports，exports导出，require导入；ESModule则是export导出，import导入
>   - CommonJs是运行时加载模块，ESModule是在静态编译期间就确定模块的依赖
>   - ESModule在编译期间会将所有import提升到顶部，CommonJs不会提升require
>   - CommonJs导出的是一个值拷贝，会对加载结果进行缓存，一旦内部再修改这个值，则不会同步到外部。ESModule是导出的一个引用，内部修改可以同步到外部
>   - CommonJs中顶层的this指向这个模块本身，而ESModule中顶层this指向undefined
>   - CommonJS加载的是整个模块，将所有的接口全部加载进来，ESModule可以单独加载其中的某个接口