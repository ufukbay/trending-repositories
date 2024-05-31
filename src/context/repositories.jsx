import { createContext, useCallback, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const RepositoriesContext = createContext();

// eslint-disable-next-line react/prop-types
function Provider({ children }) {
  const [repositories, setRepositories] = useState([]);

  // Save a copy of the original repositories in order to not repeat the API call when applying filters
  const [allRepositories, setAllRepositories] = useState([]);

  // Calculate date from 7 days ago
  const date = new Date();
  date.setDate(date.getDate() - 7);
  const formattedDate = date.toISOString().split("T")[0];

  const fetchRepositories = useCallback(async () => {
    const url = `https://api.github.com/search/repositories?q=created:${formattedDate}&sort=stars&order=desc`;
    const response = await axios.get(url);

    setRepositories(response.data.items);
    setAllRepositories(response.data.items);
  }, []);

  const filterAllRepositories = () => {
    setRepositories(allRepositories);
  };

  const filterStarredRepositories = () => {
    const filteredRepositories = allRepositories.filter((repository) => {
      return localStorage.getItem(repository.name) === "true";
    });

    setRepositories(filteredRepositories);
  };

  const filterRepositoriesByLanguage = (language) => {
    const filteredRepositories = allRepositories.filter((repository) => {
      return repository.language === language;
    });

    setRepositories(filteredRepositories);
  };

  const valueToShare = {
    repositories,
    allRepositories,
    fetchRepositories,
    filterStarredRepositories,
    filterAllRepositories,
    filterRepositoriesByLanguage,
  };

  return (
    <RepositoriesContext.Provider value={valueToShare}>
      {children}
    </RepositoriesContext.Provider>
  );
}

Provider.proptypes = {
  children: PropTypes.node.isRequired,
};

export { Provider };
export default RepositoriesContext;
