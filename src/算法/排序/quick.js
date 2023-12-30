/**
 * 快速排序：每次遍历，选定一个中间值，比中间值小的放在左边，比中间值大的放在右边
 * 重点：递归进行数组元素按基准值分类，比基准值小的放在左边，比基准值大的放在右边
 * 时间复杂度：o(nlogn)
 * 空间复杂度：0(logn)
 * @param {*} arr
 * @returns
 */
const quick = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quick(left).concat([pivot], quick(right));
};
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(quick(arr));
