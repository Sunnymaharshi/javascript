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

// Array.flat() polyfill
const n_arr = [1, 2, [3, 4, [5, 6]]];
// flatten recursive without depth

const flattenRec = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error("input must be an array");
  }
  const result = [];
  for (const ele of arr) {
    if (Array.isArray(ele)) {
      result.push(...flattenRec(ele));
    } else {
      result.push(ele);
    }
  }
  return result;
};
// console.log(flattenRec(n_arr));

// flatten iterative without depth

const flattenIter = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error("input must be an array");
  }

  let result = [];
  const stack = [...arr];
  while (stack.length > 0) {
    // take last element
    const ele = stack.pop();
    if (Array.isArray(ele)) {
      stack.push(...ele);
    } else {
      result.push(ele);
    }
  }
  // since we traversed from right left
  result = result.reverse();
  return result;
};
// console.log(flattenIter(n_arr));

// flatten recursive with depth

const flattenRecDep = (arr, depth) => {
  if (!Array.isArray(arr)) {
    throw new Error("input must be an array");
  }
  if (depth === 0) {
    return arr;
  }
  const result = [];
  for (const ele of arr) {
    if (Array.isArray(ele)) {
      result.push(...flattenRecDep(ele, depth - 1));
    } else {
      result.push(ele);
    }
  }
  return result;
};
// console.log(flattenRecDep(n_arr, 1));
// output: [ 1, 2, 3, 4, [ 5, 6 ] ]

// debounce a function
const debounce = function (func, delay) {
  let timeoutId;
  return function (...args) {
    let context = this; // store context
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.call(context, ...args);
    }, delay);
  };
};

// throttle a function
const throttle = function (func, limit) {
  let inThrottle = false;
  return function (...args) {
    const context = this; // store context
    if (!inThrottle) {
      func.call(context, ...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// EventEmitter class implementation
class EventEmitter {
  constructor() {
    this.events = {};
  }

  // addEventListener or subscribe the event
  subscribe(eventName, callback) {
    if (typeof callback !== "function") {
      throw new TypeError("callback must be a function");
    }
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);

    // return a function to unsubscribe the event
    return () => {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== callback
      );
    };
  }

  // subscribeOnce
  subscribeOnce(eventName, callback) {
    const unsubscribe = this.subscribe(eventName, (payload) => {
      callback(payload);
      // this function forms a closure with outer function, can access unsubscribe
      unsubscribe();
    });
  }

  // run all listeners which are listening to the event
  publish(eventName, ...args) {
    if (this.events[eventName]) {
      const listeners = [...this.events[eventName]];
      listeners.forEach((callback) => callback(...args));
    }
  }
  unsubscribe(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== callback
      );
    }
  }
  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }
}

// Array.sort() polyfill

Array.prototype.mySort = function (compare) {
  if (typeof compare !== "function") {
    compare = (a, b) => a - b;
  }
  const mergeSort = function (arr) {
    if (arr.length <= 1) {
      return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
  };

  const merge = (left, right) => {
    const result = [];
    let l = 0;
    let r = 0;
    while (l < left.length && r < right.length) {
      if (compare(left[l], right[r]) <= 0) {
        result.push(left[l]);
        l++;
      } else {
        result.push(right[r]);
        r++;
      }
    }
    return result.concat(left.slice(l)).concat(right.slice(r));
  };

  // copy sorted array back to this
  const sorted = mergeSort(this.slice());
  for (let i = 0; i < this.length; i++) {
    this[i] = sorted[i];
  }
  return this;
};

// console.log([2, 3, 1, 8, 6].mySort());

// flatten the object with keys as path to each value
const user = {
  name: "Sunny",
  age: 20,
  address: {
    primary: {
      dno: "346",
      street: {
        name: "housing board",
        roadno: 2,
      },
    },
    secondary: null,
  },
  phones: [
    { type: "home", number: "1234567890" },
    { type: "work", number: null },
  ],
};

const flattenObj = (obj, prefix = "", result = {}) => {
  for (const key in obj) {
    // check if key is direct property of object, not inherited
    if (obj.hasOwnProperty(key)) {
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      // handle array
      if (Array.isArray(obj[key])) {
        obj[key].forEach((ele, i) => {
          flattenObj(ele, `${newPrefix}[${i}]`, result);
        });
      }
      // handle object
      else if (typeof obj[key] === "object" && obj[key] != null) {
        flattenObj(obj[key], `${newPrefix}`, result);
      }
      // handle primitives
      else {
        result[newPrefix] = obj[key];
      }
    }
  }
  return result;
};
// console.log(flattenObj(user));

// dispatch event on push to array
// using custom Array class
class WatchArray extends Array {
  constructor(...args) {
    super(...args);
    this.eventTarget = new EventTarget();
  }
  push(...items) {
    const result = super.push(...items);
    const event = new CustomEvent("itemsAdded", {
      detail: {
        items,
        newLength: this.length,
      },
    });
    this.eventTarget.dispatchEvent(event);
    return result;
  }

  addEventListener(type, listener, options) {
    this.eventTarget.addEventListener(type, listener, options);
  }
  removeEventListener(type, listener, options) {
    this.eventTarget.removeEventListener(type, listener, options);
  }
}
const w_arr = new WatchArray();
w_arr.addEventListener("itemsAdded", (e) => {
  console.log("items added", e.detail.items);
  console.log("new array length", e.detail.newLength);
});
// w_arr.push(1, 2, 3);

// using prototype -(not recomended) applys to all arrays, might conflict with libraries

const originalPush = Array.prototype.push;

Array.prototype.push = function (...items) {
  const result = originalPush.apply(this, items);
  if (this.onPush) {
    this.onPush(items);
  }
  return result;
};
Array.prototype.setOnPush = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError("callback must be a function");
  }
  this.onPush = callback;
};
const e_arr = [1, 2, 3];
e_arr.setOnPush(function (args) {
  console.log("new items", args);
});

// e_arr.push(4, 5);

// Deep clone the object - cloneDeep lodash

const deepClone = (value, seen = new WeakMap()) => {
  if (value === null || typeof value !== "object") {
    return value;
  }
  // handle circular references, obj is already cloned once
  if (seen.has(value)) {
    return seen.get(value);
  }
  // handle Date objects
  if (value instanceof Date) {
    return new Date(value.getTime());
  }
  // handle RegExp objects
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags);
  }
  // handle Map object
  if (value instanceof Map) {
    const mapClone = new Map();
    // store to return in future references
    seen.set(value, mapClone);
    value.forEach((val, key) => {
      mapClone.set(deepClone(key, seen), deepClone(val, seen));
    });
    return mapClone;
  }
  // handle Set object
  if (value instanceof Set) {
    const setClone = new Set();
    // store to return in future references
    seen.set(value, setClone);
    value.forEach((val) => {
      setClone.add(deepClone(val, seen));
    });
    return setClone;
  }

  // handle array objects
  if (Array.isArray(value)) {
    const arrClone = [];
    value.forEach((val, index) => {
      arrClone[index] = deepClone(val, seen);
    });
    return arrClone;
  }

  // handle other objects (plain objects, instances)
  // create empty objClone with prototype of obj
  const objClone = Object.create(Object.getPrototypeOf(value));
  seen.set(value, objClone);

  // copy all enumerable own properties
  Object.getOwnPropertyNames(value).forEach((key) => {
    objClone[key] = deepClone(value[key], seen);
  });

  // copy symbol properties
  Object.getOwnPropertySymbols(value).forEach((symbol) => {
    objClone[symbol] = deepClone(value[symbol], seen);
  });

  return objClone;
};
const original = {
  name: "Alice",
  age: 30,
  address: {
    city: "Wonderland",
    country: "Fantasy",
  },
  hobbies: ["reading", "biking"],
  birthDate: new Date(1994, 5, 24),
  regexTest: /abc/i,
};

original.circularRef = original;
// const cloned = deepClone(original);
// console.log(cloned);
// console.log(cloned.circularRef === cloned); // true
// console.log(cloned.circularRef !== original.circularRef); // true
// console.log(cloned.address !== original.address); // true
// console.log(cloned.hobbies !== original.hobbies); // true
// console.log(cloned.birthDate !== original.birthDate); // true
// console.log(cloned.regexTest !== original.regexTest); // true
// console.log(cloned.address.city === original.address.city); // true

// JSON.stringify() polyfill

const jsonStringify = (value, seen = new WeakSet()) => {
  // handle primitives
  if (value === null) return "null";
  if (typeof value === "string") return `"${value.replace(/"/g, '\\"')}"`;
  if (typeof value === "number" || typeof value === "boolean")
    return String(value);
  if (typeof value === "undefined") return undefined;

  // handle arrays, if item is undefined return 'null'
  if (Array.isArray(value)) {
    const items = value.map((item) => jsonStringify(item, seen) ?? "null");
    return `[${items.join(",")}]`;
  }

  // handle plain objects
  if (typeof value === "object") {
    if (seen.has(value)) {
      throw new Error("Circular reference found!");
    }
    seen.add(value);
    const properties = [];
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        const stringified = jsonStringify(value[key], seen);
        if (stringified !== undefined) {
          properties.push(`"${key}":${stringified}`);
        }
      }
    }
    return `'{${properties.join(",")}}'`;
  }

  // functions, symbols
  return undefined;
};

const s_obj = {
  name: "John",
  age: 10,
  city: "New York",
  addr: ["chandpol", "avv"],
  myUndefined: undefined,
  myNull: null,
  circularRef: null,
  nested: {
    name: "Nested",
    valid: true,
  },
  fn: () => {},
};
// console.log(jsonStringify(s_obj));

// How does the renderDom function create and append DOM elements based on the dom object structure
const renderDOM = (domStructure, container = null) => {
  // handle text nodes
  if (typeof domStructure === "string" || typeof domStructure === "number") {
    const textNode = document.createTextNode(domStructure);
    if (container) {
      container.appendChild(textNode);
    }
    return textNode;
  }

  // handle null and undefined
  if (!domStructure) return null;

  const { type, props = {}, children = [] } = domStructure;

  // create DOM element
  const element = document.createElement(type);

  // handle props
  Object.entries(props).forEach(([key, val]) => {
    if (key === "style") {
      element.style.cssText = val;
    } else if (key !== "children") {
      element.setAttribute(key, val);
    }
  });

  // handle children
  const childrenArray = Array.isArray(children) ? children : [children];
  childrenArray.forEach((child) => element.appendChild(renderDOM(child)));

  if (container) {
    container.appendChild(textNode);
  }
  return element;
};
const dom = {
  type: "section",
  props: {
    id: "section-1",
    class: "main-section",
    style: "background-color: lightblue; padding: 20px; border-radius: 5px;",
  },
  children: [
    {
      type: "header",
      children: "Welcome to Soni Frontend Doc",
      props: {
        style: "font-size: 24px; color: darkblue; text-align: center;",
      },
    },
    {
      type: "article",
      children: [
        {
          type: "h2",
          children: "Render DOM",
          props: { style: "color: darkgreen;" },
        },
        {
          type: "p",
          children: "Try youself first then look for solution",
          props: { style: "font-size: 16px; color: grey;" },
        },
      ],
    },
    {
      type: "footer",
      children: "Thanks you :)",
      props: {
        style: "text-align: center; font-size: 14px; color: black;",
      },
    },
  ],
};
// console.log(renderDOM(dom));

// Retry promises N times
const retryPromise = (promiseFn, maxAttempts = 3, delay = 1000) => {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      promiseFn()
        .then(resolve)
        .catch((e) => {
          if (n > 1) {
            // retry promise after delay
            setTimeout(() => {
              console.log("retrying");
              attempt(n - 1);
            }, delay);
          } else {
            console.log(`all ${maxAttempts} attempts failed`, e);
            reject(e);
          }
        });
    };
    attempt(maxAttempts);
  });
};
// retryPromise(() => Promise.resolve(), 2, 1000);

// Promise.all() polyfill
const myPromiseAll = (taskList) => {
  return new Promise((resolve, reject) => {
    if (taskList.length === 0) {
      return resolve([]);
    }
    let rejected = false;
    let completed = 0;
    const result = new Array({ length: taskList.length });
    taskList.forEach((promise, index) => {
      // handle non-promise  values by converting to resolved promises
      Promise.resolve(promise)
        .then((data) => {
          if (rejected) return;
          result[index] = data;
          completed++;
          if (completed === taskList.length) {
            resolve(result);
          }
        })
        .catch((e) => {
          if (rejected) return;
          rejected = true;
          reject(e);
        });
    });
  });
};

// Promise.race polyfill
const myPromiseRace = (taskList) => {
  return new Promise((resolve, reject) => {
    // stays pending according to ECMAScript specifications
    if (taskList.length === 0) return;
    taskList.forEach((promise) => {
      // handle non-promise  values by converting to resolved promises
      // resolve as soon as the first promise resolves
      // reject as soon as the first promise rejects
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
};

// Promise.any() polyfill
const myPromiseAny = (taskList) => {
  return new Promise((resolve, reject) => {
    if (taskList.length === 0) {
      reject("all promises are rejected");
      return;
    }
    const errors = new Array(taskList.length);
    let rejected = 0;
    taskList.forEach((promise, i) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((e) => {
          rejected++;
          errors[i] = e;
          if (rejected === taskList.length) {
            reject(new AggregateError(errors, "all promises are rejected"));
          }
        });
    });
  });
};

// Promise.allSettled() polyfill
const myPromiseAllSettled = (taskList) => {
  return new Promise((resolve, reject) => {
    if (!taskList.length) {
      return Promise.resolve([]);
    }
    const result = new Array(taskList.length);
    let completed = 0;

    taskList.forEach((promise, i) => {
      Promise.resolve(promise)
        .then((data) => {
          result[i] = { status: "fulfilled", value: data };
        })
        .catch((e) => {
          result[i] = { status: "rejected", reason: e };
        })
        .finally(() => {
          completed++;
          if (completed === taskList.length) {
            resolve(result);
          }
        });
    });
  });
};

// clearAllTimeouts polyfill
const addClearAllTimeouts = () => {
  const originalSetTimeout = window.setTimeout;
  const timeouts = new Set();
  window.setTimeout = function (...args) {
    const timeoutid = originalSetTimeout.apply(this, args);
    timeouts.add(timeoutid);
    return timeoutid;
  };
  const originalClearTimeout = window.clearTimeout;
  window.clearTimeout = function (id) {
    timeouts.delete(id);
    return originalClearTimeout(id);
  };

  window.clearAllTimeouts = function () {
    for (const id of timeouts) {
      window.clearTimeout(id);
    }
    timeouts.clear();
    return timeouts.size();
  };
};

// memoize the function
const memoize = (func) => {
  if (typeof func !== "function") {
    throw new TypeError("input must be a function");
  }
  const cache = new Map();
  const serialize = (value) => {
    // handle objects, sort the keys
    if (value !== null && typeof value === "object") {
      const sortedKeys = Object.keys(value).sort();
      return `{${sortedKeys
        .map((key) => `"${key}":${JSON.stringify(value[key])}`)
        .join(",")}}`;
    }
    // handle primitives
    return JSON.stringify(value);
  };

  return function (...args) {
    const cacheKey = args.map(serialize).sort().join("|");
    if (cache.has(cacheKey)) {
      // cache hit
      return cache.get(cacheKey);
    }
    // cache miss
    const result = func.apply(this, args);
    cache.set(cacheKey, result);
    return result;
  };
};

// Async progress bar - multiple progress bar with a limit on active at a time.
const progress_container = document.getElementById("progress-bars-container");
const add_progress = document.getElementById("add-p-btn");
const reset_progress = document.getElementById("reset-p-btn");
class ProgressManager {
  constructor(maxConcurrent = 3, container_element) {
    this.maxConcurrent = maxConcurrent;
    this.activeCount = 0;
    this.queue = [];
    // to cleanup on reset, otherwise activeCount will go negative
    // because of unremoved intervals after clicking reset
    this.tracked_interval_ids = new Set();
    this.container = container_element;
  }
  createProgressBar() {
    const progress_wrapper = document.createElement("div");
    Object.assign(progress_wrapper.style, {
      height: "20px",
      border: "1px black solid",
      width: "300px",
      marginBottom: "5px",
    });
    const progress = document.createElement("div");
    Object.assign(progress.style, {
      height: "100%",
      width: "0%",
      background: "green",
    });
    progress_wrapper.appendChild(progress);
    this.container.appendChild(progress_wrapper);
    return progress;
  }
  animateProgress(element) {
    this.activeCount++;
    let progress = 0;
    const intervalId = setInterval(() => {
      // avoid decreasing activeCount by removed progresses through reset
      if (!element.isConnected) {
        clearInterval(intervalId);
        this.tracked_interval_ids.delete(intervalId);
        // end execution here
        return;
      }
      progress++;
      element.style.width = `${progress}%`;
      if (progress >= 100) {
        clearInterval(intervalId);
        // only decrement activeCount if interval is tracked
        if (this.tracked_interval_ids.has(intervalId)) {
          this.activeCount--;
          this.tracked_interval_ids.delete(intervalId);
          this.runNextProgressBar();
        }
      }
    }, 30);
    this.tracked_interval_ids.add(intervalId);
  }
  runNextProgressBar() {
    if (this.queue.length > 0 && this.activeCount < this.maxConcurrent) {
      const next_progress = this.queue.shift();
      this.animateProgress(next_progress);
    }
  }

  addProgressBar() {
    const progressBar = this.createProgressBar();
    this.queue.push(progressBar);
    this.runNextProgressBar();
  }
  resetProgressBars() {
    // remove all active intervals
    this.tracked_interval_ids.forEach((id) => clearInterval(id));

    this.tracked_interval_ids.clear();
    this.queue.length = 0;
    this.currentIndex = 0;
    this.activeCount = 0;
    this.container.innerHTML = "";
  }
}

const progressManager = new ProgressManager(3, progress_container);
add_progress.addEventListener("click", () => {
  progressManager.addProgressBar();
});
reset_progress.addEventListener("click", () => {
  progressManager.resetProgressBars();
});

// Group by polyfill
const groupBy = (collection, keyFnOrPath) => {
  if (typeof keyFnOrPath !== "function" && typeof keyFnOrPath !== "string") {
    throw new TypeError(`${keyFnOrPath} must be a function or property path`);
  }
  const resolvePath = (obj, path) => {
    // path: address.state.pincode
    const keys = path.split(".");
    let result = obj;
    for (const key of keys) {
      if (result === null) return undefined;
      result = result[key];
    }
    return result;
  };
  const items =
    typeof collection === "string" ? Array.from(collection) : collection;
  // function that returns group by keys
  const getKey =
    typeof keyFnOrPath === "function"
      ? keyFnOrPath
      : (item) => resolvePath(item, keyFnOrPath);
  // empty obj for initial value of reduce
  const result = items.reduce((groups, item) => {
    // find key which the item belongs to
    const key = getKey(item);
    if (!Array.isArray(groups[key])) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
  return result;
};
// console.log(groupBy([{ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } }], "a.b.c"));

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
// console.log(sumCurryInf(1)(2)(0)(1)());

// infinite multiply curry
function multiplyCurryInf(x) {
  return function (y) {
    if (y === undefined) {
      return x;
    }
    return multiplyCurryInf(x * y);
  };
}
// console.log(multiplyCurryInf(2)(2)(2)(2)()); // 16

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
// console.log(multiplyCurry(2)(3)(4)); // 24
// console.log(multiplyCurry(2, 3)(4)); // 24
// console.log(multiplyCurry(2)(3, 4)); // 24

/* 
    Execute task in parallel with resolved dependency
        resolve task dependencies in directed acyclic graph (DAG)
        and execute tasks in parallel with concurrency limit 
    1. resolve dependencies with topological sort 
        topological sort (task=>deps)
            DAG: a=>b=>c=>(d,e) 
            topological order: e d c b a (or) d e c b a 
            algo:
                1. do DFS on each element with visited array
                2. when DFS ends add node to stack 
                    since we need reverse order (from no dependencies)
                3. retrieve nodes from stack to get the topological order
        In-Degree
            The number of tasks that depend ON this task (its dependents)
        Out-Degree
            The number of tasks that this task depends ON (its dependencies) 
*/
function taskRunner(name, delay = 1000) {
  return () =>
    new Promise((resolve, reject) => {
      console.log(`Starting task: ${name}`);
      setTimeout(() => {
        console.log(`Task ${name} Completed`);
        if (name === "A") {
          reject(`Error: Task ${name} is failed`);
          return;
        }
        resolve(`Task ${name} result`);
      }, delay);
    });
}

const graph = {
  E: {
    dependency: ["C", "D"],
    task: taskRunner("E"),
  },
  C: {
    task: taskRunner("C"),
  },
  D: {
    dependency: ["A", "B"],
    task: taskRunner("D"),
  },
  A: {
    task: taskRunner("A"),
  },
  B: {
    task: taskRunner("B"),
  },
};
// use topological sort
function resolveDependencies(graph) {
  const nodes = Object.keys(graph);
  const adjList = new Map();
  const outDegree = new Map();
  const visited = new Set();
  const topologicalOrder = [];
  // to detect cycle
  const temp = new Set();

  // out degree to track dependencies for a task
  // initialise the variables - for nodes without dependencies outDegree is 0
  for (const node of nodes) {
    outDegree.set(node, 0);
    adjList.set(node, []);
  }

  // create adjacent list & find outDegree for all nodes
  for (const node of nodes) {
    const dependencies = graph[node].dependency || [];
    // node => (deps), increase outDegree is no of dependencies
    outDegree.set(node, dependencies.length);
    for (const dependency of dependencies) {
      // adjacent list
      adjList.get(node).push(dependency);
    }
  }

  // DFS for topological sort
  function DFS(node) {
    // In DFS of a node, if one node appears again then it has cycle
    if (temp.has(node)) {
      throw new Error("Graph has a cycle, cannot be sorted topologically");
    }
    // skip if already visited, already sorted
    if (visited.has(node)) {
      return;
    }

    temp.add(node);
    // visit all dependencies of the node
    const dependencies = adjList.get(node);
    for (const dependency of dependencies) {
      if (!visited[dependency]) {
        DFS(dependency);
      }
    }

    // mark as visited and add it to result
    temp.delete(node);
    visited.add(node);
    // this list acts as a stack
    topologicalOrder.push(node);
  }

  // run DFS on all nodes
  for (const node of nodes) {
    // node is not already sorted
    if (!visited.has(node)) {
      DFS(node);
    }
  }

  // reverse the stack to get correct order
  topologicalOrder.reverse();

  return {
    topologicalOrder,
    outDegree,
    adjList,
  };
}

async function executeParallel(
  adjList,
  topologicalOrder,
  outDegree,
  concurrencyLimit = 2
) {
  // Copy outDegree to track remaining dependencies
  const remainingDeps = new Map(outDegree);
  const readyTasks = [];
  // Add initially ready tasks (0 dependencies)
  topologicalOrder.forEach((task) => {
    if (remainingDeps.get(task) === 0) {
      readyTasks.push(task);
    }
  });

  // Track active tasks and results
  let activeCount = 0;
  const results = new Map();
  const failedTasks = new Set();
  let completed = 0;
  const totalTasks = topologicalOrder.length;

  /*
    adjList
        task => (dependencies)
    reverseAdjList
        task => (dependents)
        used for failure propagation 
        when task fails, we need to skip all it's dependents
  */
  const reverseAdjList = new Map();
  for (const task of adjList.keys()) {
    reverseAdjList.set(task, []);
  }
  for (const [task, dependencies] of adjList.entries()) {
    for (const dependency of dependencies) {
      reverseAdjList.get(dependency).push(task);
    }
  }
  function skipDependentTasks(failedTask) {
    const dependents = reverseAdjList.get(failedTask);
    for (const dependent of dependents) {
      if (!failedTasks.has(dependent)) {
        failedTasks.add(dependent);
        // assume it as completed, since we are checking completed to stop the function
        console.log(
          `Skipping ${dependent} because ${failedTask} is Failed/Skipped`
        );
        completed++;
        // recursively skip all dependents
        skipDependentTasks(dependent);
      }
    }
  }

  while (completed < totalTasks) {
    while (readyTasks.length > 0 && activeCount < concurrencyLimit) {
      const task = readyTasks.shift();
      activeCount++;
      graph[task]
        .task()
        .then((result) => {
          results.set(task, result);
          // process dependent tasks
          for (const dependent of reverseAdjList.get(task)) {
            remainingDeps.set(dependent, remainingDeps.get(dependent) - 1);
            // dependent node has no dependencies
            if (remainingDeps.get(dependent) === 0) {
              readyTasks.push(dependent);
            }
          }
        })
        .catch((e) => {
          console.log(e);
          failedTasks.add(task);
          // since task is failed, all tasks that depends on it will be skipped recursively
          skipDependentTasks(task);
        })
        .finally(() => {
          activeCount--;
          completed++;
        });
    }
    // if we are at concurrency limit or waiting for tasks to be completed, wait sometime
    if (activeCount > 0) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (
      activeCount === 0 &&
      readyTasks.length === 0 &&
      completed < totalTasks
    ) {
      console.log(
        "no more tasks can be executed. some may be unreadable due to failure"
      );
      break;
    }
  }
  return { results, failedTasks };
}

// const { adjList, topologicalOrder, outDegree } = resolveDependencies(graph);
// executeParallel(adjList, topologicalOrder, outDegree, 2).then((result) =>
//   console.log(result)
// );
