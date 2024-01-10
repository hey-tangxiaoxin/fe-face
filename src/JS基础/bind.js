Function.prototype.bind = function (context) {
    const _this = this;
    const args = Array.from(arguments).slice(1)
    return function F() {
        //兼容F作为构造函数的情况
        if (this instanceof F) {
            return new _this(...args, ...arguments)
        } else {
            return _this.apply(context, args.concat(...arguments))
        }
    }
}