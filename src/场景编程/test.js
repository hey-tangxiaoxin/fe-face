console.log('test.js')
exports.a = 1
module.exports.b = 2
console.log(this, exports, module.exports)