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
const compareStr = (str1, str2, splitChar) => {
  const p1 = str1.split(splitChar).filter(n => !!n);
  const p2 = str2.split(splitChar).filter(n => !!n);
  const len = Math.max(p1.length, p2.length);
  while (p1.length < len) {
    p1.push(0);
  }
  while (p2.length < len) {
    p2.push(0);
  }
  const iter1 = walker(p1.join(splitChar), splitChar);
  const iter2 = walker(p2.join(splitChar), splitChar);
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

const str1 = "1-23-4-0-10-0-0";
const str2 = "1-23--4-0-10";

console.log(compareStr(str1, str2, '-'));
