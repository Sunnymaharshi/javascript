import { useState } from "react";
import File from "../file/File";
import Folder from "../folder/Folder";

const Explorer = ({ explorer, handleInsertNode }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const handleClick = () => {
    setExpand((expand) => !expand);
  };
  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };
  const handleAddFolder = (e) => {
    if (e.key === "Enter" && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput((prev) => {
        return { ...prev, visible: false };
      });
    }
  };

  if (!explorer.isFolder) {
    return <File file={explorer} />;
  }
  return (
    <>
      <Folder
        name={explorer.name}
        handleClick={handleClick}
        handleNewFolder={handleNewFolder}
      />

      <div style={{ display: expand ? "block" : "none", paddingLeft: "15px" }}>
        {showInput.visible && (
          <div className="inputContainer">
            <span>{showInput.isFolder ? "📁" : "📄"}</span>
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onKeyDown={(e) => handleAddFolder(e)}
              onBlur={() =>
                setShowInput({
                  visible: false,
                  isFolder: null,
                })
              }
            />
          </div>
        )}
        {explorer.items.map((item) => {
          return (
            <Explorer
              explorer={item}
              handleInsertNode={handleInsertNode}
              key={item.id}
            />
          );
        })}
      </div>
    </>
  );
};
export default Explorer;
