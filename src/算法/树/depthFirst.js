const Dom = require('../react/vDom')

const depth1 = (dom, nodeList) => {
  nodeList.push(dom.key)
  dom.children.forEach((element) => {
    depth1(element, nodeList)
  })
}
const nodeList = []
depth1(Dom, nodeList)
console.log(nodeList.join('=>'))

const depth2 = (node) => {
  const stack = []
  const nodes = []
  if (node) {
      stack.push(node)
      while (stack.length) {
        //每次取最后一个
          const item = stack.pop()
          nodes.push(item.key)
          //判断children的长度
          while(item.children.length){
            stack.push(item.children.pop())
          }
      }
  }
  return nodes.join('=>')
}
console.log(depth2(Dom));   