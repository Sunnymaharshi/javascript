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
console.log(groupBy([{ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } }], "a.b.c"));
