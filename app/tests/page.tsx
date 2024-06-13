"use client";

import React, { useState } from "react";
import DisplayResults from "@/components/display-results/index";
import SearchHistory from "@/components/search-history/index";
import TestSearch from "@/components/test-search-form/index";
import Button from "@/components/tools/button/index";
import Tabs from "@/components/tools/tabs/index";

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

  return (
    <section style={{ width: "100%" }}>
      <TestSearch />
      <Tabs
        options={BUTTONS}
        active={activeElement}
        onClick={handleChangeTab}
      />
      {activeElement === SCORES_ACTIVE ? <DisplayResults /> : <SearchHistory />}
    </section>
  );
};

export default Tests;
