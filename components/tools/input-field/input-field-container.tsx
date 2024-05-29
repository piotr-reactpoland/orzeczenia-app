import { UseFormRegister } from "react-hook-form";
import InputFieldView from "./input-field-view";
import styles from "./input-field.module.scss";

interface InputFieldContainerProps {
  readonly label?: string;
  readonly name: string;
  readonly register: UseFormRegister<any>;
}

const InputFieldContainer = ({
  label,
  name,
  register,
}: InputFieldContainerProps) => {
  return (
    <div className={styles["input-field-container"]}>
      <label htmlFor={name}>{label}</label>
      <InputFieldView name={name} register={register} />
    </div>
  );
};

export default InputFieldContainer;
