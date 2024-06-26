"use client";

import React from "react";
import TextFieldView from "./text-field-view";

interface CategorizeContainerProps {
  readonly name: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (text: string) => void;
}

const TextFieldContainer = ({
  name,
  label,
  value,
  onChange,
}: CategorizeContainerProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <TextFieldView value={value} onChange={onChange} />
    </div>
  );
};

export default TextFieldContainer;
