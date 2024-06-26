"use client";

import { RequestData } from "./categorize-container";
import React, { useState } from "react";
import Button from "../tools/button/index";
import Tabs from "../tools/tabs/index";
import TextField from "../tools/text-field/index";
import styles from "./categorize.module.scss";

interface CategorizeViewProps {
  sendRequest: ({ text, type }: RequestData) => void;
}

const BUTTONS = [
  {
    id: "1",
    label: "Opcja 1",
  },
  {
    id: "2",
    label: "Opcja 2",
  },
];

const CategorizeView = ({ sendRequest }: CategorizeViewProps) => {
  const [fieldValue, setFieldValue] = useState("");
  const [activeElement, setActiveElement] = useState("1");

  const handleChange = (value: string) => {
    setFieldValue(value);
  };

  const handleChangeTab = (id: string) => {
    setActiveElement(id);
  };

  const handleSendRequest = () =>
    sendRequest({ text: fieldValue, type: activeElement });

  return (
    <div className={styles["categorize-search"]}>
      <Tabs
        options={BUTTONS}
        active={activeElement}
        onClick={handleChangeTab}
      />
      <TextField
        name="category"
        label="Wprowadź tekst"
        onChange={handleChange}
        value={fieldValue}
      />
      <Button
        label="Sprawdź"
        type="button"
        width="120px"
        onClick={handleSendRequest}
        disabled={!fieldValue}
      />
    </div>
  );
};

export default CategorizeView;
