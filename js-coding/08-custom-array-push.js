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
w_arr.push(1, 2, 3);

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

e_arr.push(4, 5);
