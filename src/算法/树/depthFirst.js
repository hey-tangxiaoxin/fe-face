/**
 * 深度优先遍历二叉树 (先序遍历二叉树)
 * type TreeNode = {
 *  val: any
 *  left: TreeNode
 *  right: TreeNode
 * }
 */
/**
 * 递归实现
 */
const depth = (root) => {
  if(!root) return;
  console.log(root.val)
  depth(root.left)
  depth(root.right)
}

/**
 * 栈实现
 */
const depthWithStack = (root) => {
  const stack = [root]
  while(stack.length){
    const node = stack.pop()
    console.log(node.val)
    if(node.right) {
      stack.push(node.right)
    }
    if(node.left){
      stack.push(node.left)
    }
  }
}