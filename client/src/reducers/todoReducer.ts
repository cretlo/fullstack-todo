import { Todo } from "../types";

type AddedAction = {
  type: "added_todo";
  payload: {
    id: number;
    text: string;
  };
};

type DeletedAction = {
  type: "deleted_todo";
  payload: number;
};

type UpdatedAction = {
  type: "updated_todo";
  payload: {
    id: number;
    completed: boolean;
    text: string;
  };
};

type FetchAction = {
  type: "fetch_todos";
  payload: Todo[];
};

type FilteredAction = {
  type: "filtered_todos";
  payload: Todo[];
};

type TodoAction =
  | AddedAction
  | DeletedAction
  | UpdatedAction
  | FetchAction
  | FilteredAction;

//type TodoAction = {
//  type: string;
//  payload: Todo | Todo[];
//};

export const todoReducer = (todos: Todo[], action: TodoAction) => {
  switch (action.type) {
    case "added_todo": {
      const nextTodos = todos.map((todo) => {
        return { ...todo };
      });
      nextTodos.push(action.payload as Todo);
      return nextTodos;
    }
    case "deleted_todo": {
      let todoId = action.payload;
      const nextTodos = todos.filter((todo) => todo.id !== todoId);
      return nextTodos;
    }
    case "updated_todo": {
      const nextTodo = action.payload;
      const nextTodos = todos.map((todo) => {
        if (todo.id === nextTodo.id) {
          return nextTodo;
        }

        return todo;
      });

      return nextTodos;
    }
    case "fetch_todos": {
      const nextTodos = action.payload;
      return nextTodos;
    }
    default: {
      throw Error("Unknown action provided");
    }
  }
};

//export const todoReducer = (todos: Todo[], action: TodoAction) => {
//  switch (action.type) {
//    case "added_todo": {
//      const nextTodos: Todo[] = todos.map((todo) => {
//        return { ...todo };
//      });
//      nextTodos.push(action.payload as Todo);
//      return nextTodos;
//    }
//    case "deleted_todo": {
//      let nextTodo = action.payload as Todo;
//      const nextTodos: Todo[] = todos.filter((todo) => todo.id !== nextTodo.id);
//      return nextTodos;
//    }
//    case "updated_todo": {
//      const nextTodo = action.payload as Todo;
//      const nextTodos: Todo[] = todos.map((todo) => {
//        if (todo.id === nextTodo.id) {
//          return nextTodo;
//        }
//
//        return todo;
//      });
//
//      return nextTodos;
//    }
//    case "fetch_todos": {
//      const nextTodos = action.payload as Todo[];
//      return nextTodos;
//    }
//    default: {
//      throw Error("Unknown action: " + action.type);
//    }
//  }
//};
