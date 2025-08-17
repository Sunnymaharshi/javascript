import "./App.css";
import VirtualizedList from "./components/VirtualizedList";
const LIST_SIZE = 100000;
const WINDOW_HEIGHT = 400;
const ITEM_HEIGHT = 40;
function App() {
  const list = Array.from(
    { length: LIST_SIZE },
    (_, i) => `${i + 1} list item`
  );
  return (
    <div className="app">
      <h1>Virtualized List</h1>
      <VirtualizedList
        list={list}
        listSize={LIST_SIZE}
        windowHeight={WINDOW_HEIGHT}
        itemHeight={ITEM_HEIGHT}
      />
    </div>
  );
}

export default App;
