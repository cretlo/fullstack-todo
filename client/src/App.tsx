import { useState, useEffect, useReducer } from "react";
import { Todo as TodoType } from "./types";
import AddTodo from "./components/AddTodo";
import axios from "axios";
import TodoList from "./components/TodoList";
import { todoReducer } from "./reducers/todoReducer";
import FilterTodos from "./components/FilterTodos";

const App = () => {
  const [todoText, setTodoText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [todos, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async (): Promise<void> => {
      try {
        const result = await axios.get("http://localhost:4000/todos");
        const data = result.data as TodoType[];

        dispatch({
          type: "fetch_todos",
          payload: data,
        });
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  async function handleAddTodo(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    if (todoText.length < 1) {
      return;
    }

    const result = await axios.post("http://localhost:4000/todos", {
      text: todoText,
    });
    const nextTodo = result.data as TodoType;

    dispatch({
      type: "added_todo",
      payload: nextTodo,
    });
    setTodoText("");
  }

  async function handleDeleteTodo(id: number): Promise<void> {
    try {
      await axios.delete(`http://localhost:4000/todos/${id}`);

      dispatch({
        type: "deleted_todo",
        payload: id,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdateTodo(todo: TodoType): Promise<void> {
    try {
      const result = await axios.put(`http://localhost:4000/todos/${todo.id}`, {
        text: todo.text,
        completed: todo.completed,
      });
      const data = result.data as TodoType;

      dispatch({
        type: "updated_todo",
        payload: data,
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container-md">
      <h1 className="text-center mt-5">To-Do</h1>
      <AddTodo
        text={todoText}
        onSubmit={handleAddTodo}
        onChange={setTodoText}
      />
      <FilterTodos handleFilter={setFilter} filter={filter} />
      <hr />
      <TodoList
        todos={todos}
        filter={filter}
        isLoading={isLoading}
        onDeleteTodo={handleDeleteTodo}
        onUpdateTodo={handleUpdateTodo}
      />
    </div>
  );
};

export default App;
