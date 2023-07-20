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
//<div classNameNameName="input-group mb-3">
//  <div classNameNameName="input-group-prepend">
//    <span classNameNameName="input-group-text rounded-left text-primary">
//      Hello
//    </span>
//  </div>
//  <input
//    type="text"
//    classNameNameName="form-control"
//    aria-label="Amount (to the nearest dollar)"
//  />
//</div>
