import { revertLink } from "./revert";
/**
 * 重排链表
 * @param {Node} head
 */
const reorderList = (head): void => {
  const middle = findMiddle(head);
  const revert = revertLink(middle);
  mergeLink(head, revert);
};

/**
 * 查找链表中点
 * @param {Node} head
 * @returns
 */
const findMiddle = (head) => {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};

const mergeLink = (headA, headB) => {
  while (headA && headB) {
    let tempA = headA.next;
    let tempB = headB.next;
    headA.next = headB;
    headA = tempA;
    headB.next = headA;
    headB = tempB;
  }
};
