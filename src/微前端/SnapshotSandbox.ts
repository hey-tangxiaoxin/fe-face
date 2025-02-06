/**
 * 
 * @param obj 
 * @param callbackFn 
 */
const iter = (obj: typeof globalThis, callbackFn: (prop: any) => void) => {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop) || prop === "clearInterval") {
      callbackFn(prop);
    }
  }
};

/**
 * 快照沙箱
 * 用于记录window对象的快照，在执行沙箱代码时，将window对象替换为快照对象，执行完毕后，将window对象恢复为快照对象
 * 用于解决沙箱代码对window对象的污染问题
 */
class SnapshotSandBox {
  windowSnapshot: Window;
  modifyPropMap: Record<any, any> = {};
  constructor() {
    this.windowSnapshot = {} as Window;
    this.modifyPropMap = {};
  }
  active() {
    iter(globalThis, (prop) => {
      this.windowSnapshot[prop] = globalThis[prop];
    });
    Object.keys(this.modifyPropMap).forEach((prop) => {
        globalThis[prop] = this.modifyPropMap[prop];
    });
  }
  inactive() {
    iter(globalThis, (prop) => {
      if (this.modifyPropMap[prop] !== globalThis[prop]) {
        this.modifyPropMap[prop] = globalThis[prop];
        globalThis[prop] = this.windowSnapshot[prop];
      }
    });
  }
}

const sandbox = new SnapshotSandBox();

globalThis.test = 1;

sandbox.active();

globalThis.test = 2;

sandbox.inactive();

console.dir(globalThis.test);




