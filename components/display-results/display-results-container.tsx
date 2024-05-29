"use client";

import { useDataContext } from "@/context/data-context";
import DisplayResultsView from "./display-results-view";
import styles from "./display-results.module.scss";

const DisplayResultsContainer = () => {
  const dataContext = useDataContext();

  return dataContext?.value ? (
    <div className={styles["display-results-container"]}>
      <h3>Wyniki wyszukiwania</h3>
      <DisplayResultsView value={dataContext.value} scrollView />
    </div>
  ) : null;
};

export default DisplayResultsContainer;
