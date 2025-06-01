import React, { useState } from "react";
import File from "../file/File";
import Folder from "../folder/Folder";

const FolderList = ({ list, addNodeToList, deleteNodeFromList }) => {
  const [expand, setExpand] = useState({});
  const [showInput, setShowInput] = useState({
    id: undefined,
    isFolder: null,
  });
  const handleClick = (id) => {
    setExpand((prev) => {
      // !undefined is true
      return { ...prev, [id]: !prev[id] };
    });
  };
  const handleNewFolder = (e, isFolder, id) => {
    e.stopPropagation();
    setExpand((prev) => {
      return { ...prev, [id]: true };
    });
    setShowInput({ id, isFolder });
  };
  const handleAddFolder = (e) => {
    if (e.key === "Enter" && e.target.value) {
      addNodeToList(showInput.id, e.target.value, showInput.isFolder);
      setShowInput({ isFolder: null, id: undefined });
    }
  };

  return (
    <>
      {list.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!item?.isFolder && (
              <File
                name={item.name}
                id={item.id}
                deleteNodeFromList={deleteNodeFromList}
              />
            )}
            {item?.isFolder && (
              <Folder
                name={item.name}
                id={item.id}
                isOpen={expand[item.id] ? true : false}
                handleClick={handleClick}
                handleNewFolder={handleNewFolder}
                deleteNodeFromList={deleteNodeFromList}
              />
            )}
            {showInput.id == item.id && (
              <div className="inputContainer">
                <span>{showInput.isFolder ? "📁" : "📄"}</span>
                <input
                  type="text"
                  className="inputContainer__input"
                  autoFocus
                  onKeyDown={(e) => handleAddFolder(e, item.id)}
                  onBlur={() =>
                    setShowInput({
                      id: undefined,
                      isFolder: null,
                    })
                  }
                />
              </div>
            )}

            {expand[item.id] && item?.children && (
              <div
                style={{
                  paddingLeft: "15px",
                }}
              >
                <FolderList
                  list={item.children}
                  addNodeToList={addNodeToList}
                  deleteNodeFromList={deleteNodeFromList}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
export default FolderList;
