const walker = function* (str, splitChar) {
  let n = "";
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === splitChar) {
      if (!!n) {
        yield Number(n);
        n = "";
      }
    } else {
      n += char;
    }
  }
  if (n) {
    yield Number(n);
  }
};

/**
 * 两个字符串比较，要求时间复杂度不超过O(n)
 * @param {string} str1
 * @param {string} str2
 * @returns 0 | 1 | -1
 */
const compareStr = (str1, str2) => {
  const iter1 = walker(str1, "-");
  const iter2 = walker(str2, "-");
  while (true) {
    const n1 = iter1.next();
    const n2 = iter2.next();
    if (n1.done && n2.done) {
      return 0;
    } else if (n1.done) {
      return -1;
    } else if (n2.done) {
      return 1;
    } else if (n1.value > n2.value) {
      return 1;
    } else if (n1.value < n2.value) {
      return -1;
    }
  }
};

const str1 = "1-23-4-0-10";
const str2 = "1-23--4-0-10";

console.log(compareStr(str1, str2));
