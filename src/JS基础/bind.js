Function.prototype.bind = function (context) {
  const nativeFn = this;
  const args = Array.from(arguments).slice(1);
  return function F() {
    //兼容F作为构造函数的情况
    if (new.target) {
      return new nativeFn(...args, ...arguments);
    } else {
      return nativeFn.apply(context, args.concat([...arguments]));
    }
  };
};
