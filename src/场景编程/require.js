function require(/* ... */) {
    const module = { exports: {} };
    ((module, exports) => {
        // Module code here. In this example, define a function.
        function someFunc() { }
        exports = someFunc;
        // At this point, exports is no longer a shortcut to module.exports, and
        // this module will still export an empty default object.
        // module.exports = someFunc;
        // At this point, the module will now export someFunc, instead of the
        // default object.
    })(module, module.exports);
    return module.exports;
} 

const r = require()
console.log(r);