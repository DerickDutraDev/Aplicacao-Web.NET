import React, { useState } from "react";
import "./todoitem.css";

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(todo.name);

  const handleSave = () => {
    const updatedTodo = { ...todo, name: editedName };
    onUpdate(updatedTodo);
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    const updatedTodo = { ...todo, isComplete: !todo.isComplete };
    onUpdate(updatedTodo);
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <>
          <input
            type="text"
            className="edit-input"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <div className="actions">
            <button className="save-btn" onClick={handleSave}>
              Salvar
            </button>
          </div>
        </>
      ) : (
        <>
          <span
            className={`todo-text ${todo.isComplete ? "completed" : ""}`}
            onClick={handleToggleComplete}
          >
            {todo.name}
          </span>
          <div className="actions">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Editar
            </button>
            <button className="delete-btn" onClick={() => onDelete(todo.id)}>
              Deletar
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
