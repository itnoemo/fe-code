(function() {
    var root = this;

    var SymbolPolyfill = function Symbol() {
        // 实现特性第 2 点：Symbol 函数前不能使用 new 命令
        if (this instanceof SymbolPolyfill) throw new TypeError('Symbol is not a constructor');
        return {};
    }
    root.SymbolPolyfill = SymbolPolyfill;
})();

// ------------ 分析 ------------
// demo
function A(){}
var a = new A();
// new 的本质
var a = {}; // 不触发A的执行
a.__proto__ = A.prototype; // 不触发A的执行
A.call(a); // 触发A的执行，因为上面第二步中a和A产生了关系, 故此在判断类中时则需要通过之前的关系进行判断报错即可

// 故此
function A() {
    if (this instanceof A) throw new TypeError('A is not a constructor');
}
new A(); // 则会报错
