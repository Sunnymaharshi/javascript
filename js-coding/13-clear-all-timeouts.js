// clearAllTimeouts polyfill
const addClearAllTimeouts = () => {
  const originalSetTimeout = window.setTimeout;
  const timeouts = new Set();
  window.setTimeout = function (...args) {
    const timeoutid = originalSetTimeout.apply(this, args);
    timeouts.add(timeoutid);
    return timeoutid;
  };
  const originalClearTimeout = window.clearTimeout;
  window.clearTimeout = function (id) {
    timeouts.delete(id);
    return originalClearTimeout(id);
  };

  window.clearAllTimeouts = function () {
    for (const id of timeouts) {
      window.clearTimeout(id);
    }
    timeouts.clear();
    return timeouts.size();
  };
};
