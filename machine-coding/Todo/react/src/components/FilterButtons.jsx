const filters = [
  {
    key: "all",
    label: "All",
  },
  {
    key: "active",
    label: "Active",
  },
  {
    key: "completed",
    label: "Completed",
  },
];
const FilterButtons = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="filters-container">
      {filters.map((filter) => {
        return (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`filter-btn ${
              currentFilter === filter.key ? "active" : ""
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterButtons;
