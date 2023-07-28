import { Todo as TodoType } from "../types";
import Todo from "./Todo";

interface Props {
  todos: TodoType[];
  isLoading: boolean;
  onUpdateTodo: (todo: TodoType) => void;
  onDeleteTodo: (id: number) => void;
}
const TodoList = ({ todos, isLoading, onDeleteTodo, onUpdateTodo }: Props) => {
  let loadingContent = (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="row mt-3">
      {isLoading ? (
        loadingContent
      ) : (
        <div className="col-6 offset-3">
          {todos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                onDeleteTodo={onDeleteTodo}
                onUpdateTodo={onUpdateTodo}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TodoList;
