import { useState, useRef, useCallback, useEffect } from "react";
const VirtualizedList = ({ list, listSize, windowHeight, itemHeight }) => {
  const [scrollTop, setScrollTop] = useState(0);
  // for values that change but shouldn't trigger re-renders
  const numberInput = useRef();
  const rafID = useRef();
  const containerRef = useRef();

  // index of next item to show
  const visibleCount = Math.ceil(windowHeight / itemHeight);
  // Only rendering visible items causes blank spaces during rapid scrolling
  const buffer = 3;
  // this adds buffer 3 at both top & bottom
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
  const end = Math.min(start + visibleCount + 2 * buffer, listSize);

  const virtualList = list.slice(start, end);
  const offsetY = start * itemHeight;

  // useCallback to avoid function recreation everytime it renders
  // RAF ensures updates only happen when the browser is ready to paint, typically at 60fps
  const handleScroll = useCallback((e) => {
    // Cancel any pending animation frame
    if (rafID.current) {
      cancelAnimationFrame(rafID.current);
    }
    rafID.current = requestAnimationFrame(() => {
      setScrollTop(e.target.scrollTop);
    });
  }, []);
  const scrollToIndex = useCallback(
    (index) => {
      if (containerRef.current) {
        // triggers scroll event
        containerRef.current.style.scrollBehavior = "smooth";
        containerRef.current.scrollTop =
          index === 0 ? 0 : (index - 1) * itemHeight;
      }
    },
    [itemHeight]
  );
  // remove pending requestAnimationFrame on unmount
  useEffect(() => {
    return () => {
      if (rafID.current) {
        cancelAnimationFrame(rafID.current);
      }
    };
  }, []);
  return (
    <>
      <div className="action-container">
        <div>
          <label>
            Scroll to item number:
            <input type="number" ref={numberInput} />
          </label>
          <button
            onClick={() => {
              if (numberInput.current.value >= 0) {
                scrollToIndex(numberInput.current.value);
                numberInput.current.value = "";
              }
            }}
          >
            Scroll
          </button>
        </div>
        <button
          onClick={() => {
            scrollToIndex(0);
          }}
        >
          Scroll to top
        </button>
      </div>
      <div
        className="list-container"
        onScroll={handleScroll}
        style={{
          height: windowHeight + "px",
        }}
        ref={containerRef}
      >
        <div style={{ height: listSize * itemHeight + "px" }}>
          <div style={{ transform: `translateY(${offsetY}px)` }}>
            {virtualList.map((item, i) => {
              return (
                <div
                  // original index as key
                  key={start + i}
                  className="list-item"
                  style={{
                    height: itemHeight + "px",
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default VirtualizedList;
