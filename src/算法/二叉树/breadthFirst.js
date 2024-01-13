/**
 * 广度优先遍历二叉树
 * type TreeNode = {
 *  val: any
 *  left: TreeNode
 *  right: TreeNode
 * }
 */

/**
 * 队列实现
 * @param {*} root 
 */
const breadth = (root) => {
  if(!root) return;
  const queue = [root]
  while(queue.length){
    const levelSize = queue.length;
    for(let index=0;index<levelSize;index++){
      const node = queue.shift()
      console.log(node.val)
      if(node.left){
        queue.push(node.left)
      }
      if(node.right){
        queue.push(node.right)
      }
    }
  }
}
