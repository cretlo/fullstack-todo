interface Props {
  text: string;
  onChange: (e: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AddTodo = ({ text, onChange, onSubmit }: Props) => {
  return (
    <div className="row my-5">
      <div className="col col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              onChange={(e) => onChange(e.target.value)}
              value={text}
            />
            <button type="submit" className="btn btn-outline-secondary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
