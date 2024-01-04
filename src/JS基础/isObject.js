/**
 * typeof/instanceof 并不能判断是否为对象
 * 1. null和引用类型如Array，Map，Set使用typeof判断也是Object；
 * 2. 引用类型如Array，Map，Set使用instanceof判断也是Object
 * @param target 
 * @returns boolean
 */
const isObject = (target) => {
    if (Object.prototype.toString.call(target) !== '[object Object]') {
        return false;
    }
    if (target?.constructor !== Object) {
        return false;
    }
    if (Object.getPrototypeOf(target) !== Object.prototype) {
        return false
    }
    return true
}