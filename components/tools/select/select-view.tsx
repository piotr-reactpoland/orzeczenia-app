import React from "react";
import { SelectContainerProps } from "./select-container";

type SelectViewProps = Omit<SelectContainerProps, "label">;

const SelectView = ({
  defaultValue,
  options,
  width,
  disabled,
  register,
  name,
}: SelectViewProps) => {
  return (
    <select
      defaultValue={defaultValue}
      style={{ width }}
      disabled={disabled}
      {...register(name)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectView;
