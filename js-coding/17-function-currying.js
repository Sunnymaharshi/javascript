/*  Function currying
        technique in JavaScript where a function with multiple arguments is 
        transformed into a sequence of functions, each taking a single argument. 
        This allows for partial application of functions and 
        creates more flexible, reusable code.
        func(1,2,3) = > fn(1)(2)(3)
    infinite function currying
        takes values as arguments
        actual function will return a function which decides 
        whether to return actual function again or result 
    curry factory/helper function 
        takes function as argument
        returns a curried function which returns a function which decides 
        whether to return curried function again or result 
*/
// infinite sum curry
const sumCurryInf = (arg1) => {
  return (arg2) => {
    // no args passed
    if (arg2 === undefined) {
      return arg1;
    }
    // return top level function again with new sum
    return sumCurryInf(arg1 + arg2);
  };
};
console.log(sumCurryInf(1)(2)(0)(1)());

// infinite multiply curry
function multiplyCurryInf(x) {
  return function (y) {
    if (y === undefined) {
      return x;
    }
    return multiplyCurryInf(x * y);
  };
}
console.log(multiplyCurryInf(2)(2)(2)(2)()); // 16

// factory or helper curry function
function curryHelper(fn) {
  return function curried(...args) {
    // >= because in js, functions allow more arguments than defined
    // this handles the case when passed more argument than needed
    // function will ignore extra args
    // if == is used, if passed extra args it will never stop fn execution
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

// generic multiply curry - concat args in apply method
function multiplyFn(a, b, c) {
  return a * b * c;
}
const multiplyCurry = curryHelper(multiplyFn);
console.log(multiplyCurry(2)(3)(4)); // 24
console.log(multiplyCurry(2, 3)(4)); // 24
console.log(multiplyCurry(2)(3, 4)); // 24
