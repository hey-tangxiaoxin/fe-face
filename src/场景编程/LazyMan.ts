class LazyClass {
  tasks: Array<Function>;
  constructor(name) {
    console.log(`i am ${name}`);
    this.tasks = [];
    setTimeout(() => {
      this.next();
    }, 0);
  }
  private asyncTask(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
  do(name) {
    const fn = () => {
      console.log(`i am do ${name}`);
      this.next();
    };
    this.tasks.push(fn);
    return this;
  }
  sleep(time) {
    const task = this.asyncTask(time);
    const fn = () => {
      console.log(`sleep ${time / 1000}s`);
      return task.then(() => {
        this.next();
      });
    };

    this.tasks.push(fn);
    return this;
  }
  sleepFirst(time) {
    const task = this.asyncTask(time);
    const fn = () => {
      console.log(`first sleep ${time / 1000}s`);
      return task.then(() => {
        this.next();
      });
    };
    this.tasks.unshift(fn);
    return this;
  }
  next() {
    const fn = this.tasks.shift();
    fn && fn();
  }
}

const lazy = new LazyClass("tangxiaoxin");

lazy.do("eat").sleep(2000).do("lunch").sleepFirst(4000);
