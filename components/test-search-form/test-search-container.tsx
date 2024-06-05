"use client";

import { useDataContext } from "@/context/data-context";
import { useForm, useFormState } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Button from "../tools/button/index";
import TestSearchFields from "./test-search-fields";
import React from "react";
import styles from "./test-search.module.scss";

const FIELDS = ["search-input", "limit", "model"];
const URL = process.env.FETCH_URL;

const isStatusSuccess = (data: unknown) => {
  return (
    data &&
    typeof data === "object" &&
    "status" in data &&
    data.status === "success"
  );
};

const DEFAULT_MODEL_OPTION = "OrlikB/st-polish-kartonberta-base-alpha-v1";
const DEFAULT_LIMIT_OPTION = "6";

const TestSearchContainer = () => {
  const value = useDataContext();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      [FIELDS[0]]: "",
      [FIELDS[1]]: DEFAULT_LIMIT_OPTION,
      [FIELDS[2]]: DEFAULT_MODEL_OPTION,
    },
  });

  const { errors, isSubmitting } = useFormState({ control });

  const onSubmit = async (data: any) => {
    const question = data?.[FIELDS[0]];
    const limit = data?.[FIELDS[1]];
    const model = data?.[FIELDS[2]];

    if (!URL) return;
    const url = process.env.FETCH_URL as string;

    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, limit, model }),
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
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("Request timed out");
      }
      throw error;
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
