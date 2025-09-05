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

/*
    debounce with leading and trailing edge
        these options control when debounced fn is executed relative to delay period.
        trailing edge (default)
            function will only execute after specified delay period since last call 
            usecase: search after typing.
        leading edge 
            function will execute at beginning of the delay period 
            aka on leading edge of event
            usecase: execute fn immediately after event, avoid excessive calls 
        both leading & trailing edge 
            function is executed at both beginning and end of delay period
            leading execution happens on the first call, and trailing execution
            happens only if there are calls within delay period             
*/

const debounceAdv = function (func, delay, options = {}) {
  const { leading = false, trailing = true } = options;
  let timeoutId = null;
  let isLeadingInvoked = false;

  // if both trailing & leading are disabled, do nothing
  if (!trailing && !leading) {
    return function () {
      return null;
    };
  }

  return function (...args) {
    let context = this; // store context
    // timeoutId not exists means first call or timeout period is completed
    // (func is executed in trailing edge if trailing is enabled )
    // and leading is true, execute func in leading edge again
    const callNow = !timeoutId && leading;

    // if not leading edge
    if (!callNow) {
      isLeadingInvoked = false;
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // if trailing enabled and not a leading edge, execute func in trailing edge
      // if leading is executed, no need to run trailing for same args
      if (trailing && !isLeadingInvoked) {
        func.call(context, ...args);
      }
      // make timeoutId null, marking timeout period is completed
      timeoutId = null;
    }, delay);

    // if leading enabled, execute func in leading edge
    // without tracking leading invocations, a debounce function with both leading and
    // trailing true might execute twice for single user action
    // once immediately (leading) & once after timeout (trailing)
    if (callNow) {
      isLeadingInvoked = true;
      func.call(context, ...args);
    }
  };
};
