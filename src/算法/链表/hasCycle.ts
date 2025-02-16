/**
 * 判断链表是否有环
 * @param {LinkNode} head
 * @returns
 */
function hasCycle(head): boolean {
  if (!head || !head.next) return false;
  while (head) {
    if (head.flag) return true;
    head.flag = true;
    head = head.next;
  }
  return false;
}

const detectCycle = (head) => {
  if (!head || !head.next) return null;
  while (head) {
    if (head.flag) return head;
    head.flag = true;
    head = head.next;
  }
};
