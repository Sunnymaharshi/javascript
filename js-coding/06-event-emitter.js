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
