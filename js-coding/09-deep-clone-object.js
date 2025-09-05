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
const cloned = deepClone(original);
console.log(cloned);
console.log(cloned.circularRef === cloned); // true
console.log(cloned.circularRef !== original.circularRef); // true
console.log(cloned.address !== original.address); // true
console.log(cloned.hobbies !== original.hobbies); // true
console.log(cloned.birthDate !== original.birthDate); // true
console.log(cloned.regexTest !== original.regexTest); // true
console.log(cloned.address.city === original.address.city); // true
