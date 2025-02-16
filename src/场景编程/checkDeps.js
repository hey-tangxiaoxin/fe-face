/**
 * 有向图环检测问题（依赖循环检测）
 * @param {*} deps
 * @returns
 */
function hasCycle(graph) {
  const visited = new Set();
  const stack = new Set();

  function dfs(node) {
    if (stack.has(node)) {
      return true; // 检测到循环
    }
    if (visited.has(node)) {
      return false; // 已经访问过的节点
    }

    visited.add(node);
    stack.add(node);

    for (const neighbor of graph[node]) {
      if (dfs(neighbor)) {
        return true;
      }
    }

    stack.delete(node);
    return false;
  }

  for (const node in graph) {
    if (dfs(node)) {
      return true;
    }
  }

  return false;
}

// 示例用法
const graph = {
  'A': ['B'],
  'B': ['C'],
  'C': ['A'], // 这里有一个循环依赖
  'D': ['E'],
  'E': []
};

console.log(hasCycle(graph)); // 输出: true
