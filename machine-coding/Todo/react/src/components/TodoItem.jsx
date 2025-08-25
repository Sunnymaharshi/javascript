const TodoItem = ({ todo, onToggle, onDelete }) => {
  const { id, content, completed } = todo;
  return (
    <div className={`todo-item ${completed ? "completed" : ""}`}>
      <div className="todo-content">
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => onToggle(id)}
        >
          {completed ? "✓" : "o"}
        </span>
        <span>{content}</span>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="delete-btn"
        aria-label="Delete todo"
      >
        X
      </button>
    </div>
  );
};

export default TodoItem;
