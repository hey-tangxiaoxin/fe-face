/**
 * 选择排序：每次从无序数组中选择一个最小值放在有序数组后面
 * 时间复杂度：o(n^2)
 * @param {*} arr
 * @returns
 */
const select = (arr) => {
  var min, index;
  console.time("选择排序耗时");
  for (var i = 0; i < arr.length; i++) {
    min = arr[i];
    index = i;
    for (var j = i; j < arr.length; j++) {
      if (arr[j] < min) {
        min = arr[j];
        index = j;
      }
    }
    const temp = arr[index];
    arr[index] = arr[i];
    arr[i] = temp;
  }
  console.timeEnd("选择排序耗时");
  return arr;
};

console.log(select([6, 3, 1, 9, 22, 10, 19, 12]));
