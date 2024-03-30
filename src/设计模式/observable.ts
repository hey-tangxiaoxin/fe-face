/**
 * 观察者模式：所有观察者实现统一的API，观察内容发生改变时，调度所有观察者的API执行更新
 * 调度对象：观察者模式的调度发生在具体目标内，如Observable
 */
type Observer<T = any> = {
  next: (value?: T) => void;
  error?: (err?: any) => void;
  complete?: () => void;
};

class Observable<T = any> {
  private observerList: Array<Observer> = [];
  constructor() {
    this.observerList = [];
  }
  subscribe(observer: Observer | (() => Observer)) {
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
  next(value: T) {
    this.observerList.forEach((observer) => {
      observer.next(value);
    });
  }
  error(error: any) {
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

observer.next("hello");

setTimeout(() => {
  observer.next("world");
  subscription.unsubscribe();
}, 2000);
