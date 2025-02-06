/**
 * 大数相加，两个大数相加，结果可能会超出Number的最大值，所以用字符串表示，返回字符串
 * @param {string} a
 * @param {string} b
 * @returns
 */
const bigAdd = (a, b) => {
  const maxLen = Math.max(a.length, b.length);
  a = a.padStart(maxLen, 0);
  b = b.padStart(maxLen, 0);
  let f = 0,
    sum = "";
  for (let i = maxLen - 1; i >= 0; i--) {
    let t = parseInt(a[i]) + parseInt(b[i]) + f;
    f = t / 10;
    sum = (t % 10) + sum;
  }
  if (f > 0) {
    sum = 1 + sum;
  }
  return sum;
};
