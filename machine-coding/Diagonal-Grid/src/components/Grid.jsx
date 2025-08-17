import { useState } from "react";

const Grid = ({ size }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (row, col) => {
    setSelected({ row, col });
  };
  const isDiagonal = (row, col) => {
    if (!selected) return false;
    const isMainDiagonal = row - col === selected.row - selected.col;
    const isAntiDiagonal = row + col === selected.row + selected.col;
    return isMainDiagonal || isAntiDiagonal;
  };
  const clearSelection = () => {
    setSelected(null);
  };
  return (
    <>
      <div>
        <button onClick={clearSelection}>Clear selection</button>
      </div>
      <div
        className="grid-container"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gridTemplateRows: `repeat(${size}, 1fr)`,
        }}
      >
        {[...Array(size)].map((_, row) => {
          return [...Array(size)].map((_, col) => {
            let status = "";
            if (selected?.row === row && selected?.col === col) {
              status = "selected";
            } else if (isDiagonal(row, col)) {
              status = "highlight";
            }

            return (
              <div
                className={`grid-cell ${status}`}
                onClick={() => handleSelect(row, col)}
                key={`${row}${col}`}
              >
                {/* {`${row + 1}, ${col + 1}`} */}
              </div>
            );
          });
        })}
      </div>
    </>
  );
};

export default Grid;
