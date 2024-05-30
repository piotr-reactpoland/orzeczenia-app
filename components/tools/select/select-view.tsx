import { SelectContainerProps } from "./select-container";

type SelectViewProps = Omit<SelectContainerProps, "label">;

const SelectView = ({
  defaultValue,
  onSelect,
  options,
  width,
  disabled,
  register,
  name,
}: SelectViewProps) => {
  return (
    <select
      onChange={onSelect}
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
