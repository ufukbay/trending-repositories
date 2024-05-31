import { useContext } from "react";
import RepositoriesContext from "../context/repositories";

function useRepositoriesContext() {
  return useContext(RepositoriesContext);
}

export default useRepositoriesContext;
