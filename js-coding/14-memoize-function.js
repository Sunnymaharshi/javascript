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
