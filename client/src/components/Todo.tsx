import { useState, useRef } from "react";

import { flushSync } from "react-dom";

interface Props {
  initialDescription: string;
  completed: boolean;
  onDeleteTodo: () => void;
  handleUpdateTodo: (newDescription: string, completed: boolean) => void;
}

export default function Todo({
  initialDescription,
  completed,
  onDeleteTodo,
  handleUpdateTodo,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);
  const [description, setDescription] = useState(initialDescription);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSave() {
    setIsEditing(!isEditing);
    handleUpdateTodo(description, isCompleted);
  }

  function handleEditClick() {
    // Forces react to update the DOM or else the input wont be focused since
    // it hasnt been rendered/committed yet
    flushSync(() => {
      setIsEditing(!isEditing);
    });

    inputRef.current?.focus();
  }

  function handleCompletion() {
    setIsCompleted(!isCompleted);
    handleUpdateTodo(description, !isCompleted);
  }

  return (
    <div className="input-group mb-3">
      <div className="input-group-text">
        <input
          className="form-check-input mt-0"
          type="checkbox"
          aria-label="Checkbox for following text input"
          checked={isCompleted}
          onChange={handleCompletion}
        />
      </div>

      {isCompleted && !isEditing ? (
        <del className="form-control">{description}</del>
      ) : (
        <input
          disabled={!isEditing}
          ref={inputRef}
          type="text"
          value={description}
          className="form-control bg-light text-black text-wrap"
          aria-label="Text input with checkbox"
          onChange={(e) => setDescription(e.target.value)}
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
            onClick={() => onDeleteTodo()}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
