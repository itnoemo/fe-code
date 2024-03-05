/**
 * 参考: https://blog.csdn.net/qq_56989560/article/details/124706021
 */

import { createStore } from 'vuex';

const moduleA = {
  state: () => ({
    name: 'moduleA_name'
  }),
  mutations: {
    setName(state, name) {
      state.aName = name;
    }
  }
};
const moduleB = {
  state: () => ({
    name: 'moduleB_name'
  }),
  setName(state, name) {
    state.aName = name;
  }
};

export default createStore({
  /**
   * 相当于data
   */
  state: {
    name: '张三',
    age: 20,
    count: 0
  },
  /**
   * getters相当于计算属性
   * 参考: https://blog.csdn.net/weixin_47450807/article/details/123094296
   */
  getters: {
    newCount(state) {
      return state.count + 1;
    },
    // 第二个参数为getters
    countParams(state, getters) {
      console.log('state:', state, 'getters:', getters);
      return state.count + 1;
    },
    // 返回函数, 调用 $Store.getters.totalCount(20)
    totalCount(state) {
      return count => {
        return state.count + count;
      }
    }
  },
  /**
   * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方, 并且它会接受 state 作为第一个参数
   * 
   */
  mutations: {
    addCount(state, num) {
      state.count += num;
    },
    reduce(state) {
      state.count--;
    }
  },
  /**
   * 进行异步操作, Action和Mutation相似，Mutation 不能进行异步操作，若要进行异步操作，就得使用Action
   */
  actions: {
    asyncReduce(context) {
      // 异步逻辑处理
      setTimeout(() => {
        context.commit('reduce');
      }, 1000);
    }
  },
  /**
   * 当遇见大型项目时，数据量大，store就会显得很臃肿,为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：
   */
  modules: {
    a: moduleA,
    b: moduleB
  }
})