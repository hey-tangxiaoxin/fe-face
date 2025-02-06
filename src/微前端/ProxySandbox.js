/**
 * @description: 代理沙箱
 * @author: tangxiaoxin
 * @createTime: 2020/10/14 10:18
 */
class ProxySandbox {
  constructor() {
    this.proxy = null;
    this.rawWindow = null;
  }
  active() {
    this.rawWindow = window;
    this.proxy = new Proxy(window, {
      get: (target, key) => {
        if (key in this.rawWindow) {
          return this.rawWindow[key];
        }
      },
      set: (target, key, value) => {
        this.rawWindow[key] = value;
        return true;
      }
    })
  }
  inactive() {
    this.proxy = null;
    this.rawWindow = null;
  }
}