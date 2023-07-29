import { useState, useRef } from "react";
import { Todo as TodoType } from "../types";
import { flushSync } from "react-dom";

interface Props {
  todo: TodoType;
  onDeleteTodo: (id: number) => void;
  onUpdateTodo: (todo: TodoType) => void;
}

const Todo = ({ todo, onDeleteTodo, onUpdateTodo }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSave() {
    setIsEditing(!isEditing);
    onUpdateTodo({ ...todo, text: text });
  }

  function handleEditClick() {
    // Forces react to update the DOM or else the input wont be focused since
    // it hasnt been rendered/committed yet
    flushSync(() => {
      setIsEditing(!isEditing);
    });

    inputRef.current?.focus();
  }

  return (
    <div className="input-group mb-3">
      <div className="input-group-text">
        <input
          className="form-check-input mt-0"
          type="checkbox"
          aria-label="Checkbox for following text input"
          checked={todo.completed}
          onChange={() => onUpdateTodo({ ...todo, completed: !todo.completed })}
        />
      </div>

      {todo.completed && !isEditing ? (
        <del className="form-control">{text}</del>
      ) : (
        <input
          disabled={!isEditing}
          ref={inputRef}
          type="text"
          value={text}
          className="form-control bg-light text-black text-wrap"
          aria-label="Text input with checkbox"
          onChange={(e) => setText(e.target.value)}
          onKeyDownCapture={(e) => (e.key === "Enter" ? handleSave() : null)}
        />
      )}

      {isEditing ? (
        <>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => onDeleteTodo(todo.id)}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default Todo;
