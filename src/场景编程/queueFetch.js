const doFetch = (url, timer) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url);
    }, timer);
  });
};

const serialFetch = (arr) => {
  return new Promise((resolve, reject) => {
    const ret = [];
    const tasks = arr.map(({ url, timer }) => doFetch(url, timer));
    tasks
      .reduce(
        (pre, cur) =>
          pre.then((res) => {
            ret.push(res);
            return cur;
          }),
      )
      .then((res) => {
        ret.push(res)
        resolve(ret)
      });
  });
};
serialFetch([
  { url: "/api1", timer: 4000 },
  { url: "/api2", timer: 1000 },
]).then((list) => console.log(list));
