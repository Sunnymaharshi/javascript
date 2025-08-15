import { useEffect } from "react";
import { useState, useRef } from "react";

const OTPInput = ({ length }) => {
  const [inputArr, setInputArr] = useState(new Array(length).fill(""));
  const refArr = useRef([]);
  const handleInput = (e, position) => {
    if (isNaN(e.target.value)) {
      return;
    }
    setInputArr((prev) => {
      const newData = [...prev];
      // take last number for every input
      newData[position] = e.target.value.trim().slice(-1);
      return newData;
    });
    // don't move when value is empty
    e.target.value.trim() && refArr.current[position + 1]?.focus();
  };
  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);
  return (
    <div className="otp-container">
      {inputArr.map((value, i) => {
        return (
          <input
            key={i}
            type="text"
            className="otp-input"
            ref={(input) => (refArr.current[i] = input)}
            value={inputArr[i]}
            onChange={(e) => handleInput(e, i)}
            onKeyDown={(e) => {
              // only move back if input is empty
              // when moved back and default backspace remove lastest value
              if (!e.target.value && e.key === "Backspace") {
                refArr.current[i - 1]?.focus();
              }
            }}
          />
        );
      })}
    </div>
  );
};

export default OTPInput;
