# ref
- 实现数据的响应式
- 官方实现逻辑
```javascript
// 官方ref的实现原理
import { customRef } from 'vue';
export function ref(value) {
    return customRef((track, trigger) => {
        return {
            get() {
                // 收集依赖
                track();
                return value;
            }
            set(val) {
                // 派发更新
                trigger();
                value = val;
            }
        }
    });
}
```
- 利用上述信息可以通过ref实现数据的延迟更新
```javascript
// debounceRef.js
export function debounceRef(value, duration = 500) {
    let timer;
    return customRef((track, trigger) => {
        return {
            get() {
                // 收集依赖
                track();
                return value;
            }
            set(val) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    // 派发更新
                    trigger();
                    value = val;
                }, duration)
            }
        }
    });
}

// main.vue
<input v-model="name" />
<p class="resule">姓名: {{name}}</p>
<script setup>
import { debounceRef } from 'debounceRef.js';
const name = debounceRef('', 300);
</script>

```


# 渲染过程
## patch函数
```javascript

// 实现逻辑
const patch = (n1, n2, container, anchor = null,
parentComponent = null, parentSuspense = null,
isSVG = false, optimized = false) => {
    // 如果存在新旧节点，且新旧节点类型不同，则销毁旧节点
    if(n1 && lisSameVNodeType(n1, n2)) {
        anchor = getNextHostNode(n1)
        unmount(n1, parentComponent, parentSuspense, true)
        // nl 设置为 null 保证后续都走 mount 逻辑
        n1 = null
    }
    const { type, shapeFlag } = n2
    // 根据不同类型处理不同的逻辑更新操作
    switch (type) {
        case Text:
        // 处理文本节点
        ....
        // 普通类型元素
        // 组件类型元素
    }
    }
}


// 组件更新核心逻辑，根据新1日子树vnode 做 patch
patch(prevTree, nextTree,
    // 如果在 teleport 组件中父节点可能已经改变，所以容器直接
    找旧树 DOM 元素的父节点
    hostParentNode(prevTree.el),
    // 参考节点在fragment 的情g记可能改变，所以直接找旧树
    DOM 元素的下一个节点
    getNextHostNode(prevTree), 
    instance, 
    parentSuspense, 
    isSVG
)
```
