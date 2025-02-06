/**
 * 实现一个精确定时器
 * 1. 误差在10ms内
 * 2. 尽可能准确
 * @param fn
 * @param time
 */
const loop = (fn: (clear: () => void) => any, time: number) => {
  let prev = Date.now();
  let count = 0;
  let interval = time;
  const inner = () => {
    count++;
    /**
     * 计算误差
     * =0 表示定时准确
     * >0 表示定时延后
     * <0 表示定时提前
     */
    const offset = Date.now() - (prev + count * time);
    interval = time - offset;
    const timer = setTimeout(inner, interval);
    fn.call(globalThis, () => clearTimeout(timer));
  };
  setTimeout(inner, time);
};

let count = 0;

loop((clear) => {
  count++;
  if (count > 5) {
    clear();
  }
  console.log("hello");
}, 1000);
