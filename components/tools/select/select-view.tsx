import React from "react";
import { SelectContainerProps } from "./select-container";

type SelectViewProps = Omit<SelectContainerProps, "label">;

const SelectView = ({
  options,
  width,
  disabled,
  register,
  name,
}: SelectViewProps) => {
  return (
    <select style={{ width }} disabled={disabled} id={name} {...register(name)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectView;
