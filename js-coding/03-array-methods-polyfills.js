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
console.log(arr.myMap((num) => num + 1));

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
console.log(arr.myFilter((num) => num % 2 === 0));

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
console.log(arr.myReduce((total, num) => num + total));

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

console.log(arr.every((num) => num > 0));

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
console.log(flattenRec(n_arr));

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
console.log(flattenIter(n_arr));

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
console.log(flattenRecDep(n_arr, 1));
// output: [ 1, 2, 3, 4, [ 5, 6 ] ]

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

console.log([2, 3, 1, 8, 6].mySort());
