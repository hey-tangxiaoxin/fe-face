/**
 * 二叉树最大深度
 * @param {*} root
 * @returns
 * link：https://leetcode.cn/problems/maximum-depth-of-binary-tree/submissions/497390905/
 */
const maxDepth = (root) => {
  if (!root) return 0;
  if (!root.left && !root.right) return 1;
  let max = 0;
  if (root.left) {
    max = Math.max(maxDepth(root.left), max);
  }
  if (root.right) {
    max = Math.max(maxDepth(root.right), max);
  }
  return max + 1;
};
