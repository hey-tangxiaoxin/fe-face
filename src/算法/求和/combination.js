/**
 * 总和等于目标值的所有排列
 * @param {Number} candidates
 * @param {Number} target
 * @returns {Number[][]}
 */
const combination = (candidates = [], target = 0) => {
  if (!candidates.length) return [];
  const ret = [];
  const backtrack = (index, path = [], sum) => {
    if (sum > target) return;
    if (sum === target) return ret.push(path.slice());
    for (let i = index; i < candidates.length; i++) {
      if (i - 1 >= index && candidates[i - 1] == candidates[i]) continue;
      path.push(candidates[i]);
      sum += candidates[i];
      backtrack(i + 1, path, sum);
      sum -= candidates[i];
      path.pop();
    }
  };
  candidates.sort((a, b) => a - b);
  backtrack(0, [], 0);
  return ret;
};

console.log(combination([10, 1, 2, 7, 6, 1, 5], 8));
