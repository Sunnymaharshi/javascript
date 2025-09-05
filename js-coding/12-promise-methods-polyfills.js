// Promise.all() polyfill
const myPromiseAll = (taskList) => {
  return new Promise((resolve, reject) => {
    if (taskList.length === 0) {
      return resolve([]);
    }
    let rejected = false;
    let completed = 0;
    const result = new Array({ length: taskList.length });
    taskList.forEach((promise, index) => {
      // handle non-promise  values by converting to resolved promises
      Promise.resolve(promise)
        .then((data) => {
          if (rejected) return;
          result[index] = data;
          completed++;
          if (completed === taskList.length) {
            resolve(result);
          }
        })
        .catch((e) => {
          if (rejected) return;
          rejected = true;
          reject(e);
        });
    });
  });
};

// Promise.race polyfill
const myPromiseRace = (taskList) => {
  return new Promise((resolve, reject) => {
    // stays pending according to ECMAScript specifications
    if (taskList.length === 0) return;
    taskList.forEach((promise) => {
      // handle non-promise  values by converting to resolved promises
      // resolve as soon as the first promise resolves
      // reject as soon as the first promise rejects
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
};

// Promise.any() polyfill
const myPromiseAny = (taskList) => {
  return new Promise((resolve, reject) => {
    if (taskList.length === 0) {
      reject("all promises are rejected");
      return;
    }
    const errors = new Array(taskList.length);
    let rejected = 0;
    taskList.forEach((promise, i) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((e) => {
          rejected++;
          errors[i] = e;
          if (rejected === taskList.length) {
            reject(new AggregateError(errors, "all promises are rejected"));
          }
        });
    });
  });
};

// Promise.allSettled() polyfill
const myPromiseAllSettled = (taskList) => {
  return new Promise((resolve, reject) => {
    if (!taskList.length) {
      return Promise.resolve([]);
    }
    const result = new Array(taskList.length);
    let completed = 0;

    taskList.forEach((promise, i) => {
      Promise.resolve(promise)
        .then((data) => {
          result[i] = { status: "fulfilled", value: data };
        })
        .catch((e) => {
          result[i] = { status: "rejected", reason: e };
        })
        .finally(() => {
          completed++;
          if (completed === taskList.length) {
            resolve(result);
          }
        });
    });
  });
};
