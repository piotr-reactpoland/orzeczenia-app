"use client";

import React from "react";
import SearchHistoryView from "./search-history-view";
import styles from "./search-history.module.scss";

const SearchHistoryContainer = () => {
  return (
    <section className={styles["search-history-container"]}>
      <SearchHistoryView />
    </section>
  );
};

export default SearchHistoryContainer;
