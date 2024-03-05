
// 一 通过闭包存储
let CPrivate = function(value){
    let _private = value;
    return {
        getValue:()=> _private,
        setValue:(value)=> {_private = value}
    }
}
// 二 通过Symbol创建私有变量 - 将私有变量值存储到实例化的类中
let CPrivate = (
    function(){
          const _private  = Symbol('pv'); //利用Symbol类型的唯一性和Object 对象 的键值除了字符串还支持Symbol（symbol无法被转换为字符串）
          class CPrivate {
                constructor(value) {
                      this[_private] = value; //初始化私有变量
                }
                getValue(){
                      return this[_private]
                }
                setValue(value){
                      this[_private] = value;
                }
          }
          return CPrivate
    })();
let p1 = new CPrivate(''); //私有变量 p1
p1.getValue();// ''
p1.setValue('蝴蝶效应');
p1.getValue(); // '蝴蝶效应'

let p2 = new CPrivate('世界是普遍联系的'); //私有变量 p2
p2.getValue();// '世界是普遍联系的'
p2.setValue('所以但行好事，莫问前程');
p2.getValue(); // '所以但行好事，莫问前程'

p1.getValue(); // '蝴蝶效应' 所以 p1 和 p2 是两个单独的私有变量类
// 三 通过 WeakMap 创建 私有变量集合 - 将私有化变量值存储到 WeakMap的数据结构的变量中
let CPrivate = (
  function (){
      const _private = new WeakMap(); // 创建私有变量集合
      class CPrivate {
          constructor(value) {
              _private.set(this,value);
          }
          getValue(){
              return _private.get(this);
          }
          setValue(value){
              _private.set(this,value);
          }
      }
      return CPrivate;
  }
)();

let p1 = new CPrivate(''); //私有变量 p1
p1.getValue();// ''
p1.setValue('质量互变');
p1.getValue(); // '质量互变'

let p2 = new CPrivate('做一个靠谱的人'); //私有变量 p2
p2.getValue();// '做一个靠谱的人'
p2.setValue('凡事有交代，件件有着落，事事有回音');
p2.getValue(); // '凡事有交代，件件有着落，事事有回音'

p1.getValue(); // '质量互变' 所以 p1 和 p2 是两个单独的私有变量类
// 利用WeakMap 存储 私有变量的好处是 当实例被销毁时候，改私有变量会被销毁。或者利用 WeakMap 中的clear方法，统一销毁所有私有变量，防止闭包引起的 可能内存泄露问题。

// 四 利用ES 新提案 创建私有变量 (#号开头的属性，只能声明在class中供私有使用)
class CPrivate {
    #x;
    constructor(value) {
          this.#x = value;
    }
    getValue(){
          return this.#x;
    }
    setValue(value){
          this.#x = value
    }
};