import { UseFormRegister } from "react-hook-form";
import SelectView from "./select-view";
import styles from "./select.module.scss";

interface Props {
  options: string[];
  onSelect?: () => void;
  label: string;
  defaultValue: string;
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
