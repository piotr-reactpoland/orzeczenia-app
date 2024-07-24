"use client";

import DisplayResultsView from "@/components/display-results/display-results-view";
import styles from "./page.module.scss";
import useSWR from "swr";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";

interface DisplayDetailsProps {
  readonly params: {
    "result-id": string;
  };
  readonly searchParams: {
    score: string;
  };
}

interface ErrorData {
  status: string;
}

interface Data {
  id: string;
  text: string;
}

interface ApiResponse {
  data?: Data;
  error?: any;
}

const isErrorData = (data: any): data is ErrorData => {
  return (
    data &&
    typeof data === "object" &&
    "status" in data &&
    data.status === "error"
  );
};

const fetcher = async (url: string): Promise<ApiResponse> => {
  try {
    const data: unknown = await (
      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    if (isErrorData(data)) {
      throw data;
    }

    return data as ApiResponse;
  } catch (error) {
    throw error;
  }
};

const DisplayDetails = ({ params, searchParams }: DisplayDetailsProps) => {
  const resultId = params?.["result-id"]?.[0];
  const score = searchParams?.score;
  const url = process.env.FETCH_TEXT_URL as string;
  const { data, error } = useSWR<ApiResponse>(`${url}?id=${resultId}`, fetcher);

  const values = useMemo(
    () => ({
      score: Number(score),
      values: {
        id: data?.data?.id || "",
        description: data?.data?.text || "",
      },
    }),
    [data, error]
  );
  console.log("rerender");

  useEffect(() => {
    console.log(error);
    // error && toast.error("Hello, this is a toast!");
  }, [error]);

  return (
    <div className={styles["display-details-container"]}>
      {!data && !error ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error.message || "Wróć do wyszukiwania"}</p>
      ) : (
        <DisplayResultsView value={[values]} />
      )}
    </div>
  );
};

export default DisplayDetails;
