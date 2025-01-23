const request = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: "ks" });
    }, time);
  });
};

const m1 = async () => {
  return await request(1000);
};

const m2 = async () => {
  return await m1();
};

const syncExec = (task) => {
  const cache = {
    state: "pending",
    value: null,
    reason: null,
  };
  const fn = () => {
    console.log("----fn-----");
    if (cache.state === "fulfilled") {
      return cache.value;
    }
    if (cache.state === "rejected") {
      throw cache.reason;
    }
    const p = task().then(
      (res) => {
        cache.state = "fulfilled";
        cache.value = res;
      },
      (error) => {
        cache.state = "rejected";
        cache.reason = error;
      }
    );
    throw p;
  };
  try {
    task();
  } catch (error) {
    console.log("finally", error instanceof Promise);
    if (error instanceof Promise) {
      error.finally(() => {
        return fn();
      });
    }
  }
};

const main = () => {
  const res = m2();
  console.log("----结果----", res);
};

syncExec(main);
