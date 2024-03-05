/**
 * 第三方类库开发:
 *      1、健壮性
 *      2、可维护性
 *      3、多场景，一般主要是考虑比如使用者修改库中方法，数据等
 * 举例子: 比如提供一个购物车类，里面有商品，单价，数量和总价等
 */
// 商品源数据
var goods = [{
    name: '钢笔',
    color: 'black',
    price: 20, // 单价
    total: 2 // 数量
}];

// 购物车类
class UICar {
    constructor(gs) {
        this.goods = gs; // 商品列表
        this.choose = gs.reduce((prev, next) =>  ({total: prev.total + next.total}), {total: 0}).total;
    }
}

// 使用者
const car = new UICar(goods);
console.log(car.choose);
Object.freeze

/**
 * 上述代码问题
 *  1、对象数据随意的更改，比如car.goods = 1; // 成功改了
 *  2、类的原型随意添加属性， UICar.prototype.a = 2; // 成功添加
 * 
 * 针对上面的问题我们应该设置对象属性不能随意修改，Object.defineProperty
 * 初始化对象后的商品列表就不能通过对象方式修改，可以使用 Object.freeze(gs)
 * 新创建的对象不能修改之前的参数但是可以新增参数，可以使用Object.seal(this)
*/ 

// 购物车类
class UICar {
    constructor(gs) {
        gs = {...gs};
        Object.freeze(gs);
        Object.defineProperty(this, 'goods', {
            get() {
                return gs;
            },
            set() {
                throw new Error('不可修改');
            }
        });
        // 已选数量
        let choose = gs.reduce((prev, next) =>  ({total: prev.total + next.total}), {total: 0}).total;
        Object.defineProperty(this, 'choose', {
            value: gs.reduce((prev, next) =>  ({total: prev.total + next.total}), {total: 0}).total,
            get() {
                return choose;
            },
            set(value) {
                // 判断value是否有效，比如大于0的正整数，不正确就throw new Error()
                choose = value; 
            }
        })
    }
}