import { UseFormRegister } from "react-hook-form";
import InputField from "../tools/input-field/input-field-container";
interface TestSearchFields {
  register: UseFormRegister<any>;
}

const TestSearchFields = ({ register }: TestSearchFields) => {
  return (
    <div className="test-search-fields">
      {/* select */}
      <InputField
        label="Wpisz szukaną frazę"
        name="search-input"
        register={register}
      />
    </div>
  );
};

export default TestSearchFields;
