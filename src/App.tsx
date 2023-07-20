import { useState } from "react";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";

interface Todo {
  id: number;
  description: string;
}

const initalTodos = [
  { id: 0, description: "Take out the trash" },
  { id: 1, description: "Walk the dog" },
];
let todoCount = initalTodos.length;

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState(initalTodos);

  function handleAddTodo(e: React.FormEvent) {
    e.preventDefault();

    if (todoText.length < 1) {
      return;
    }

    let nextTodo = {
      id: todoCount++,
      description: todoText,
    };
    let nextTodos = todos.map((todo) => {
      return { ...todo };
    });
    nextTodos.push(nextTodo);

    setTodos(nextTodos);
    setTodoText("");
  }

  function handleDeleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleUpdateTodo(id: number, newDescription: string) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            description: newDescription,
          };
        }

        return todo;
      }),
    );
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
}

export default App;
