import "./RepositoryShow.css";
import { GoStar, GoStarFill } from "react-icons/go";
import { useState } from "react";
import PropTypes from "prop-types";

function RepositoryShow({ name, link, description, numberOfStars, language }) {
  const starredStatus = localStorage.getItem(name) === "true";
  const [starred, setStarred] = useState(starredStatus);
  const handleStarClick = () => {
    setStarred(!starred);
    localStorage.setItem(name, String(!starred));
  };

  const languageText = language ? (
    <span className="repositoryShow__language">
      {language} <span aria-hidden="true">·</span>
    </span>
  ) : null;

  return (
    <div className="repositoryShow">
      <div className="repositoryShow__content">
        <a href={link} target="_blank">
          {name}
        </a>
        <p>{description}</p>
        <div className="repositoryShow__info">
          {languageText}
          <div className="repositoryShow__stars">
            <GoStar /> {numberOfStars}
          </div>
        </div>
      </div>
      <div>
        <button className="repositoryShow__starBtn" onClick={handleStarClick}>
          {starred ? <GoStarFill /> : <GoStar />}Star
        </button>
      </div>
    </div>
  );
}

RepositoryShow.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  description: PropTypes.string,
  numberOfStars: PropTypes.number.isRequired,
  language: PropTypes.string,
};

export default RepositoryShow;
