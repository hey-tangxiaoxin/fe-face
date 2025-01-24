/**
 * 观察者模式：一种行为设计模式，允许一个被观察对象（Subject）订阅另一个（或多个）观察者（Observer）的事件，当被观察者发生变化时，观察者会收到通知并执行相应的操作
 * 被观察者和观察者之间存在一对多的依赖关系，当被观察者发生变化时，所有观察者都会收到通知并执行相应的操作
 * 组成：
 *  Subject被观察者：被观察者是一个对象，它维护了一个观察者列表，当被观察者发生变化时，会通知所有观察者
 *  Observer观察者：观察者是一个对象，它实现了一个接口，当被观察者发生变化时，会调用观察者的接口
 * 特点：1. 所有观察者实现统一的API，观察内容发生改变时，调度所有观察者的对应API执行更新
 *      2. 观察者模式的调度发生在被观察目标内部，如Observable，Subject
 */
type Observer<T = any> = {
  next: (value?: T) => void;
  error?: (err?: Error) => void;
  complete?: () => void;
};

class Observable<T = any> {
  private observerList: Array<Observer> = [];
  constructor() {
    this.observerList = [];
  }
  public subscribe(observer: Observer | (() => Observer)) {
    if (typeof observer === "function") {
      observer = observer();
    }
    this.observerList.push(observer);
    return {
      unsubscribe: () => {
        this.observerList = this.observerList.filter(
          (item: Observer) => item !== observer
        );
      },
    };
  }
  public next(value: T) {
    this.observerList.forEach((observer) => {
      observer.next(value);
    });
  }
 public error(error: any) {
    this.observerList.forEach((observer) => {
      observer.error!(error);
    });
  }
  complete() {
    this.observerList.forEach((observer) => {
      observer.complete!();
    });
  }
}

const observer = new Observable();
const subscription = observer.subscribe(() => ({
  next(value) {
    console.log(value);
  },
}));

const subscription2 = observer.subscribe(() => ({
  next(value) {
    console.log("2", value);
  },
}));

observer.next("hello");

setTimeout(() => {
  observer.next("world");
  subscription.unsubscribe();
}, 2000);

setTimeout(() => {
  observer.next("123");
}, 3000);
