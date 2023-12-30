const request = (task) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(task);
    }, task.time);
  });
};

const asyncScheduler1 = async (tasks, max, callback = () => {}) => {
  const tasksLen = tasks.length;
  const queue = [];
  const ret = [];
  for (let index = 0; index < tasksLen; index++) {
    const task = request(tasks[index]);
    task.then((res) => {
      ret.push(res);
      console.log(`${res.name}执行完成，当前并发数: ${queue.length}`);
      queue.splice(queue.indexOf(task), 1);
      if (ret.length === tasksLen) {
        "function" === typeof callback && callback(ret);
      }
    });
    queue.push(task);
    if (queue.length === max) {
      await Promise.race(queue);
    }
  }
};

const asyncScheduler2 = (tasks, max, callback = () => {}) => {
  const tasksLen = tasks.length;
  const queue = [];
  const ret = [];
  let index = 0;
  const run = (task) => {
    const promise = request(task);
    promise.then((res) => {
      console.log(`${res.name}执行完成，当前并发数: ${queue.length}`);
      queue.splice(queue.indexOf(promise), 1);
      if (ret.push(res) < tasksLen && index + 1 < tasksLen) {
        run(tasks[++index]);
      } else if (ret.length === tasksLen) {
        "function" === typeof callback && callback(ret);
      }
    });
    queue.push(promise);
    if (queue.length < max) {
      run(tasks[++index]);
    }
    console.log(queue.length);
  };
  run(tasks[index]);
};

class TaskScheduler {
  constructor({ max }) {
    this.running = [];
    this.waiting = [];
    this.max = max ?? 2;
  }
  addTask(task) {
    return new Promise((resolve, reject) => {
      task.resolve = resolve;
      task.reject = reject;
      if (this.running.length < this.max) {
        this.runTask(task);
      } else {
        this.waiting.push(task);
      }
    });
  }
  runTask(task) {
    this.running.push(task);
    task()
      .then(task.resolve)
      .catch(task.reject)
      .finally(() => {
        this.running.splice(this.running.indexOf(task), 1);
        if (this.running < this.max && !!this.waiting.length) {
          this.runTask(this.waiting.shift());
        }
      });
  }
}

const tasks = [
  { name: "a", time: 2000, index: 1 },
  { name: "b", time: 1000, index: 2 },
  { name: "c", time: 8000, index: 3 },
  { name: "d", time: 3000, index: 4 },
  { name: "e", time: 1000, index: 5 },
  { name: "f", time: 2000, index: 6 },
  { name: "g", time: 8000, index: 7 },
  { name: "h", time: 4000, index: 8 },
  { name: "i", time: 1000, index: 9 },
  { name: "j", time: 2000, index: 10 },
];
// asyncScheduler2(tasks, 3, (ret) => {
//   console.log(ret);
// });

const scheduler = new TaskScheduler({});
const addTask = (time, order) => {
  scheduler.addTask(() =>
    request({ time, order }).then(() => {
      console.log(order);
    })
  );
};

tasks.forEach((task) => addTask(task.time, task.index))


