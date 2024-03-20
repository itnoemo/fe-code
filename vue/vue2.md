## diff算法
```js
function patch(oldVnode, vnode, hydrating, removeonly){
11 判断新的vnode是香为空
11老的节点在 新的节点 不在
if (isUndef (vnode)）{
1/ 如果老的vnode不为空 卸载所有的老vnode
if (isDef (oldVnode)) invokeDestroyHook(oldVnode)
return
let isInitialpatch = false
1/用来存储 insert钩子西数，在插入节点之前调用
const insertedVnodeQueue = I]
11如果老节点不存在，直接创建新节点
if (isUndef (oldVnode)) {
isInitialPatch = true
createElm(vode, insertedVnodeQueue)
} else {
1/是不是元素节点
const isRealelement - isDef (oldVnode. nodeType)
1/当老节点不是真实的DON节点，并目新老节点的type和key相同，进行patchvnode更新工作
if (lisRealelement && sameVnode(oldVnode, vode)) {
patchvnode(oldVnode, vnode, insertedvnodeQueue, null, null, removeOnly)
} else
1/如果不是同一元素节点的话
//当老节点是真实DON节点的时候
if (isRealelement)
//如果是元義节点 并目在SSR环境的时候 修改SSR ATTR属性
if (oldvnode.nodeType == = 1 8& oldvnode.hasAttribute (SSR ATTR))，
1/ 就是服务端渲染的，删掉这个厲性
```