"use client";

import { isStatusSuccess } from "../utils/index";
import React, { useState } from "react";
import CategorizeResult from "./categorize-result";
import CategorizeView from "./categorize-view";
import styles from "./categorize.module.scss";

const STATE = {
  category: "",
  result: "",
};

type Data = typeof STATE;
export interface RequestData {
  text: string;
  type: string;
}

interface ApiResponse {
  data?: {
    categorize?: string;
    result?: string;
  };
  success: boolean;
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

    try {
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
        const responseData = data as ApiResponse;
        if (
          responseData &&
          typeof responseData === "object" &&
          "data" in responseData
        ) {
          setData({
            category: responseData.data?.categorize || "",
            result: responseData.data?.result || "",
          });
        } else {
          setError("Błąd. Nieprawidłowe dane");
        }
      } else {
        setError("Wystąpił nieoczekiwany błąd");
      }
    } catch (error) {
      setError("Wystąpił nieoczekiwany błąd");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles["categorize-section"]}>
      <CategorizeView sendRequest={handleSendRequest} />
      {isLoading ? (
        <p>Szukam...</p>
      ) : (
        <CategorizeResult category={data.category} result={data.result} />
      )}
      {error ? <p className={styles["categorize-error"]}>{error}</p> : null}
    </section>
  );
};

export default CategorizeContainer;
