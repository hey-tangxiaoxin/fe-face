let request = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: "ks" });
    }, time);
  });
};

const m1 = () => {
  console.log("----m1执行----");
  return request(2000);
};

const syncExec = (task) => {
  const cache = {
    state: "pending",
    value: null,
    reason: null,
  };

  const rawRequest = request;
  request = (time) => {
    if (cache.state === "fulfilled") {
      return cache.value;
    }
    if (cache.state === "rejected") {
      throw cache.reason;
    }
    const p = rawRequest(time)
      .then((res) => {
        cache.state = "fulfilled";
        cache.value = res;
      })
      .catch((error) => {
        cache.state = "rejected";
        cache.reason = error;
      });
    throw p;
  };
  try {
    task();
  } catch (error) {
    if (error instanceof Promise) {
      error.finally(() => {
        task();
        request = rawRequest;
      });
    }
  }
};

const main = () => {
  const res = m1();
  console.log("----结果----", res);
};

syncExec(main);
