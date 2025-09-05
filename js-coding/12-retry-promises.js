// Retry promises N times
const retryPromise = (promiseFn, maxAttempts = 3, delay = 1000) => {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      promiseFn()
        .then(resolve)
        .catch((e) => {
          if (n > 1) {
            // retry promise after delay
            setTimeout(() => {
              console.log("retrying");
              attempt(n - 1);
            }, delay);
          } else {
            console.log(`all ${maxAttempts} attempts failed`, e);
            reject(e);
          }
        });
    };
    attempt(maxAttempts);
  });
};
// retryPromise(() => Promise.resolve(), 2, 1000);
