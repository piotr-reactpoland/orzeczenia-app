"use client";

import React, { useState } from "react";
import Button from "../tools/button/index";
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
