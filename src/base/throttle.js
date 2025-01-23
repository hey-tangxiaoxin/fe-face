const throttle = function (fn, delay) {
  const last = Date.now();
  return function () {
    const now = Date.now();
    if (now - last > delay) {
      fn.apply(this, arguments);
      last = now;
    }
  };
};