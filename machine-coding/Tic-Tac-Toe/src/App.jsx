import { useRef, useState } from "react";
import "./App.css";
import Game from "./components/Game";

function App() {
  const [size, setSize] = useState(3);
  const inputRef = useRef();

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="action-container">
        <label>
          Enter board size
          <input type="number" ref={inputRef} />
        </label>
        <button
          onClick={() => {
            const input = +inputRef.current.value;
            if (input >= 3 && input <= 15) {
              setSize(input);
              inputRef.current.value = "";
            }
          }}
        >
          Start
        </button>
        <button
          onClick={() => {
            setSize(null);
            inputRef.current.value = "";
          }}
        >
          Reset
        </button>
      </div>
      {size && <Game key={size} size={size} />}
    </>
  );
}

export default App;
