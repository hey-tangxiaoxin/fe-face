const instanceOf = function (left, right) {
    const leftVal = left.__proto__
    const rightVal = right.prototype
    while (true) {
        if (leftVal === null) {
            return false
        }
        if (leftVal === rightVal) {
            return true
        }
        leftVal = leftVal.__proto__
    }
}