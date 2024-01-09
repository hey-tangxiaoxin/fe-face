/**
 * 归并排序：采用分治发，把无序数组分割成两个子数组进行排序，然后把有序的子数组进行合并
 * 重点：归的过程拆分数组，并的过程合并有序数组
 * 时间复杂度：o(nlogn)
 * 空间复杂度：o(logn)
 * @param {*} arr
 * @returns
 */
const mergeSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left, right) => {
  const result = [];
  while (left.length && right.length) {
    if (left[0] > right[0]) {
      result.push(right.shift());
    } else {
      result.push(left.shift());
    }
  }
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
};
console.log(
  mergeSort([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48])
);
