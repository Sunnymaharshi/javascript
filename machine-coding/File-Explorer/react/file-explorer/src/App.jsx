import { useState, useEffect } from "react";
import explorer from "../data/folderData.json";
import "./App.css";
import Explorer from "./components/explorer/FolderList";

function App() {
  const [explorerData, setExplorerData] = useState(
    "explorer" in localStorage
      ? JSON.parse(localStorage.getItem("explorer"))
      : explorer
  );
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const saveExplorer = (newData) => {
    localStorage.setItem("explorer", JSON.stringify(newData));
  };
  const addRootNode = (e) => {
    if (e.key === "Enter" && e.target.value) {
      const explorerCopy = [...explorerData];
      explorerCopy.unshift({
        id: new Date().getTime(),
        name: e.target.value,
        isFolder: showInput.isFolder,
        children: [],
      });
      setExplorerData(explorerCopy);
      setShowInput({
        visible: false,
        isFolder: null,
      });
    }
  };
  const addNodeToList = (parentId, name, isFolder) => {
    // recursive function to add new node(file/folder)
    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          // update node, with added node
          const nodeCopy = { ...node };
          nodeCopy.children.unshift({
            id: new Date().getTime(),
            name,
            isFolder,
            children: [],
          });
          return nodeCopy;
        }
        // call recursive function for children
        if (node.children) {
          return {
            ...node,
            children: updateTree(node.children),
          };
        }
        return node;
      });
    };
    if (name) {
      setExplorerData((prev) => updateTree(prev));
    }
  };
  const deleteNodeFromList = (id) => {
    const updateTree = (list) => {
      // filter list
      return (
        list
          .filter((node) => node.id !== id)
          // for each sub list call recursive function to update children
          .map((node) => {
            if (node.children) {
              return { ...node, children: updateTree(node.children) };
            }
            return node;
          })
      );
    };

    setExplorerData((prev) => updateTree(prev));
  };

  useEffect(() => {
    saveExplorer(explorerData);
  }, [explorerData]);
  return (
    <div className="app">
      <h1>File Explorer</h1>
      <div className="container">
        <button
          onClick={() => {
            setShowInput({ visible: true, isFolder: true });
          }}
        >
          Add root folder
        </button>
        <button
          onClick={() => {
            setShowInput({ visible: true, isFolder: false });
          }}
        >
          Add root file
        </button>
        {showInput.visible && (
          <div className="inputContainer">
            <span>{showInput.isFolder ? "📁" : "📄"}</span>
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onKeyDown={(e) => addRootNode(e)}
              onBlur={() =>
                setShowInput({
                  visible: false,
                  isFolder: null,
                })
              }
            />
          </div>
        )}
        <Explorer
          list={explorerData}
          addNodeToList={addNodeToList}
          deleteNodeFromList={deleteNodeFromList}
        />
      </div>
    </div>
  );
}

export default App;
