interface Props {
  text: string;
  onChange: (e: string) => void;
  addTodo: (e: React.FormEvent) => void;
}

export default function AddTodo({ text, onChange, addTodo }: Props) {
  return (
    <form onSubmit={addTodo}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          onChange={(e) => onChange(e.target.value)}
          value={text}
        />
        <button
          type="submit"
          className="btn btn-outline-secondary"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
    </form>
  );
}