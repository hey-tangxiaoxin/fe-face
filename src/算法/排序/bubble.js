/**
 * 冒泡排序
 * 时间复杂度：o(n^2)
 * @param {*} arr
 * @returns
 */
const bubble = (arr) => {
  console.time("冒泡排序耗时");
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j+1], arr[j]] = [arr[j], arr[j+1]]
      }
    }
  }
  console.timeEnd("冒泡排序耗时");
  return arr;
};

console.log(bubble([8, 2, 3, 1, 9, 2, 0]));
