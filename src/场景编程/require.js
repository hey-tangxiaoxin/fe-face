
/**
 * CommonJS 模块加载机制
 * 理解Commonjs模块加载机制，需要先理解require函数的执行过程
 * @returns {*}
 */
const path = require('path');
const fs = require('fs');
function _require(moduleName) {
  //1. 根据模块名，生成模块的绝对路径
  const modulePath = _require.resolve(moduleName);
  //2. 检查缓存中是否已经加载过该模块
  if (_require.cache[modulePath]) {
    return _require.cache[modulePath].exports;
  }
  //3. 创建一个新的模块对象，用于存储模块的导出内容
  const exports = {};
  const module = {
    id: modulePath,
    exports,
  };
  //4. 将模块对象添加到缓存中
  _require.cache[modulePath] = module;
  //5. 加载模块的源代码
  const code = fs.readFileSync(modulePath, "utf8");
  //6. 执行模块的源代码，并将模块的导出内容存储到模块对象中
  const wrapper = new Function(
    "module",
    "exports",
    "_require",
    "__dirname",
    "__filename",
    code
  );
  // 执行函数时上下文环境是exports，会传入module, exports, _require, __dirname, __filename等参数
  // 模块中的this指向exports的根本原因
  wrapper.call(
    exports,
    module,
    module.exports,
    _require,
    modulePath,
    moduleName
  );
  //7. 返回模块的导出内容，即module.exports，注意不是exports
  return module.exports;
}

_require.cache = {};

_require.builtinModules = {
  fs: require("fs"),
  path: require("path")
};

_require.resolve = function (moduleName) {
  //1. 检查是否是内置模块
  if (moduleName in _require.builtinModules) {
    return _require.builtinModules[moduleName];
  }
  //2. 检查是否是绝对路径
  if (path.isAbsolute(moduleName)) {
    return moduleName;
  }
  return path.resolve(__dirname, moduleName)
}

const r = _require('./test.js');
console.log(r);
