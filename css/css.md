# css
## transition 动画使用需要注意
```css
    // 基本规则
    transition: height 0.5s;
    transition: all 0.5s;

    // 以下写法，无动画效果，原因是因为transition 针对效果情况下是需要属性变化的具体值， 设置为 auto不是具体值故此没有效果
    .btn:hover + .dropdowm {
        height: auto;
    }
    .dropdowm {
        width: 200px;
        height: 0;
        transition: height 0.5s;
    }
```

# js
## 重绘
- 根据浏览器的渲染原理，一个函数中修改dom的布局(height、width等)影响页面结构的属性，一个属性多次修改以最后修改值A为准创建一个重绘任务
```javascript
// 问题是没有动画效果，因为最后的值为显示的值，故此需要设置为0后手动进行页面重绘操作
btnDom.onmouseenter = function() {
    dropdowmDom.style.height = 'auto';
    const {height} = dropdowmDom.getBoundingClientRect();
    dropdowmDom.style.height = 0;
    dropdowmDom.style.transition = 'height 0.5s';
    dropdowmDom.offsetHeight; // 触发页面重绘
    dropdowmDom.style.height = height + 'px';
};
```

## 事件
### 绑定格式
```javascript
// 绑定方式1
dom.addEventListener("click", (event) => {});
// 绑定方式2
dom.onclick = (event) => {};
```
### onmouseover、onmousout、onmouseenter、onmousleave、
- onmouseover: 当一个定点设备（通常指鼠标）在一个元素本身或者其子元素上移动时，触发该事件，**子节点移动会触发该事件**
- onmousout: onmouseover的鼠标移出事件
- onmouseenter: 事件在定点设备（通常指鼠标）首次移动到元素的激活区域内时，在该元素上触发, **子节点移动不触发该事件**
- onmousleave: onmouseenter的鼠标移出事件

## 实例方法
### Element.getBoundingClientRect()
- 方法返回一个 DOMRect 对象(表示的盒子的类型由返回它的方法或属性指定)，其提供了元素的大小及其相对于视口的位置
- DOMRect对象的属性值有 left、top、right、bottom、x、y、width 和 height值
- 除了 width 和 height 以外的属性是相对于视图窗口的左上角来计算的
```json
   DOMRect: {
        "x": 0,
        "y": 0,
        "width": 1665,
        "height": 7342.4453125,
        "top": 0,
        "right": 1665,
        "bottom": 7342.4453125,
        "left": 0
    }
```
- left、top、right、bottom、x、y
    - 相对于视图窗口的左上角来计算的
    - 若想获取整个网页左上角的位置，则滚动位置是 x+window.scrollX和y+window.scrollY 值
- width、height
    - width 和 height 属性是包含了 padding 和 border-width 的, 而不仅仅是内容部分的宽度和高度
    - 在标准盒子模型中，这两个属性值分别与元素的 width/height + padding + border-width 相等
    - 如果是 box-sizing: border-box，两个属性则直接与元素的 width 或 height 相等

## 运算符
### ++、--
- 运算符代表着是表达式
```javacript
   const a = 1;
   a++；// 1、先返回a的值 2、在对a进行+1操作
   ++a; // 1、先对a进行+1操作 2、再返回a的值
```
- 表格式的优先级高于运算符
```javacript
   /**
        步骤:
            1、先进行a++ 值为1，在进行+1
            2、++a时 a为2，所以此时返回3
            3、++a时 a为3 此时返回4
            4、整体为 1+3*4 = 13
    */
   const a = 1;
   const b = a++ + ++a * ++a; // 13
```

