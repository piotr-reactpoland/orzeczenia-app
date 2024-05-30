import { UseFormRegister } from "react-hook-form";
import InputField from "../tools/input-field/input-field-container";
import Select from "../tools/select/index";
import styles from "./test-search.module.scss";
interface TestSearchFields {
  register: UseFormRegister<any>;
}

const LIMIT_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const DEFAULT_LIMIT_OPTION = "7";

const MODELS_OPTIONS = [
  "intfloat/multilingual-e5-base",
  "intfloat/multilingual-e5-large",
  "OrlikB/st-polish-kartonberta-base-alpha-v1",
  "sdadas/st-polish-paraphrase-from-distilroberta",
  "sdadas/st-polish-paraphrase-from-mpnet",
];

const DEFAULT_MODEL_OPTION = "OrlikB/st-polish-kartonberta-base-alpha-v1";

const TestSearchFields = ({ register }: TestSearchFields) => {
  return (
    <div className={styles["test-search-fields"]}>
      <InputField
        label="Wpisz szukaną frazę"
        name="search-input"
        register={register}
      />
      <Select
        options={LIMIT_OPTIONS}
        label="Limit wyników"
        defaultValue={DEFAULT_LIMIT_OPTION}
        register={register}
        name="limit"
      />
      <Select
        options={MODELS_OPTIONS}
        label="Modele wyszukiwania semantycznego"
        defaultValue={DEFAULT_MODEL_OPTION}
        register={register}
        width="100%"
        disabled
        name="model"
      />
    </div>
  );
};

export default TestSearchFields;
