function Person(name) {
  this.name = name;
  this.getName = function () {
    console.log(this.name);
  };
}

const person = new Person("tangxiaoxin");
person.getName();

/**
 * 实现对象私有属性
 * 1. ts private只是编译层面的私有属性，并不是运行层面的私有属性
 * 2. 闭包容易造成内存泄漏
 * 3. Symbol, getOwmPropertySymbols可以获取到Symbol属性
 */
class Person {
  constructor(name) {
    this.map = new WeakMap();
    this.map.set(this, {
      name,
    });
  }

  getName() {
    console.log(this.map.get(this).name);
  }
}
