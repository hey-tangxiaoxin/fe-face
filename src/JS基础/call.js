
const global = new Function('return this')()

Function.prototype.call = function (context) {
    if(typeof this !== 'function'){
        throw new TypeError('not function')
    }
    context = context || global;
    const fn = this;
    const args = Array.from(arguments).slice(1)
    return fn(...args)
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

// sayName.call(window)
console.log(global);