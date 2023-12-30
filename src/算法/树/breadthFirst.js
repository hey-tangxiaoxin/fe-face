const dom = require('../react/vDom')
const breadth = (dom) => {
  const queue = []
  const nodeList = []
  if (dom) {
    queue.push(dom)
    while (queue.length) {
      const item = queue.shift()
      nodeList.push(item.key)
      item.children.forEach((child) => {
        queue.push(child)
      })
    }
  }
  return nodeList.join('=>')
}
const { result, depth } = breadth(dom)
console.log(result, depth)
