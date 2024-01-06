const _new = function (fn: Function, ...rest) {
    const obj = Object.create(fn.prototype)  //obj.__proto__ = fn.prototype
    const ret = fn.apply(obj, rest)  //绑定this
    return ret ? ret : obj
}

class Person {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age
    }
    say() {
        return `my name is ${this.name}, ${this.age} years old!`
    }
}

const ins = _new(Person, 'tangxiaoxin', 28)