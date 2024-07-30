"use client";

import { useDataContext } from "@/context/data-context";
import { useForm, useFormState } from "react-hook-form";
import Button from "../tools/button/index";
import TestSearchFields from "./test-search-fields";
import React from "react";
import styles from "./test-search.module.scss";
import { MODELS } from "./constants";
import { isStatusSuccess } from "../utils/index";
import { toastService } from "../toast/toast";

interface Data {
  data: Array<any>;
  model: string;
  question: string;
  limit: number;
}

type HistoryData = Readonly<Data>;

interface Value {
  readonly data: Array<any>;
  readonly model: string;
}

interface Values {
  original_id: string;
  description: string;
}
interface CreateValue {
  readonly values: Values;
  readonly score: number;
}

const FIELDS = ["search-input", "limit", "model"];
const URL = process.env.FETCH_URL;
const MAX_HISTORY_LENGTH = 5;
export const SEARCH_HISTORY = "search-history";

const getValue = ({ data, model }: Value) =>
  data.map((values) => ({
    [MODELS[model as keyof typeof MODELS]]: createValue(values),
  }));

const createValue = (values: CreateValue) => ({
  id: values?.values?.original_id,
  score: `${values.score?.toFixed(3)}`,
});

const setHistory = ({ data, model, question, limit }: HistoryData) => {
  let storedItems: any = localStorage.getItem(SEARCH_HISTORY);

  if (storedItems) {
    storedItems = JSON.parse(storedItems);
  }

  if (
    storedItems &&
    storedItems?.some(
      (values: HistoryData) =>
        values.model === model &&
        values.question === question &&
        values.limit === limit
    )
  ) {
    return;
  }

  let dataToStore = null;

  if (storedItems) {
    const questionToUpdate = storedItems.find(
      (item: HistoryData) => item.question === question
    );

    if (questionToUpdate?.question) {
      const otherQuestions = storedItems.filter(
        (item: HistoryData) => item.question !== question
      );

      data.forEach((values, index) => {
        questionToUpdate.data[index] = {
          ...questionToUpdate.data[index],
          [MODELS[model as keyof typeof MODELS]]: createValue(values),
        };
      });

      dataToStore = [{ ...questionToUpdate }, ...(otherQuestions || [])];
    } else {
      dataToStore = [
        {
          model,
          question,
          limit,
          data: getValue({ data, model }),
        },
        ...(storedItems || []),
      ];
    }
  } else {
    dataToStore = [
      {
        model,
        question,
        limit,
        data: getValue({ data, model }),
      },
    ];
  }

  if (dataToStore) {
    let seen = new Set();

    const questions = dataToStore.filter(({ question }) => {
      let duplicate = seen.has(question);
      seen.add(question);

      return !duplicate;
    });

    if (questions.length > MAX_HISTORY_LENGTH) {
      dataToStore.pop();
    }

    localStorage.setItem(SEARCH_HISTORY, JSON.stringify(dataToStore));
  }
};

const displayError = (error: any) => {
  const errorMsg =
    error?.message ||
    "Wystąpił nieoczekiwany błąd podczas wysyłania zapytania do serwera.";

  toastService.error(errorMsg);
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

    const timeout = 15000;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const signal = controller.signal;

    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, limit, model }),
        signal,
      });
      const respData: unknown = await resp.json();

      if (isStatusSuccess(respData)) {
        if (respData && typeof respData === "object" && "data" in respData) {
          value?.setValue([...(respData.data as Array<any>)]);
          setHistory({
            data: respData.data as Array<any>,
            model,
            question,
            limit,
          });

          toastService.success("Wyszukiwanie zostało zakończone sukcesem");
        }
      } else {
        displayError(respData);
      }
      clearTimeout(id);
    } catch (error: any) {
      if (signal.aborted) {
        throw new Error("Fetch request timed out");
      }
      displayError(error);
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
