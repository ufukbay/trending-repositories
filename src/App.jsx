import { useEffect, useState } from "react";
import "./App.css";
import RepositoryList from "./components/RepositoryList/RepositoryList.jsx";
import useRepositoriesContext from "./hooks/use-repositories-context.jsx";
import FilterList from "./components/FilterList/FilterList.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { fetchRepositories } = useRepositoriesContext();

  // Fetch repositories once
  useEffect(() => {
    fetchRepositories().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <header>
        <h1>Last week&apos;s trending repositories on GitHub</h1>
      </header>
      <main>
        <FilterList />
        <RepositoryList />
      </main>
    </>
  );
}

export default App;
