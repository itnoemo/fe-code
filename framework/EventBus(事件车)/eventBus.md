# EventBus-事件车

## 背景
- 在开发复杂的单页面应用时，我们经常会遇到一个问题：如何高效地在组件或模块之间进行通信？这里，EventBus（事件总线）就派上了用场
## 概念
- EventBus 是一种设计模式，它允许不同组件或模块之间通过事件来通信，而无需直接引用彼此
- EventBus 的核心在于提供一个中央机制，允许不同的组件或模块相互通信，而不必直接引用对方
- 它是一种典型的发布-订阅（pub-sub）模式，这是一种广泛使用的设计模式，用于解耦发送者和接收者
- 在这个模式中，EventBus 充当了一个中介的角色：它允许组件订阅那些它们感兴趣的事件，并在这些事件发生时接收通知
- 同样，当某个事件发生时，比如用户的一个动作或者数据的变化，EventBus 负责将这一消息广播给所有订阅了该事件的组件
## 核心
- 注册事件: on(event, callback)
- 触发事件: emit(event, ...args)
- 移除事件: off(event, callback)
## 实现
```ts
class EventBus {
  // 事件存储对象，用于保存不同事件的回调函数
  private events: Record<string, Function[]> = {};
  /**
   * 注册事件监听器
   * @param eventName - 事件名称
   * @param callback - 回调函数，当事件触发时执行
   * @returns this - 返回 EventBus 实例，支持链式调用
   */
  public on(eventName: string, callback: Function): this {
    // 检查回调函数是否为函数类型
    if (typeof callback !== "function") {
      throw new Error("EventBus 'on' method expects a callback function.");
    }
    // 如果事件不存在，创建一个空数组用于存储回调函数
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    // 将回调函数添加到事件的回调函数列表中
    this.events[eventName].push(callback);

    // 支持链式调用
    return this;
  }
  /**
   * 触发事件
   * @param eventName - 要触发的事件名称
   * @param args - 传递给回调函数的参数
   * @returns this - 返回 EventBus 实例，支持链式调用
   */
  public emit(eventName: string, ...args: any[]): this {
    // 获取事件对应的回调函数列表
    const callbacks = this.events[eventName];
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
  public off(event?: string | string[], callback?: Function): this {
    // 清空所有事件监听器
    if (!event || (Array.isArray(event) && !event.length)) {
      this.events = {};
      return this;
    }
    // 处理事件数组
    if (Array.isArray(event)) {
      event.forEach((e) => this.off(e, callback));
      return this;
    }
    // 如果没有提供回调函数，则删除该事件的所有监听器
    if (!callback) {
      delete this.events[event];
      return this;
    }

    // 移除特定的回调函数
    const callbacks = this.events[event];
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }

    // 支持链式调用
    return this;
  }
}
```
## 拓展
- 借助jquery的思想，有的时候事件只监听一次的场景，可完善一个once方法
```ts
	/**
   * 监听一次事件，思想是在执行事件回调时取消监听即可
   * @param eventName - 要触发的事件名称
   * @param args - 传递给回调函数的参数
   * @returns this - 返回 EventBus 实例，支持链式调用
   */
  public once(eventName: string, callback: Function): this {
    const onceWrapper = (...args: any[]) => {
      this.off(eventName, onceWrapper);
      callback(...args);
    };

    this.on(eventName, onceWrapper);

    return this;
  }
```
## 使用
- 引入已经实例化的 eventBus
```ts
import { eventBus } from './event-bus';
// 订阅事件
eventBus.on('eventName', callback);
// 触发事件
eventBus.emit('eventName', data);
// 移除事件
eventBus.off('eventName', callback);
```
- 不同模块或组件之间使用不同的事件总线时
```ts
// events.ts
import { EventBus } from './event-bus';
// 创建独立的事件总线实例
export const eventBusA = new EventBus();
export const eventBusB = new EventBus();

import {eventBusA, eventBusB} from './events'

// 在不同模块或组件中使用不同的事件总线
eventBusA.on('eventA', callbackA);
eventBusB.on('eventB', callbackB);
// 触发不同事件总线上的事件
eventBusA.emit('eventA', dataA);
eventBusB.emit('eventB', dataB);
```
## 三方库
- [mitt](https://github.com/developit/mitt)
- [tiny-emitter](https://github.com/developit/mitt)