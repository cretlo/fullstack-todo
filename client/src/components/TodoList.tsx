import { Todo as TodoType } from "../types";
import Todo from "./Todo";

interface Props {
  todos: TodoType[];
  isLoading: boolean;
  filter: string;
  onUpdateTodo: (todo: TodoType) => void;
  onDeleteTodo: (id: number) => void;
}
const TodoList = ({
  todos,
  filter,
  isLoading,
  onDeleteTodo,
  onUpdateTodo,
}: Props) => {
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
        <div className="col col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          {todos.map((todo) => {
            if (filter === "Completed" && !todo.completed) {
              return;
            }

            if (filter === "Active" && todo.completed) {
              return;
            }

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
