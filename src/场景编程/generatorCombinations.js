/**
 * 
 * @param {多级分类、查找所有不同组合} list 
 * @returns 
 */
const generatorCombinations = (list) => {
  const combinations = [];
  const len = list.length;
  const breakTracking = (arr, path = []) => {
    if (path.length === len) {
      return combinations.push(path.slice());
    }
    const [first, ...rest] = arr;
    for (const value of first) {
      path.push(value);
      breakTracking(rest, path);
      path.pop();
    }
  }
  breakTracking(list)
  return combinations
};

const list = [
  ["苹果", "华为", "小米", "vivo"],
  ["红色", "蓝色", "黑色", "白色", "绿色"],
  ["64G", "128G", "256G"],
  ["5.5", "6.1", "6.2", "6.3", "6.4", "6.5"],
];

console.log(generatorCombinations(list));