const File = ({ name, id, deleteNodeFromList }) => {
  return (
    <div className="file">
      <span>📄{name}</span>

      <button onClick={() => deleteNodeFromList(id)}>Delete</button>
    </div>
  );
};
export default File;
