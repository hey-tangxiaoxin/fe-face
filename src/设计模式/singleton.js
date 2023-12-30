const singleton = (className) => {
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
