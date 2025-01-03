Array.prototype.flat = function (level = 1) {
  const result = [];
  this.forEach((item) => {
    if (Array.isArray(item) && (level > 0 || level === Infinity)) {
      result.push(...item.flat(--level));
    } else {
      result.push(item);
    }
  });
  return result;
};

const arr = [1, [2, 3, [4, 5, 6]]];
console.log(arr.flat(Infinity));

Array.prototype.flatMap = function (fn) {
  if ("function" != typeof fn) throw Error("fn must be a function");
  return this.flat(Infinity).map(fn);
};

console.log(arr.flatMap((x) => x * 2));
