import { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import axios from "axios";

interface Todo {
  id: number;
  description: string;
  completed: boolean;
  createAt?: string;
  updateAt?: string;
}

const App = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    let fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:4000/todos");
        const data = result.data;

        setTodos(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  async function handleAddTodo(e: React.FormEvent) {
    e.preventDefault();

    if (todoText.length < 1) {
      return;
    }

    const result = await axios.post("http://localhost:4000/todos", {
      description: todoText,
    });
    const nextTodo: Todo = result.data;

    const nextTodos = todos.map((todo) => {
      return { ...todo };
    });
    nextTodos.push(nextTodo);

    setTodos(nextTodos);
    setTodoText("");
  }

  async function handleDeleteTodo(id: number) {
    try {
      await axios.delete(`http://localhost:4000/todos/${id}`);

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdateTodo(
    id: number,
    newDescription: string,
    completed: boolean,
  ) {
    try {
      const result = await axios.put(`http://localhost:4000/todos/${id}`, {
        description: newDescription,
        completed: completed,
      });
      const data = result.data;

      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return data;
          }

          return todo;
        }),
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container">
      <h1 className="text-center mt-5">To-Do</h1>
      <div className="row my-5">
        <div className="col-6 offset-3">
          <AddTodo
            text={todoText}
            addTodo={handleAddTodo}
            onChange={setTodoText}
          />
        </div>
      </div>

      <hr />

      <div className="row mt-3">
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="col-6 offset-3">
            {todos.map((todo) => {
              return (
                <Todo
                  key={todo.id}
                  initialDescription={todo.description}
                  completed={todo.completed}
                  onDeleteTodo={() => handleDeleteTodo(todo.id)}
                  handleUpdateTodo={(description, completed) =>
                    handleUpdateTodo(todo.id, description, completed)
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
