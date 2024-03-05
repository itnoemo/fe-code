## Redux 三大原则
```
# 单一数据源（整个应用的 state 被储存在 一棵 object tree 中，并且这个 object tree 只存在于 唯一一个 store 中。）
# state是只读的（唯一改变 state 的方法就是触发 action。这样确保了 视图 和 网络请求 都不能直接修改 state，相反它们只能表达想要修改的意图。因为所有的修改都被集中化处理，且严格按照一个接一个的顺序执行，因此不用担心 竞态条件的出现。）
# 使用纯函数来修改state（为了描述 action 如何改变 state tree ，你需要编写reducers。）
```