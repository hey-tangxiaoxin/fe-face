/**
 * 递归实现
 * @param {task[]} tasks 任务列表
 * @param {number} max 最大并发数
 */
const syncScheduler = (tasks, max, callback) => {
  const len = tasks.length;
  const queue = [];
  const ret = [];
  let index = 0;
  const run = (task) => {
    const p = Promise.resolve(task());
    p.then((res) => {
      queue.splice(queue.indexOf(p), 1);
      if (ret.push(res) < len && index + 1 < len) {
        run(tasks[++index]);
      } else if (ret.length === len && typeof callback === "function") {
        callback(ret);
      }
    });
    if (queue.push(p) < max) {
      run(tasks[++index]);
    }
  };
  return run(tasks[index]);
};

const request = (task) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(task);
    }, task.time);
  });
};

syncScheduler(
  Array.from({ length: 8 }, (_, v) =>
   () => request({ time: Math.floor(Math.random() * 10) * 1000, name: `task${v}` })
  ),
  4,
  (ret) => {
    console.log(ret)
  }
);
