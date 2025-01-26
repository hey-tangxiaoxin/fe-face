type Constructor<T = {}> = new (...args: any[]) => T;

const singleton = <T>(className: Constructor<T>): Constructor<T> => {
  let ins = null;
  return new Proxy(className, {
    construct(target, arg) {
      if (ins) {
        return ins;
      }
      return (ins = new target(...arg));
    },
  });
};

export { singleton };

class Logger {
  log(message) {
    console.log(message);
  }
  warn(message) {
    console.warn(message);
  }
}

const SingleLogger = singleton(Logger);

const log1 = new SingleLogger();
const log2 = new SingleLogger();
console.log(log1 === log2);
