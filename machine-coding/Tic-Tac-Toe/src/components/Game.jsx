import { useReducer } from "react";
const initialState = (size) => ({
  board: Array(size)
    .fill(null)
    .map(() => Array(size).fill(null)),
  rows: Array(size).fill(0),
  cols: Array(size).fill(0),
  diag: 0,
  antiDiag: 0,
  currentPlayer: "X",
  winner: null,
  gameOver: false,
  moveCount: 0,
});
const gameReducer = (state, action) => {
  switch (action.type) {
    case "MOVE": {
      const { row, col, size } = action.payload;
      console.log(row, col, size);
      // invalid move, game over or already selected
      if (state.gameOver || state.board[row][col]) return state;
      const playerValue = state.currentPlayer === "X" ? 1 : -1;

      // update counters
      const newRows = [...state.rows];
      const newCols = [...state.cols];
      let newDiag = state.diag;
      let newAntiDiag = state.antiDiag;

      newRows[row] += playerValue;
      newCols[col] += playerValue;
      if (row === col) newDiag += playerValue;
      if (row + col === size - 1) newAntiDiag += playerValue;

      // Update board
      const newBoard = state.board.map((r) => [...r]);
      newBoard[row][col] = state.currentPlayer;

      // check win
      const hasWon =
        Math.abs(newRows[row]) === size ||
        Math.abs(newCols[col]) === size ||
        Math.abs(newDiag) === size ||
        Math.abs(newAntiDiag) === size;
      // check draw
      const newMoveCount = state.moveCount + 1;
      const isDraw = newMoveCount === size * size && !hasWon;

      return {
        board: newBoard,
        rows: newRows,
        cols: newCols,
        diag: newDiag,
        antiDiag: newAntiDiag,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
        winner: hasWon ? state.currentPlayer : null,
        gameOver: hasWon || isDraw,
        moveCount: newMoveCount,
      };
    }
    case "RESET": {
      return initialState(action.payload.size);
    }
    default:
      return state;
  }
};
const Game = ({ size }) => {
  const [state, dispatch] = useReducer(gameReducer, size, initialState);
  const { board, currentPlayer, winner, gameOver } = state;

  const handleMove = (row, col) => {
    dispatch({ type: "MOVE", payload: { row, col, size } });
  };
  const handleReset = () => {
    dispatch({ type: "RESET", payload: { size } });
  };
  let msg = "";
  if (winner) {
    msg = `Player ${winner} has Won!`;
  } else if (gameOver) {
    msg = "Game Over!";
  } else {
    msg = `Player ${currentPlayer}, your move...`;
  }
  return (
    <div className="game-container">
      <button onClick={handleReset}>Play Again</button>
      <div className="msg">{msg}</div>
      <div
        className="grid-container"
        style={{
          gridTemplate: `repeat(${size},1fr) / repeat(${size},1fr)`,
        }}
      >
        {board.map((row, i) => {
          return row.map((val, j) => {
            return (
              <div
                key={`${i}-${j}`}
                className="grid-cell"
                onClick={() => {
                  handleMove(i, j);
                }}
              >
                <span>{val}</span>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default Game;
