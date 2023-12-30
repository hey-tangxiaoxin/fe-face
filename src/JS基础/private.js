function Person(name) {
    const _name = name
    this.getName = function () {
        console.log(_name)
    }
}

const person = new Person("tangxiaoxin")
console.log(person.getName())