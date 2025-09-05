/*  
    Cancelable Promise 
        implementate Promise.cancelable()
        allow cancelation of promise with custom error 
        take promise and return a cancelable promise
*/
Promise.cancelable = function (promise) {
  let cancelled = false;
  let cancelError = new Error("Promise was cancelled");
  cancelError.name = "CancelError";
  const wrappedPromise = new Promise((resolve, reject) => {
    promise
      .then((value) => {
        if (cancelled) {
          reject(cancelError);
        } else {
          resolve(value);
        }
      })
      .catch((error) => {
        if (cancelled) {
          reject(cancelError);
        } else {
          reject(error);
        }
      });
  });
  // add cancel function as property to promise object
  wrappedPromise.cancel = function () {
    cancelled = true;
  };
  return wrappedPromise;
};

const cPromise = Promise.cancelable(
  new Promise((resolve) => setTimeout(() => resolve("data"), 1000))
);
cPromise.cancel();
