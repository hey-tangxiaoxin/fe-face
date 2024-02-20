/**
 * extends实现原理
 * @param {*} subType
 * @param {*} superType
 */
const inherit = function (subType, superType) {
  subType.prototype = Object.create(superType?.prototype);
  subType.prototype.constructor = subType;
  if (superType) {
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subType, superType)
      : (subType.__proto__ = superType);
  }
};
function A(name) {
  this.name = name;
}
A.prototype.add = function (a, b) {
  return a + b;
};

A.prototype.say = function () {
  console.log(this.name);
};

function B(name) {
  this.name = name;
}
B.prototype.sum = function (a, b) {
  console.log("sum", a, b);
};
B.hello = function () {
  console.log("hello B");
};

inherit(B, A);

const a = new A("A");

a.say();

const b = new B("B");

b.say();
