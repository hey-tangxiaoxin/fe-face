/**
 * 合并两个有序链表
 * @param list1
 * @param list2
 * @returns
 */
const mergeList = (list1, list2) => {
  if (list1.length === 0) return list2;
  if (list2.length === 0) return list1;
  if (list1.value < list2.value) {
    list1.next = mergeList(list1.next, list2);
    return list1;
  }
  list2.next = mergeList(list1, list2.next);
  return list2;
};

export { mergeList };
