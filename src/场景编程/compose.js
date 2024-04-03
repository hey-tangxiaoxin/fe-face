const compose =
  (...fns) =>
  (...args) =>
    fns.reduceRight((res, fn) => fn(res), args);

const composeAsync =
  (...fns) =>
  (...args) =>
    fns.reduceRight(async (pre, fn) => fn(await pre), Promise.resolve(args));

const request = (timer, name) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(`${name} invoked`);
      resolve(timer);
    }, timer)
  );

const task1 = () => request(1000, "task1");
const task2 = () => request(2000, "task2");
const task3 = () => request(3000, "task3");

const mainAsync = composeAsync(task1, task2, task3);

mainAsync().then(res => console.log(res))
