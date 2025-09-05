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
console.log(jsonStringify(s_obj));
