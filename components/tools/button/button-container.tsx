import ButtonView from "./button-view";
import styles from "./button.module.scss";

export interface ButtonProps {
  readonly label: string;
  readonly type: "button" | "submit";
  readonly onClick?: () => void;
  readonly width?: string;
  readonly disabled?: boolean;
}

const ButtonContainer = (props: ButtonProps) => {
  return (
    <div className={styles["button-container"]}>
      <ButtonView {...props} />
    </div>
  );
};

export default ButtonContainer;
