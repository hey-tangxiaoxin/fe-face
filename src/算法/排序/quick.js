/**
 * 快速排序：每次遍历，选定一个中间值，比中间值小的放在左边，比中间值大的放在右边
 * 重点：递归进行数组元素按基准值分类，比基准值小的放在左边，比基准值大的放在右边
 * 时间复杂度：o(nlogn)
 * 空间复杂度：0(logn)
 * @param {*} arr
 * @returns
 */
const quickly = (arr) => {
  if (arr.length <= 1) return arr;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  const left = [],
    right = [];
  arr.forEach((item, index) => {
    if (item < pivot) {
      left.push(item);
    } else {
      right.push(item);
    }
  });
  return quickly(left).concat([pivot], quickly(right));
};

const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(quickly(arr));
