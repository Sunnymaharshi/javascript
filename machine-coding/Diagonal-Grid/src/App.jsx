import "./App.css";
import { useRef, useState } from "react";
import Grid from "./components/Grid";
function App() {
  const [size, setSize] = useState(7);
  const inputRef = useRef();
  return (
    <div className="App">
      <h1>Diagonal Grid Selector</h1>
      <div>
        <label>
          Grid size 2 to 30 <input type="number" ref={inputRef} />
        </label>
        <button
          onClick={() => {
            const input = +inputRef.current.value;
            if (input >= 2 && input <= 30) {
              setSize(input);
              inputRef.current.value = "";
            }
          }}
        >
          Create
        </button>
      </div>
      <Grid size={size} key={size} />
    </div>
  );
}

export default App;
