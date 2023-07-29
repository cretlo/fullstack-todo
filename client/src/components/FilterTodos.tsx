interface Props {
  handleFilter: (fiter: string) => void;
  filter: string;
}

const FilterTodos = ({ filter, handleFilter }: Props) => {
  const btnAllClass = filter === "All" ? "active btn-secondary" : "";
  const btnActiveClass = filter === "Active" ? "active btn-secondary" : "";
  const btnCompletedClass =
    filter === "Completed" ? "active btn-secondary" : "";

  function handleClick(e: React.MouseEvent) {
    const button = e.target as HTMLButtonElement;

    switch (button.firstChild?.textContent) {
      case "All":
        handleFilter("All");
        break;
      case "Active":
        handleFilter("Active");
        break;
      case "Completed":
        handleFilter("Completed");
        break;
    }
  }

  return (
    <div className="btn-group d-flex felx-row-reverse">
      <button
        type="button"
        className={`btn ${btnAllClass}`}
        onClick={handleClick}
      >
        All
      </button>
      <button
        type="button"
        className={`btn ${btnActiveClass}`}
        onClick={handleClick}
      >
        Active
      </button>
      <button
        type="button"
        className={`btn ${btnCompletedClass}`}
        onClick={handleClick}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterTodos;
