import { useState } from "react";
import explorer from "../data/folderData";
import "./App.css";
import Explorer from "./components/explorer/Explorer";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const insertNode = (tree, folderId, item, isFolder) => {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }
    let latest = [];
    latest = tree.items.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });
    return { ...tree, items: latest };
  };
  const handleInsertNode = (folderId, item, isFolder) => {
    const treeClone = JSON.parse(JSON.stringify(explorerData));
    const newTree = insertNode(treeClone, folderId, item, isFolder);
    setExplorerData(newTree);
  };
  return (
    <div className="app">
      <Explorer explorer={explorerData} handleInsertNode={handleInsertNode} />
    </div>
  );
}

export default App;
