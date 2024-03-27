const depCopy = (target, hash = new WeakMap()) => {
  if (Object.prototype.toString.call(target) !== "[object Object]") {
    throw TypeError("must be object");
  }
  if (hash.has(target)) {
    return hash.get(target);
  }
  const ret = {};
  for (const key of Object.keys(target)) {
    const val = target[key];
    if (
      typeof val !== "object" ||
      val === null ||
      val instanceof RegExp ||
      val instanceof Date
    ) {
      ret[key] = val;
    } else if (Array.isArray(val)) {
      ret[key] = [...val];
    } else if (val instanceof Set) {
      ret[key] = new Set([...val]);
    } else if (val instanceof Map) {
      ret[key] = new Map([...val]);
    } else {
      hash.set(val, val);
      ret[key] = depCopy(val, hash);
    }
  }
  return ret;
};

var test = {
  a: 1,
  b: [1, 2, 3],
  d: function () {
    console.log("d");
  },
  reg: /123/,
  e: null,
  f: undefined,
  g: Boolean(true),
  h: {
    l: "lllll",
    m: {
      n: "nnnnn",
    },
  },
};
test.self = test; //循环引用

const ret = depCopy(test);
console.dir(ret);

/**
 * JSON.parse(JSON.stringify())
 * 弊端：1. undefined 和函数会被丢弃；2. 日期对象会被转换成字符串格式；3. 正则表达式会被转换成空对象
 */
