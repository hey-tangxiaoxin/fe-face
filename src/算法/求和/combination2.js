/**
 * 三数之和，返回所有和为0的三元组，不能重复
 * @param {Number} candidates
 * @returns {Number[][]}
 */
var threeSum = function (candidates) {
  if (candidates.length < 3) return [];
  const ret = [];
  const dfs = (index, path = [], sum) => {
    if (path.length === 3 && sum === 0) return ret.push(path.slice());
    if (path.length > 3) return;
    for (let i = index; i < candidates.length; i++) {
      // 去重
      if (i - 1 >= index && candidates[i - 1] === candidates[i]) continue;
      sum += candidates[i];
      path.push(candidates[i]);
      dfs(i + 1, path, sum);
      sum -= candidates[i];
      path.pop();
    }
  };
  candidates.sort((a, b) => a - b);
  dfs(0, [], 0);
  return ret;
};
console.log(threeSum([-1, 0, 1, 2, -1, -4]));
