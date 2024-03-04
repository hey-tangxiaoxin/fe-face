function Person(name) {
    this.name = name
    this.getName = function () {
        console.log(this.name)
    }
}

const person = new Person("tangxiaoxin")
person.getName()