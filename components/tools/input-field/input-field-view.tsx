import { UseFormRegister } from "react-hook-form";

interface InputFieldViewProps {
  readonly placeholder?: string;
  readonly name: string;
  readonly register: UseFormRegister<any>;
}

const InputFieldView: React.FC<InputFieldViewProps> = ({
  name,
  placeholder,
  register,
}) => {
  return (
    <input
      id={name}
      placeholder={placeholder}
      {...register(name, { required: `Field is required` })}
    />
  );
};

export default InputFieldView;
