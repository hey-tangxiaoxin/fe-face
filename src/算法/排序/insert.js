/**
 * 插入排序：每次从无序数组中选择一个值插入有序数组的合适位置（类似扑克牌）
 * 时间复杂度：o(n^2)
 * @param {*} arr
 * @returns
 */
const insert = (arr) => {
  for (var i = 1; i < arr.length; i++) {
    var key = arr[i];
    j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
};

console.log(insert([3, 2, 5, 1, 8, 4]));
