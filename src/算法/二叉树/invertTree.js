/**
 * 翻转二叉树
 * @param {*} root 
 * @returns 
 * link：https://leetcode.cn/problems/invert-binary-tree/submissions/494607008/
 */
const invertTree = (root) => {
    if(!root) return null;
    const left = invertTree(root.left)
    const right = invertTree(root.right)
    root.left = right;
    root.right = left;
    return root
}