Array.prototype.fill = function (val, start, end = this.length) {
    if (start < end) {
        this[start] = val
        this.fill(val, start + 1, end)
    }
}

const arr = [1, 2, 3, 4, 5, 6]
arr.fill(0, 2, 4)
console.log(arr)