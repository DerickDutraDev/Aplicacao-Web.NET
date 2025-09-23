import React, { useState } from "react";
import axios from "axios";
import "./TodoForm.css";

const TodoForm = ({ onTodoAdded }) => {
  const [todoName, setTodoName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!todoName.trim()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:5160/api/TodoItems", {
        name: todoName,
        isComplete: false,
      });
      onTodoAdded(response.data);
      setTodoName("");
    } catch (error) {
      console.error("Houve um erro ao adicionar a tarefa:", error);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Adicionar nova tarefa..."
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default TodoForm;
