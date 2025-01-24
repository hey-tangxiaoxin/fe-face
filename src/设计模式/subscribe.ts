/**
 * 发布订阅模式：一种消息传递模式，用于解耦消息的发送者（发布者）和接收者（订阅者）。
 * 这种模式通过引入中间件（通常是消息队列或事件总线）来实现发布者和订阅者之间的通信，从而使得两者无需直接交互
 * 组成：
 *  1. 发布者：负责发布消息，通常是一个对象或函数；
 *  2. 订阅者：负责接收并处理消息，通常是一个对象或函数；
 *  3. 消息队列：用于存储消息，通常是一个数组或链表；
 */
class EventBus {
  private callbacks: { [key: string]: Function[] };
  constructor() {
    this.callbacks = {};
  }

  // 注册事件
  on(type: string, fn: Function) {
    if (!(type in this.callbacks)) {
      this.callbacks[type] = [];
    }
    this.callbacks[type].push(fn);
    return this; // 支持链式调用
  }

  // 注册只能执行一次的事件
  once(type: string, fn: Function) {
    if (!(type in this.callbacks)) {
      this.callbacks[type] = [];
    }
    const _this = this;
    this.callbacks[type].push(function once(...args) {
      fn(...args); // 执行回调函数
      _this.remove(type, once); // 执行一次后删除自己
    });
    return this; // 支持链式调用
  }

  // 触发事件
  emit(type: string, ...params: unknown[]) {
    if (this.callbacks[type]) {
      this.callbacks[type].forEach((fn) => fn(...params));
    }
    return this; // 支持链式调用
  }

  // 删除指定的回调函数
  remove(type: string, fn: Function) {
    if (this.callbacks[type]) {
      this.callbacks[type] = this.callbacks[type].filter((cb) => cb !== fn);
    }
    return this; // 支持链式调用
  }
}

const eventBus = new EventBus();

// 定义两个回调函数
const f1 = (...args) => {
  console.log("f1 参数:", ...args);
};

const f2 = () => {
  console.log("f2 执行成功!");
};

// 注册事件
eventBus
  .once("success", f1) // 注册 f1 函数，只能执行一次
  .on("success", f2) // 注册 f2 函数
  .emit("success", 12, 13) // 触发 success 事件，执行所有回调函数
  .emit("success") // 这里只会执行 f2，f1 自动移除了
  .remove("success", f2) // 删除 f2 函数
  .emit("success", 12); // 没有反应了，所有回调函数都被移除了
