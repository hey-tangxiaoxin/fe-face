/**
 * 深度优先遍历二叉树
 * 1. 先序：根 ➡️ 左 ➡️ 右
 * 2. 中序：左 ➡️ 根 ➡️ 右
 * 3. 后序：左 ➡️ 右 ➡️ 根
 * type TreeNode = {
 *  val: any
 *  left: TreeNode
 *  right: TreeNode
 * }
 */
/**
 * 先序遍历 - 递归实现
 */
const preOrder = (root) => {
  if(!root) return;
  console.log(root.val);
  preOrder(root.left);
  preOrder(root.right);
}

/**
 * 先序遍历 - 栈实现
 */
const depthWithStack = (root) => {
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    console.log(node.val);
    if (node.right) {
      stack.push(node.right);
    }
    if (node.left) {
      stack.push(node.left);
    }
  }
};

/**
 * 中序遍历 - 递归实现
 */
const inOrder = (root) => {
  if (!root) return;
  inOrder(root.left);
  console.log(root.val);
  inOrder(root.right);
}

/**
 * 后序遍历 - 递归实现
 */
const postOrder = (root) => {
  if (!root) return;
  postOrder(root.left);
  postOrder(root.right);
  console.log(root.val);
}