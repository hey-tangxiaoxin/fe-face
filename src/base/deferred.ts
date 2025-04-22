class Deferred<T = void> {
  promise: Promise<T>;
  resolve: (value: PromiseLike<T> | T) => void;
  reject: (reason: any) => void;
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

class Deferred2<T = void> {
  constructor() {
    return Promise.withResolvers<T>();
  }
}

const deferred = new Deferred();

const deferred2 = new Deferred2();

console.log(deferred2);

const task1 = async () => {
  await deferred.promise;
  console.log("------task1 开始执行");
};

const task2 = () => {
  setTimeout(() => {
    deferred.resolve();
  }, 100);
};
