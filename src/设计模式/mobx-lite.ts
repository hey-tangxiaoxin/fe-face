/**
 * Mobx基本实现原理
 */
class MobxLite<T extends Object> {
  private observerList: Array<Function> = [];
  state: T;
  constructor(state: T) {
    const _this = this
    this.state = new Proxy(state, {
      set(target, key, value, proxy) {
        const result = Reflect.set(target, key, value, proxy);
        _this.observerList.forEach((fn) => {
          fn();
        });
        return result;
      },
    });
  }
  observe(fn: Function) {
    this.observerList.push(fn);
  }
}

const values = new MobxLite<{ count: number }>({
  count: 0,
});

setTimeout(() => {
  values.state.count = 1;
}, 1000);

values.observe(() => {
  console.log("fn invoked");
});

values.observe(() => {
  console.log("fn invoked2");
});
