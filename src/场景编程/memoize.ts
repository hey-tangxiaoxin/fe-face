class MemoizeMap {
  private map: Map<string, any>;
  private weakMap: WeakMap<WeakKeyTypes, any>;
  constructor() {
    this.map = new Map();
    this.weakMap = new WeakMap();
  }
  private isObject(val) {
    return Object.prototype.toString.call(val) === "[object Object]";
  }
  get(key) {
    if (this.isObject(key)) {
      return this.weakMap.get(key);
    } else {
      return this.map.get(key);
    }
  }
  set(key, val) {
    if (this.isObject(key)) {
      this.weakMap.set(key, val);
    } else {
      this.map.set(key, val);
    }
  }
  has(key) {
    if (this.isObject(key)) {
      return this.weakMap.has(key);
    } else {
      return this.map.has(key);
    }
  }
  delete(key) {
    if (this.isObject(key)) {
      this.weakMap.delete(key);
    } else {
      this.map.delete(key);
    }
  }
}

const memoize = (fn: Function, resolver?: Function) => {
  const memoized = function () {
    const defaultKey = fn.name ?? fn.toString();
    const key =
      typeof resolver === "function"
        ? resolver.apply(this, arguments) ?? defaultKey
        : defaultKey;
    const cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    const value = fn.apply(this, arguments);
    cache.set(key, value);
    return value;
  };
  memoized.cache = new MemoizeMap();
  return memoized;
};
