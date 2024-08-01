import { UseFormRegister } from "react-hook-form";
import InputField from "../tools/input-field/input-field-container";
import Select from "../tools/select/index";
import styles from "./test-search.module.scss";
import React from "react";

interface TestSearchFields {
  register: UseFormRegister<any>;
}

const LIMIT_OPTIONS = Array.from({ length: 10 }, (v, i) => `${i + 1}`);

const MODELS_OPTIONS = [
  "intfloat/multilingual-e5-base",
  "intfloat/multilingual-e5-large",
  "OrlikB/st-polish-kartonberta-base-alpha-v1",
  // "sdadas/st-polish-paraphrase-from-distilroberta",
  // "sdadas/st-polish-paraphrase-from-mpnet",
];

const DATA_SIZE = ["500", "35000"];

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
        register={register}
        name="limit"
      />
      <Select
        options={MODELS_OPTIONS}
        label="Modele wyszukiwania semantycznego"
        register={register}
        width="100%"
        name="model"
      />
      <Select
        options={DATA_SIZE}
        label="Rozmiar bazy danych"
        register={register}
        width="100%"
        name="less-data"
      />
    </div>
  );
};

export default TestSearchFields;
