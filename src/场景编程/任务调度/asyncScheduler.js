/**
 * Promise.race实现
 * @param {*} tasks
 * @param {*} max
 */
const asyncScheduler = async function (tasks, max) {
  const len = tasks.length;
  const ret = [];
  const queue = [];
  for (let index = 0; index < len; index++) {
    const p = Promise.resolve(tasks[index]);
    p.then((res) => {
      queue.splice(queue.indexOf(p), 1);
      if (ret.push(res) === len) {
        return Promise.resolve(ret);
      }
    });
    if (queue.push(p) === max) {
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
  )
).then((res) => {
  console.log(res);
});
