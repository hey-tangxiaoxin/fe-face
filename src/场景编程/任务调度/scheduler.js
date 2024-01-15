/**
 * 实现一个class，控制任务执行数
 */
class Scheduler {
    running = [];
    waiting = [];
    constructor({ max }) {
      this.max = max;
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
      Promise.resolve(task())
        .then(task.resolve)
        .catch(task.reject)
        .finally(() => {
          this.running.splice(this.running.findIndex(task), 1);
          if (this.running.length < this.max && this.waiting.length) {
            this.runTask(this.waiting.shift());
          }
        });
    }
  }

  const request = (task) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(task);
      }, task.time);
    });
  };
  
  const scheduler = new Scheduler({ max: 3 });
  
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
  
  const addTask = (time, name) => {
    scheduler
      .addTask(() =>
        request({ time, name }).then(() => {
          return name;
        })
      )
      .then((res) => {
        console.log(`${res} 执行完成`);
      });
  };
  
  tasks.forEach((task) => addTask(task.time, task.name));