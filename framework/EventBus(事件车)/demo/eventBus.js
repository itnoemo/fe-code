class EventBus {
  // 事件存储对象，用于保存不同事件的回调函数
  #events = {};
  /**
   * 注册事件监听器
   * @param eventName - 事件名称
   * @param callback - 回调函数，当事件触发时执行
   * @returns this - 返回 EventBus 实例，支持链式调用
   */
  on(eventName, callback) {
    // 检查回调函数是否为函数类型
    if (typeof callback !== "function") {
      throw new Error("EventBus 'on' method expects a callback function.");
    }
    // 如果事件不存在，创建一个空数组用于存储回调函数
    if (!this.#events[eventName]) {
      this.#events[eventName] = [];
    }
    // 将回调函数添加到事件的回调函数列表中
    this.#events[eventName].push(callback);

    // 支持链式调用
    return this;
  }
  /**
   * 触发事件
   * @param eventName - 要触发的事件名称
   * @param args - 传递给回调函数的参数
   * @returns this - 返回 EventBus 实例，支持链式调用
   */
  emit(eventName, ...args) {
    // 获取事件对应的回调函数列表
    const callbacks = this.#events[eventName];
    if (callbacks) {
      // 遍历执行每个回调函数，并传递参数
      callbacks.forEach((callback) => callback(...args));
    }

    // 支持链式调用
    return this;
  }
  /**
   * 移除事件监听器
   * @param event - 要移除的事件名称或事件名称数组
   * @param callback - 要移除的回调函数（可选）
   * @returns this - 返回 EventBus 实例，支持链式调用
   */
  off(event, callback) {
    // 清空所有事件监听器
    if (!event || (Array.isArray(event) && !event.length)) {
      this.#events = {};
      return this;
    }
    // 处理事件数组
    if (Array.isArray(event)) {
      event.forEach((e) => this.off(e, callback));
      return this;
    }
    // 如果没有提供回调函数，则删除该事件的所有监听器
    if (!callback) {
      delete this.#events[event];
      return this;
    }

    // 移除特定的回调函数
    const callbacks = this.#events[event];
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }

    // 支持链式调用
    return this;
  }
  
  /**
   * 监听一次事件，思想是在执行事件回调时取消监听即可
   * @param eventName - 要触发的事件名称
   * @param args - 传递给回调函数的参数
   * @returns this - 返回 EventBus 实例，支持链式调用
   */
  once(eventName, callback) {
    const onceWrapper = (...args) => {
      this.off(eventName, onceWrapper);
      callback(...args);
    };
  
    this.on(eventName, onceWrapper);
  
    return this;
  }
}

window._eventBus = new EventBus();