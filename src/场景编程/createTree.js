const list = [
    {
        id: 1,
        value: "1",
        parentId: null,
    },
    {
        id: 2,
        value: "2",
        parentId: null,
    },
    {
        id: 11,
        value: "11",
        parentId: 1,
    },
    {
        id: 21,
        value: "21",
        parentId: 2,
    },
    {
        id: 111,
        value: "111",
        parentId: 11,
    },
    {
        id: 211,
        value: "211",
        parentId: 21,
    },
];

const createTreeFromList = (list) => {
    const ret = []
    const listMap = (list ?? []).reduce((pre, cur) => ({ ...pre, [cur.id]: { ...cur, children: [] } }), {})
    list.forEach(item => {
        if (!item.parentId) {
            ret.push(listMap[item.id])
        } else {
            listMap[item.parentId].children.push(listMap[item.id])
        }
    });
    return ret
}
console.log(JSON.stringify(createTreeFromList(list)))