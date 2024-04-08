/**
 * 有向图环检测问题（依赖循环检测）
 * @param {*} deps
 * @returns
 */
function checkCyclicRequire(deps) {
  const ret = Object.entries(deps).map(([jsPath]) => {
    return checkCyclic(jsPath, [], deps);
  });
  return ret
    .flat(1)
    .filter(([flag]) => flag === "cyclic")
    .map(([flag, ...path]) => path.join("->"))
    .join("\n");

  function checkCyclic(jsPath, depsChains, deps) {
    if (depsChains.includes(jsPath)) {
      return [["cyclic", ...depsChains, jsPath]];
    } else if (jsPath in deps) {
      return deps[jsPath].deps
        .map((path) => checkCyclic(path, [...depsChains, jsPath], deps))
        .flat(1);
    } else {
      return [["noCyclic", ...depsChains, jsPath]];
    }
  }
}

// 测试用例
let deps = {
  "a.js": {
    deps: ["b.js", "e.js"],
  },
  "b.js": {
    deps: ["c.js"],
  },
  "c.js": {
    deps: ["d.js"],
  },
  "d.js": {
    deps: ["a.js"],
  },
};
var res = checkCyclicRequire(deps);
console.log(res);
