import { UseFormRegister } from "react-hook-form";
import SelectView from "./select-view";
import styles from "./select.module.scss";
import React from "react";

interface Props {
  options: string[];
  label: string;
  width?: string;
  disabled?: boolean;
  register: UseFormRegister<any>;
  name: string;
}

export type SelectContainerProps = Readonly<Props>;

const SelectContainer = ({ label, ...rest }: SelectContainerProps) => {
  return (
    <div className={styles["select-container"]}>
      <label>{label}</label>
      <SelectView {...rest} />
    </div>
  );
};

export default SelectContainer;
