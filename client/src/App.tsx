import { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import axios from "axios";

interface Todo {
  id: number;
  description: string;
  createAt?: string;
  updateAt?: string;
}

const App = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<Todo[] | []>([]);

  useEffect(() => {
    console.log("Fetching data in App:useEffect...");
    let fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:4000/todos");
        const data = result.data;
        setTodos(data);
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
    
    const result = await axios.post('http://localhost:4000/todos', { description: todoText });
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

  async function handleUpdateTodo(id: number, newDescription: string) {
    try {
      const result = await axios.put(`http://localhost:4000/todos/${id}`, {description: newDescription});
      const data = result.data;

      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return data;
          }

          return todo;
        }),
      );
    } catch(err) {
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
        <div className="col-6 offset-3">
          {todos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                initialDescription={todo.description}
                onDeleteTodo={() => handleDeleteTodo(todo.id)}
                handleUpdateTodo={(description) =>
                  handleUpdateTodo(todo.id, description)
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
