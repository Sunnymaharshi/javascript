const Folder = ({
  name,
  id,
  handleClick,
  handleNewFolder,
  deleteNodeFromList,
  isOpen,
}) => {
  return (
    <div className="folder" onClick={() => handleClick(id)}>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={isOpen ? "rotate-icon" : ""}
          viewBox="0 0 1024 1024"
          version="1.1"
        >
          <path
            d="M682.666667 533.333333a21.333333 21.333333 0 0 1-15.146667-6.186666l-298.666667-298.666667a21.333333 21.333333 0 0 1 30.293334-30.293333l298.666666 298.666666a21.333333 21.333333 0 0 1 0 30.293334A21.333333 21.333333 0 0 1 682.666667 533.333333z"
            fill="#333333"
          />
          <path
            d="M384 832a21.333333 21.333333 0 0 1-15.146667-6.186667 21.333333 21.333333 0 0 1 0-30.293333l298.666667-298.666667a21.333333 21.333333 0 0 1 30.293333 30.293334l-298.666666 298.666666A21.333333 21.333333 0 0 1 384 832z"
            fill="#333333"
          />
        </svg>
        📁 {name}
      </span>
      <div>
        <button onClick={(e) => handleNewFolder(e, true, id)}>Folder+</button>
        <button onClick={(e) => handleNewFolder(e, false, id)}>File+</button>
        <button onClick={() => deleteNodeFromList(id)}>Delete</button>
      </div>
    </div>
  );
};
export default Folder;
