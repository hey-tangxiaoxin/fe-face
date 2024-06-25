const combinations = [];
const generatorCombinations = (arr, path = []) => {
  if (path.length === list.length) {
    return combinations.push(path.slice());
  }
  const [first, ...rest] = arr;
  for (const value of first) {
    path.push(value);
    generatorCombinations(rest, path);
    path.pop();
  }
};

const list = [
  ["苹果", "华为", "小米", "vivo"],
  ["红色", "蓝色", "黑色", "白色", "绿色"],
  ["64G", "128G", "256G"],
  ["5.5", "6.1", "6.2", "6.3", "6.4", "6.5"],
];

generatorCombinations(list);
console.log(combinations);
