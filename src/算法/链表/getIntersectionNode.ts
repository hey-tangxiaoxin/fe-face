/**
 * 相交链表：https://leetcode.cn/problems/intersection-of-two-linked-lists/
 * @param headA
 * @param headB
 * @returns
 */
const getIntersectionNode = (headA, headB) => {
  const visited = new Set();
  let temp = headA;
  while (temp !== null) {
    visited.add(temp);
    temp = temp.next;
  }
  temp = headB;
  while (temp !== null) {
    if (visited.has(temp)) {
      return temp;
    }
    temp = temp.next;
  }
  return null;
};
