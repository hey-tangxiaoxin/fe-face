/**
 * Object.is 与 严格等于
 * 1. Object.is(NaN, NaN)结果是true，NaN===NaN结果是false
 * 2. Object.is(+0, -0)结果是false，+0===-0结果是true
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
Object.is = function (x, y) {
    if (x === y) {
        return x !== 0 || 1 / x === 1 / y
    } else {
        return x !== x && y !== y
    }
}