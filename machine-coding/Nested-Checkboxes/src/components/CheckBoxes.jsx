const CheckBoxes = ({ data, status, handleCheck }) => {
  return (
    <>
      {data.map((node) => {
        return (
          <div key={node.id}>
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  name={node.name}
                  onChange={(e) => {
                    handleCheck(node, e.target.checked);
                  }}
                  checked={status[node.id] || false}
                />
                {node.name}
              </label>
            </div>
            {node.children?.length > 0 && (
              <div className="sub-content">
                <CheckBoxes
                  data={node.children}
                  status={status}
                  handleCheck={handleCheck}
                />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default CheckBoxes;
