"use client";

import React, { useState } from "react";
import DisplayResults from "@/components/display-results/index";
import SearchHistory from "@/components/search-history/index";
import TestSearch from "@/components/test-search-form/index";
import Tabs from "@/components/tools/tabs/index";
import Link from "@/node_modules/next/link";
import styles from "./page.module.scss";

const BUTTONS = [
  {
    id: "search",
    label: "Wyniki",
  },
  {
    id: "history",
    label: "Porównanie",
  },
];

const SCORES_ACTIVE = "search";

const Tests = () => {
  const [activeElement, setDisplayActiveElement] = useState(SCORES_ACTIVE);

  const handleChangeTab = (id: string) => {
    setDisplayActiveElement(id);
  };

  const getTabContent = (activeElement: string) => {
    switch (activeElement) {
      case SCORES_ACTIVE:
        return <DisplayResults />;
      default:
        return <SearchHistory />;
    }
  };

  return (
    <section style={{ width: "100%" }}>
      <TestSearch />
      <Tabs
        options={BUTTONS}
        active={activeElement}
        onClick={handleChangeTab}
      />
      {getTabContent(activeElement)}
    </section>
  );
};

export default Tests;
