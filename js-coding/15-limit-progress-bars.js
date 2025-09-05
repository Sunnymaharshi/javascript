// Async progress bar - multiple progress bar with a limit on active at a time.
if (typeof document !== "undefined") {
  const progress_container = document.getElementById("progress-bars-container");
  const add_progress = document.getElementById("add-p-btn");
  const reset_progress = document.getElementById("reset-p-btn");
  class ProgressManager {
    constructor(maxConcurrent = 3, container_element) {
      this.maxConcurrent = maxConcurrent;
      this.activeCount = 0;
      this.queue = [];
      // to cleanup on reset, otherwise activeCount will go negative
      // because of unremoved intervals after clicking reset
      this.tracked_interval_ids = new Set();
      this.container = container_element;
    }
    createProgressBar() {
      const progress_wrapper = document.createElement("div");
      Object.assign(progress_wrapper.style, {
        height: "20px",
        border: "1px black solid",
        width: "300px",
        marginBottom: "5px",
      });
      const progress = document.createElement("div");
      Object.assign(progress.style, {
        height: "100%",
        width: "0%",
        background: "green",
      });
      progress_wrapper.appendChild(progress);
      this.container.appendChild(progress_wrapper);
      return progress;
    }
    animateProgress(element) {
      this.activeCount++;
      let progress = 0;
      const intervalId = setInterval(() => {
        // avoid decreasing activeCount by removed progresses through reset
        if (!element.isConnected) {
          clearInterval(intervalId);
          this.tracked_interval_ids.delete(intervalId);
          // end execution here
          return;
        }
        progress++;
        element.style.width = `${progress}%`;
        if (progress >= 100) {
          clearInterval(intervalId);
          // only decrement activeCount if interval is tracked
          if (this.tracked_interval_ids.has(intervalId)) {
            this.activeCount--;
            this.tracked_interval_ids.delete(intervalId);
            this.runNextProgressBar();
          }
        }
      }, 30);
      this.tracked_interval_ids.add(intervalId);
    }
    runNextProgressBar() {
      if (this.queue.length > 0 && this.activeCount < this.maxConcurrent) {
        const next_progress = this.queue.shift();
        this.animateProgress(next_progress);
      }
    }

    addProgressBar() {
      const progressBar = this.createProgressBar();
      this.queue.push(progressBar);
      this.runNextProgressBar();
    }
    resetProgressBars() {
      // remove all active intervals
      this.tracked_interval_ids.forEach((id) => clearInterval(id));

      this.tracked_interval_ids.clear();
      this.queue.length = 0;
      this.currentIndex = 0;
      this.activeCount = 0;
      this.container.innerHTML = "";
    }
  }

  const progressManager = new ProgressManager(3, progress_container);
  add_progress.addEventListener("click", () => {
    progressManager.addProgressBar();
  });
  reset_progress.addEventListener("click", () => {
    progressManager.resetProgressBars();
  });
}
