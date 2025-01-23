Function.prototype.apply = function (context) {
    context = context || window
    context.fn = this ?? function () { }
    const args = Array.from(arguments).slice(1)
    const result = context.fn(args)
    delete context.fn
    return result
}

const window = {
    name: 'window'
}

const a = {
    name: 'a'
}
const sayName = function () {
    console.log(this.name)
}

sayName.apply(window)
