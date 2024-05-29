import { ButtonProps } from "./button-container";

const ButtonView = ({
  label,
  type = "button",
  onClick,
  width,
  disabled,
}: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} style={{ width }} disabled={disabled}>
      {label}
    </button>
  );
};

export default ButtonView;
