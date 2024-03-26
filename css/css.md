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
## css选择器权重
- important情况下会以important为最大权重
- 非!important情况下 **对比x,y,z的值大小**
    - 属性说明
        - x: id选择器 的数量
        - y: 类、伪类和属性 的数量
        - z: 元素、伪元素 的数量
    - 计算规则
        - 按照(x,y,z)从左到右的顺序比较对应的x,y,z值, 哪个大则权重大，否则继续对比
        - 注意: 不是相加，而是按顺序比较
```css
/* 选择器    ===============>    权值 */
1、#id {}    ===============>    (1,0,0)
2、a {}    ===============>    (0,0,1)
3、.class {}    ===============>    (0,1,0)
4、.class #id a {}    ===============>    (1,1,1)
5、.class a:hover {}    ===============>    (0,2,1)
6、.class #id a::before {}    ===============>    (1,1,2)
7、.class #id a[data-id] {}    ===============>    (1,2,1)

/* 
    所以上面权重的排序是: 7 > 6 > 4 > 1 > 5 > 3 > 2
 */
```

