const debounce = function (fn, delay, { leading }) {
  let timer = null;
  return function () {
    if (timer < Date.now() && leading) {
      fn.apply(this, arguments);
      timer = Date.now() + delay;
    } else {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, delay);
    }
  };
};

const log = () => {
  console.log("123");
};

const debounceLog = debounce(log, 5000, { leading: true });
debounceLog();

// setInterval(debounceLog, 2000)
