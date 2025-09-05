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
console.log(flattenObj(user));
