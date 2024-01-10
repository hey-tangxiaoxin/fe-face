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
    while(current){
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next
    }
    return prev;
}