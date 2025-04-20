/*
    Method chaining
        ability call a method on another method of same object 
        ex: "abc ".toUpperCase().trim()
        for our classes     
            return this inside methods 
            don't return this for get methods
*/

class Student {
  favs = [];
  constructor(name) {
    this.name = name;
  }
  getMyFavorites() {
    return this.favs.join("\n");
  }
  addFav(category, name) {
    this.favs.push(`My Favourite ${category}: ${name}`);
    return this;
  }
}
const student = new Student("Sunny");
const favs = student
  .addFav("Sport", "Cricket")
  .addFav("Subject", "Science")
  .getMyFavorites();
// console.log(favs);

// --------Promises in Sequence----------
const timeouts = [300, 500, 100];
const sleep = (timeout) => {
  console.log("sleep:", timeout);
  return new Promise((resolve, reject) => {
    setTimeout(resolve.bind(null, timeout.toString()), timeout);
  });
};

//  imperative way - explicitly describe how to perform a task
const promisesInSequenceIm = async () => {
  const result = [];
  for (const timeout of timeouts) {
    try {
      const data = await sleep(timeout);
      result.push({ status: "success", data });
    } catch (e) {
      result.push({ status: "failure", data: e });
    }
  }
  console.log(result);
};
// promisesInSequenceIm();

// declarative way - what needs to be achieved, and the system handles the "how"
// Approach  1
const promisesInSequenceDe1 = () => {
  sleep(300)
    .then(() => sleep(500))
    .then(() => sleep(100));
};
// promisesInSequenceDe1();

/* Approach 2 - using Array.reduce & Promise.resolve()
        we use Promise.resolve() as initial value 
        so we can use then on it, and return next promise
        accumulator will be a promise 
        execution will look like 
            Promise.resolve()
                .then(()=>sleep(300))
                .then(()=>sleep(500))
                .then(()=>sleep(100))
*/
const promisesInSequenceDe2 = async () => {
  await timeouts.reduce(
    (promiseAccumulator, curTimeout) =>
      promiseAccumulator.then(() => sleep(curTimeout)),
    Promise.resolve()
  );
};
// promisesInSequenceDe2();

const arr = [1, 2, 3, 4, 5];

// Array.map polyfill
Array.prototype.myMap = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};
// console.log(arr.myMap((num) => num + 1));

// Array.filter polyfill
Array.prototype.myFilter = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};
// console.log(arr.myFilter((num) => num % 2 === 0));

// Array.reduce polyfill
Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  let [accumulator, startIndex] =
    initialValue !== undefined ? [initialValue, 0] : [this[0], 1];
  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};
// console.log(arr.myReduce((total, num) => num + total));

// Array.every polyfill
Array.prototype.myEvery = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) {
      return false;
    }
    return true;
  }
};

// console.log(arr.every((num) => num > 0));

// call, apply & bind polyfills
const person = {
  fullName: function (greet) {
    return `${greet} ${this.firstName} ${this.lastName}`;
  },
};
const person1 = {
  firstName: "John",
  lastName: "Doe",
};
// Function.call polyfill
Function.prototype.myCall = function (context, ...args) {
  /*
    must check type of this because of method borrowing 
    method borrowing
        where methods is borrowed and used on non-functions
    const notFunction = {}
    notFunction.myCall = Function.prototype.myCall;
    notFunction.myCall({},"hi")  // should throw the error 
  */
  if (typeof this !== "function") {
    throw new TypeError("myCall is called on non-function");
  }

  // handle null or undefined context by setting it to global object
  // use window in browser, global in Node.js, this(original function) as fallback
  // In some unique environments we don't have or can't access global objects
  // like web workers, service workers, custom js engines
  if (context === null || context === undefined) {
    context =
      typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
        ? global
        : this;
  }
  // Convert primitive data types to their object equivalents
  // ex: converts 1 to Number{1}
  else if (typeof context !== "object" || typeof context !== "function") {
    context = Object(context);
  }

  // create a unique property name to avoid overriding existing properties
  const uniqueSymbol = Symbol("uniqueFunctionSymbol");

  // In JS, when function is called as method of an object, this value inside function automatically
  // references the object the method was called on.
  // store original function (this) as a property on the context
  context[uniqueSymbol] = this;

  // execute the function with provided context and arguments
  // context.func() is same as context["func"](), brackets are used for dynamic values
  const result = context[uniqueSymbol](...args);

  // clean up by removing temporary property
  delete context[uniqueSymbol];

  return result;
};

// console.log(person.fullName.myCall(person1, "Hi"));

// Function.apply polyfill
Function.prototype.myApply = function (context, argsArr) {
  if (typeof this !== "function") {
    throw new TypeError("myApply is called on non-function");
  }
  // handle null or undefined context by setting it to global object
  if (context === null || context === undefined) {
    context =
      typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
        ? global
        : this;
  }
  // Convert primitive data types to their object equivalents
  else if (typeof context !== "object" || typeof context !== "function") {
    context = Object(context);
  }

  // validate if argsArr is Array-like
  if (typeof argsArr !== "undefined" && !Array.isArray(argsArr)) {
    throw new TypeError("the second argument must be an array");
  }
  // use empty array if argsArr is undefined
  argsArr = argsArr || [];

  // create a unique property name to avoid overriding existing properties
  const uniqueSymbol = Symbol("uniqueFunctionSymbol");

  // store original function (this) as a property on the context
  context[uniqueSymbol] = this;

  // execute the function with provided context and arguments
  const result = context[uniqueSymbol](...argsArr);

  // clean up by removing temporary property
  delete context[uniqueSymbol];

  return result;
};
// console.log(person.fullName.myApply(person1, ["Hello"]));

// Function.bind polyfill
Function.prototype.myBind = function (context, ...boundArgs) {
  if (typeof this !== "function") {
    throw new TypeError("myBind is called on non-function");
  }
  // handle null or undefined context by setting it to global object
  if (context === null || context === undefined) {
    context =
      typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
        ? global
        : this;
  }
  // Convert primitive data types to their object equivalents
  else if (typeof context !== "object" || typeof context !== "function") {
    context = Object(context);
  }

  // store original function
  const originalFunction = this;

  // create a unique property name to avoid overriding existing properties
  const uniqueSymbol = Symbol("boundFunction");

  return function (...args) {
    const combinedArgs = [...boundArgs, ...args];
    // store original function as a property on the context
    context[uniqueSymbol] = originalFunction;

    // execute the function with provided context and arguments
    const result = context[uniqueSymbol](...combinedArgs);

    // clean up
    delete context[uniqueSymbol];

    return result;
  };
};
// console.log(person.fullName.myBind(person1)("Ola"));
