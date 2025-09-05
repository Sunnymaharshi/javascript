/*
    Map limit 
        inputs 
            array of inputs to be processed
        max_limit 
            max no of concurrent operations that can be executed
        iterateeFn 
            async function that need to be called on each input 
            args: input, callback that is invoked with result 
            as arg after processing the input 
        callback
            invoked with all the results when all inputs are processed          
*/
function asyncIterFn(input, cb) {
  const delay = Math.round(Math.random() * 10) * 1000 + 100;
  console.log(`Starting processing: ${input} (will take ${delay}ms)`);
  setTimeout(() => {
    cb(`Processed ${input}`);
  }, delay);
}
function finalCallback(allResults) {
  console.log("Results:", allResults);
}
function myMapList(inputs, max_limit, iterateeFn, callback) {
  if (!inputs || !inputs.length) {
    return callback([]);
  }
  const results = new Array(inputs.length);
  let running = 0;
  let index = 0;
  let completed = 0;

  function processNext() {
    if (completed === inputs.length) {
      return callback(results);
    }
    // here while loop quickly starts async iterateeFn until the limit or all inputs, and exits loop
    // main thread will be free so event loop runs those async iterateeFn's
    // while loop does not wait for iterateeFn to complete, so it won't block the main thread
    while (index < inputs.length && running < max_limit) {
      const currentIndex = index++;
      running++;
      // callback passed here forms a closure with processNext() as it is defined inside it
      iterateeFn(inputs[currentIndex], (res) => {
        console.log(`Completed ${inputs[currentIndex]}`);
        results[currentIndex] = res;
        completed++;
        running--;
        // once input is processed, start processing next input
        processNext();
      });
    }
  }
  processNext();
}
// myMapList([1, 2, 3, 4, 5], 2, asyncIterFn, finalCallback);
