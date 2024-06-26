"use client";

import React, { useState } from "react";
import { isStatusSuccess } from "../utils/index";
import CategorizeResult from "./categorize-result";
import CategorizeView from "./categorize-view";
import styles from "./categorize.module.scss";

const STATE = {
  category: "",
};

type Data = typeof STATE;
export interface RequestData {
  text: string;
  type: string;
}

const CategorizeContainer = () => {
  const [data, setData] = useState<Data>(STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendRequest = async ({ text, type }: RequestData) => {
    setIsLoading(true);
    setError("");
    setData(STATE);
    const url = process.env.FETCH_CATEGORY_URL;

    if (!url) return;

    const data: unknown = await (
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, type: Number(type) }),
      })
    ).json();

    if (isStatusSuccess(data)) {
      if (data && typeof data === "object" && "data" in data) {
        setData({ category: data.data as string });
      } else {
        setError("Błąd. Nieprawidłowe dane");
      }
    } else {
      setError("Wystąpił nieoczekiwany błąd");
    }
    setIsLoading(false);
  };

  return (
    <section className={styles["categorize-section"]}>
      <CategorizeView sendRequest={handleSendRequest} />
      {isLoading ? (
        <p>Szukam...</p>
      ) : (
        <CategorizeResult category={data.category} />
      )}
      {error ? <p className={styles["categorize-error"]}>{error}</p> : null}
    </section>
  );
};

export default CategorizeContainer;
