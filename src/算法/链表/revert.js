/**
 * 反转链表
 * type LinkNode = {
 *  value: any
 *  next: LinkNode
 * }
 */
const revertLink = (head) => {
  let current = head;
  let prev = null;
  while (current) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
};

/**
 * 反转区域链表
 * @param {LinkNode} head
 */
const reverseBetween = (head, left, right) => {
  const dummy = new ListNode(-1, head);
  let pre = dummy,
    rightNode = dummy,
    index = 0;
  while (index++ < right - 1) {
    if (index < left - 1) {
      pre = pre.next;
    }
    rightNode = rightNode.next;
  }
  let leftNode = pre.next;
  const nextNode = rightNode.next;
  pre.next = null;
  rightNode.next = null;
  revertLink(leftNode);
  pre.next = rightNode;
  leftNode.next = nextNode;
  return dummy.next;
};
