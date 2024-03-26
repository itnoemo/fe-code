# CodeReview 常见问题
## promise回调嵌套问题
### bad
```js
getLoginInfo().then((userInfo) => {
    getGoodList(userInfo).then((goodList) => {
        console.log('goodList', goodList);
    })
});
```
### good
```js
// promise方式
getLoginInfo().then(getGoodList).then((goodList) => {
    console.log('goodList', goodList);
});
// async await方式
const userInfo = await getLoginInfo();
const goodList = await getGoodList(userInfo);
console.log('goodList', goodList);
```

## 滥用try catch
- catch时不做任何处理时，只是为了不让报错
- 我们要尽量把未知的错误暴露出来才能找到更好的优化程序
### bad
```js
const getLoginInfo = async () => {
    try {
        const userInfo = await getLoginInfo();
    } catch(error) {console.error(error);}
};
```
### good
```js
// 不错任何处理时
const getLoginInfo = async () => {
    const userInfo = await getLoginInfo();
};
// 做错误上报时
const getLoginInfo = async () => {
    try {
        const userInfo = await getLoginInfo();
    } catch(error) {
        log(error);
    }
};
```
## 函数参数过多
### bad
```js
// 转化商品信息
const transformGoodInfo = (
    id,
    name,
    desc,
    price,
    total
) => {};
// 调用的时候传递的参数必须按函数定义字段对应传递
transformGoodInfo(1, '雪糕', '巧乐兹真的好吃', 4, 10);
```
### good
```js
// 转化商品信息
const transformGoodInfo = (good) => {};
// 调用
const goodInfo = {
    id: 1,
    name: '雪糕',
    desc: '巧乐兹真的好吃',
    price: 4,
    total: 10
}
transformGoodInfo(goodInfo);
```
## 数字状态使用不明确，代码阅读性差
### bad
```js
if (state === 1) {
    // ...
} else if (state === 2 || state === 3) {
    // ...
} else if (state === 4 && state === 5) {
    // ...
}
```
### good
```js
const STATE_TYPE = {
    INIT: 1, // 初始化
    START: 2, // 开始加载
    LOADING: 3, // 加载中
    FUIFILLED: 4, // 已完成
    REJECTED: 5, // 失败
};
if (state === STATE_TYPE.INIT) {
    // ...
} else if (state === STATE_TYPE.START || state === STATE_TYPE.LOADING) {
    // ...
} else if (state === STATE_TYPE.FUIFILLED  && state === STATE_TYPE.REJECTED ) {
    // ...
}
```
## 注释使用不当
### bad
```js
const activeGoodId = 0; // 给商品id赋值为0
```
### good
```js
const activeGoodId = 0; // 初始化当前选中的商品id
```
## 变量名类型定义重复
### bad
```js
class Good {
    goodId;
    goodName;
    goodPrice;

    getGoodDetail() {}
}
```
### good
```js
class Good {
    id;
    name;
    price;
    
    getDetail() {}
}
```
## 判断中某一条件逻辑过多
### bad
```js
if (
    state === 1 ||
    (state === 2 && name.includes('雪糕')) ||
    (name === '蛋糕')
) {
    // ...
}
```
### good
```js
// 判断商品时候为选中状态
function isSelectedState(state, name) {
    return state === 1 ||
    (state === 2 && name.includes('雪糕')) ||
    (name === '蛋糕')
}
if (isSelectedState(state, name)) {
    // ...
}
```
## 条件嵌套层次较多
### bad
```js
function isActiveState() {
    // 商品是否上架
    if (state === 1) {
        // 商品名称中是否含有雪糕
        if (name.includes('雪糕')) {
            // 价格是否小于4元
            if (price < 4) {
                return true
            } else {
                return false
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}
```
### good
```js
function isActiveState() {
    if (state !== 1) {
        return false;
    }
    if (!name.includes('雪糕')) {
        return false;
    }
    if (price >= 4)) {
        return false;
    }
    // 其他情况
    return true;
}
```
