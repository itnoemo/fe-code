// 通过 Object.create(null), 但只可能使用本类中定义的属性
function A(){}
A.prototype = Object.create(null, {
    constructor: {
        value: A,
        enumerable: false,
        writable: true,
        configurable: true
    }
})

const a = new A();
a.toString() // 报错

