const curring = function (fn) {
  const length = fn.length;
  const _args = [];
  return function executor() {
    _args.push(...Array.from(arguments));
    return _args.length < length
      ? executor.bind(this)
      : fn.call(this, ..._args);
  };
};

const add = (a, b, c) => {
  return a + b + c;
};

const curriedAdd = curring(add);

const ret = curriedAdd(1)(2)(3);
console.log(ret);
