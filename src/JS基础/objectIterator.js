/**
 * 实现object解构
 * 如 const [a, b] = {a: 3, b: 4}
 */
Object.prototype[Symbol.iterator] = function* () {
  yield* Object.values(this);
};

const [a, b] = {a: 3, b: 4}
console.log(a, b)