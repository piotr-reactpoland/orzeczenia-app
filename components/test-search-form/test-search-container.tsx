"use client";

import { useDataContext } from "@/context/data-context";
import { useForm, useFormState } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Button from "../tools/button/index";
import TestSearchFields from "./test-search-fields";
import styles from "./test-search.module.scss";

const FIELDS = ["search-input"];
const URL = process.env.FETCH_URL;

const isStatusSuccess = (data: unknown) => {
  return (
    data &&
    typeof data === "object" &&
    "status" in data &&
    data.status === "success"
  );
};

const TestSearchContainer = () => {
  const value = useDataContext();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      [FIELDS[0]]: "",
    },
  });

  const { errors, isSubmitting } = useFormState({ control });

  const onSubmit = async (data: any) => {
    const question = data?.[FIELDS[0]];
    if (!URL) return;

    const resp = await fetch("/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const respData: unknown = await resp.json();

    if (isStatusSuccess(respData)) {
      if (respData && typeof respData === "object" && "data" in respData) {
        const data = (respData.data as Array<any>).map((values) => ({
          ...values,
          id: uuidv4(),
        }));

        value?.setValue([...data]);
      }
    }
  };

  return (
    <div className={styles["test-search-container"]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TestSearchFields register={register} />
        {errors && <p>{errors?.["search-input"]?.message}</p>}
        {isSubmitting && <p>Trwa wyszukiwanie...</p>}
        <Button label="Szukaj" type="submit" disabled={isSubmitting} />
      </form>
    </div>
  );
};

export default TestSearchContainer;
