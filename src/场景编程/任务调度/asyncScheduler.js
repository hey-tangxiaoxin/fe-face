/**
 * Promise.race实现
 * @param {task[]} tasks
 * @param {number} max
 */
const asyncScheduler = async function (tasks, max, callback) {
  const len = tasks.length;
  const ret = [];
  const queue = [];
  console.time("执行时间");
  for (let index = 0; index < len; index++) {
    const p = Promise.resolve(tasks[index]());
    const i = index;
    queue.push(p);
    p.then((res) => {
      queue.splice(queue.indexOf(p), 1);
      ret[i] = res;
      if (ret.length === len) {
        typeof callback === "function" && callback(ret);
        console.timeEnd("执行时间");
      }
    });
    if (queue.length === max) {
      await Promise.race(queue);
    }
  }
};

const request = (task) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(task);
    }, task.time);
  });
};

asyncScheduler(
  Array.from(
    { length: 8 },
    (_, v) => () =>
      request({ time: Math.floor(Math.random() * 10) * 1000, name: `task${v}` })
  ),
  3,
  (ret) => {
    console.log("------执行完了------\n", ret);
  }
);
