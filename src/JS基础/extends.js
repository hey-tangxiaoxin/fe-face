/**
 * extends实现原理
 * @param {*} subType 
 * @param {*} superType 
 */
const inherit = function (subType, superType) {
  subType.prototype = Object.create(superType?.prototype, {
    constructor: {
      value: subType,
      enumerable: false,
      configurable: true,
      writable: true,
    },
  });
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
A.say = function () {
  console.log(this.name);
};

function B() {}
B.prototype.sum = function (a, b) {
  console.log("sum", a, b);
};
B.hello = function () {
  console.log("hello B");
};

inherit(A, B);

const a = new A("tangxiaoxin");

console.log(a.__proto__);
