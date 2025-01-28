/**
 * 二叉树最小深度
 * @param {*} root
 * @returns
 * link: https://leetcode.cn/problems/minimum-depth-of-binary-tree/solutions/382646/er-cha-shu-de-zui-xiao-shen-du-by-leetcode-solutio/
 */
const minDeps = (root) => {
  if (!root) return 0;
  if (!root.left && !root.right) return 1;
  let min = Number.MAX_SAFE_INTEGER;
  if (root.left) {
    min = Math.min(minDeps(root.left), min);
  }
  if (root.right) {
    min = Math.min(minDeps(root.right), min);
  }
  return min + 1;
};
