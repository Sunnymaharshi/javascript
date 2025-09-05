const doc1 = {
  name: "John",
  age: 12,
  address: {
    city: "Boston",
    zip: "10001",
    country: "USA",
  },
  phone: "987-654-3210",
  friends: {
    friend1: { name: "Alice", age: 30 },
    friend2: { name: "Bob", age: 25 },
  },
  hobbies: ["table tennis"],
};
const doc2 = {
  name: "John",
  age: 14,
  address: {
    city: "New York",
    zip: "10001",
    country: "Canada",
  },
  phone: "123-456-7890",
  friends: {
    friend1: { name: "Alice", age: 30 },
    friend2: { name: "Bob", age: 26 },
  },
  country: "India",
};
function deepCompare(obj1, obj2) {
  const diff = {};

  const allkeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  for (const key of allkeys) {
    if (!(key in obj1)) {
      diff[key] = { from: "EMPTY", to: obj2[key] };
    } else if (!(key in obj2)) {
      diff[key] = { from: obj1[key], to: "EMPTY" };
    }
    // both are objects
    else if (
      typeof obj1[key] === "object" &&
      obj1[key] !== null &&
      typeof obj2[key] === "object" &&
      obj2[key] !== null
    ) {
      const nestedDiff = deepCompare(obj1[key], obj2[key]);
      if (Object.keys(nestedDiff).length > 0) {
        diff[key] = nestedDiff;
      }
    } else if (obj1[key] !== obj2[key]) {
      diff[key] = { from: obj1[key], to: obj2[key] };
    }
  }
  return diff;
}
console.log(deepCompare(doc1, doc2));
