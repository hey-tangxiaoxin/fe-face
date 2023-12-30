Array.prototype._flat = function (level = 1) {
    const result = [];
    let _level = level
    this.forEach(item => {
        if (Array.isArray(item) && (_level > 0 || level === Infinity)) {
            result.push(...item._flat(--_level))
        } else {
            result.push(item)
        }
    })
    return result
}

const arr = [1, [2, 3, [4, 5, 6]]]
console.log(arr._flat(Infinity))

Array.prototype._flatMap = function (fn) {
    if ("function" != typeof fn) throw Error('fn must be a function')
    return this._flat(Infinity).map(fn)
}

console.log(arr._flatMap(x => x * 2))