/**
 * 二叉树层序遍历
 * @param {*} root
 * @returns
 */
const levelOrder = (root) => {
  if (!root) return [];
  const levels = [];
  const queue = [root];
  while (queue.length) {
    const levelSize = queue.length;
    const levelNodes = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      levelNodes.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    levels.push(levelNodes);
  }
  return levels;
};
