import "./RepositoryList.css";
import RepositoryShow from "../RepositoryShow/RepositoryShow.jsx";
import useRepositoriesContext from "../../hooks/use-repositories-context.jsx";

function RepositoryList() {
  const { repositories } = useRepositoriesContext();
  const renderedRepositories = repositories.map((repository) => {
    return (
      <RepositoryShow
        key={repository.id}
        name={repository.name}
        link={repository.html_url}
        description={repository.description}
        numberOfStars={repository.stargazers_count}
        language={repository.language}
      />
    );
  });

  if (repositories.length === 0) {
    return <div className="repository-list">No results found.</div>;
  }

  return <div className="repository-list">{renderedRepositories}</div>;
}

export default RepositoryList;
