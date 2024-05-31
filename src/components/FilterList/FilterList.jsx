import "./FilterList.css";
import { useState } from "react";
import useRepositoriesContext from "../../hooks/use-repositories-context.jsx";

function FilterList() {
  const [activeButton, setActiveButton] = useState("all");
  const {
    filterStarredRepositories,
    filterAllRepositories,
    filterRepositoriesByLanguage,
    allRepositories,
  } = useRepositoriesContext();

  // Create programming language filters based on last week's projects
  const languageFilters = allRepositories.reduce((acc, repository) => {
    if (repository.language && !acc.includes(repository.language)) {
      acc.push(repository.language);
    }
    return acc;
  }, []);
  const renderedFilterButtons = languageFilters.map((filter, i) => {
    return (
      <button
        className={`filterList__filter ${activeButton === filter ? "filterList__filter--active" : ""}`}
        key={i}
        onClick={() => {
          filterRepositoriesByLanguage(filter);
          setActiveButton(filter);
        }}
      >
        {filter}
      </button>
    );
  });

  return (
    <div className="filterList">
      <button
        className={`filterList__filter ${activeButton === "all" ? "filterList__filter--active" : ""}`}
        onClick={() => {
          filterAllRepositories();
          setActiveButton("all");
        }}
      >
        All
      </button>
      <button
        className={`filterList__filter ${activeButton === "starred" ? "filterList__filter--active" : ""}`}
        onClick={() => {
          filterStarredRepositories();
          setActiveButton("starred");
        }}
      >
        Starred
      </button>
      {renderedFilterButtons}
    </div>
  );
}

export default FilterList;
