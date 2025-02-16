/**
 * 爬楼梯：每次可以爬1或2个台阶，求爬到第n阶楼梯的方法数
 * @param num
 * @returns
 */
const climbStairs = (num) => {
  if (num <= 2) return num;
  return climbStairs(num - 1) + climbStairs(num - 2);
};

/**
 * 解析：
 * 1. 爬到第n阶楼梯的方法数，等于爬到n-1阶楼梯的方法数和爬到n-2阶楼梯的方法数之和
 * 2. 爬到n-1阶楼梯的方法数，等于爬到n-2阶楼梯的方法数和爬到n-3阶楼梯的方法数之和
 */

console.log(climbStairs(10)); // 89