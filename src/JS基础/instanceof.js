const instanceOf = function (left, right) {
    const leftVal = Object.getPrototypeOf(left)
    const rightVal = right.prototype
    while (true) {
        if (leftVal === null) {
            return false
        }
        if (leftVal === rightVal) {
            return true
        }
        leftVal = Object.getPrototypeOf(leftVal)
    }
}