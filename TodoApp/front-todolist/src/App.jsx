import { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:5160/api/TodoItems");
        setTodos(response.data);
      } catch (error) {
        console.error("Houve um erro ao buscar as tarefas:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleTodoAdded = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleTodoDeleted = async (id) => {
    try {
      await axios.delete(`http://localhost:5160/api/TodoItems/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Houve um erro ao excluir a tarefa:", error);
    }
  };

  const handleTodoUpdated = async (updatedTodo) => {
    try {
      await axios.put(
        `http://localhost:5160/api/TodoItems/${updatedTodo.id}`,
        updatedTodo
      );

      setTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Houve um erro ao atualizar a tarefa:", error);
    }
  };

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <TodoForm onTodoAdded={handleTodoAdded} />
      {todos.length > 0 ? (
        <TodoList
          todos={todos}
          onDelete={handleTodoDeleted}
          onUpdate={handleTodoUpdated}
        />
      ) : (
        <p className="no-tasks">
          Nenhuma tarefa encontrada. Adicione uma nova!
        </p>
      )}
    </div>
  );
}

export default App;
