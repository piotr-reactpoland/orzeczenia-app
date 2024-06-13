"use client";

import { useDataContext } from "@/context/data-context";
import DisplayResultsView from "./display-results-view";
import styles from "./display-results.module.scss";

const DisplayResultsContainer = () => {
  const dataContext = useDataContext();

  return (
    <section className={styles["display-results-container"]}>
      <h3>Wyniki wyszukiwania</h3>
      {dataContext?.value ? (
        <DisplayResultsView value={dataContext.value} scrollView />
      ) : null}
    </section>
  );
};

export default DisplayResultsContainer;
