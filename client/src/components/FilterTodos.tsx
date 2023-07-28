interface Props {
  handleFilter: (fiter: string) => void;
  filter: string;
}

const FilterTodos = ({ filter, handleFilter }: Props) => {
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
        className={`btn ${filter === "All" && "active btn-secondary"}`}
        onClick={handleClick}
      >
        All
      </button>
      <button
        type="button"
        className={`btn ${filter === "Active" && "active btn-secondary"}`}
        onClick={handleClick}
      >
        Active
      </button>
      <button
        type="button"
        className={`btn ${filter === "Completed" && "active btn-secondary"}`}
        onClick={handleClick}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterTodos;
