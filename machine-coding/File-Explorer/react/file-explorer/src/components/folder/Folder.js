const Folder = ({ name, handleClick, handleNewFolder }) => {
  return (
    <div className="folder" onClick={handleClick}>
      <span>📁 {name}</span>
      <div>
        <button onClick={(e) => handleNewFolder(e, true)}>Folder+</button>
        <button onClick={(e) => handleNewFolder(e, false)}>File+</button>
      </div>
    </div>
  );
};
export default Folder;
