import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  // local cache
  const [cache, setCache] = useState({});
  const fetchData = async (query) => {
    if (cache[query]) {
      console.log("Cache hit", query);
      setResults(cache[query]);
      return;
    }
    console.log("Searching for", query);
    const data = await fetch("https://dummyjson.com/recipes/search?q=" + query);
    const json = await data.json();
    setCache((prev) => {
      return { ...prev, [query]: json?.recipes };
    });
    setResults(json?.recipes);
  };
  useEffect(() => {
    const timer = setTimeout(fetchData, 300, input);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);
  return (
    <div id="app">
      <h1>Autocomplete Recipes 🍅</h1>
      <input
        type="text"
        id="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onBlur={() => {
          setShow(false);
        }}
        onFocus={() => {
          setShow(true);
        }}
      />
      {show && (
        <div className="results">
          {results.map((t) => (
            <div key={t.id} className="result">
              {t.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
