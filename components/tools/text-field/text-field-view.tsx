"use client";

import React from "react";
import styles from "./text-field.module.scss";

interface TextFieldView {
  readonly onChange: (text: string) => void;
  readonly value: string;
}

const TextFieldView = ({ onChange, value }: TextFieldView) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles["text-field"]}>
      <textarea value={value} onChange={handleChange} />
    </div>
  );
};

export default TextFieldView;
