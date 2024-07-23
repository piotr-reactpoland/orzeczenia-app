"use client";

import { useRouter, usePathname } from "@/node_modules/next/navigation";
import Button from "../tools/button/index";
import DisplayResultsText from "./display-results-text";
import styles from "./display-results.module.scss";
import React from "react";

interface ResultData {
  score: number;
  values: {
    id: string;
    description: string;
    original_id?: string;
  };
}

interface DisplayResultsViewProps {
  readonly value: Array<ResultData>;
  readonly scrollView?: boolean;
}

const DisplayResultsView = ({ scrollView, value }: DisplayResultsViewProps) => {
  const handleClick =
    ({ id, score }: { id: string; score: number }) =>
    () => {
      const href = `${window.location.href}/${id}?score=${score}`;
      window.open(href, "_blank", "noopener,noreferrer");
    };

  return (
    <div className={styles["display-results"]}>
      {value?.map(({ values, score }) => (
        <div key={values.id}>
          <p className={styles["display-results-score"]}>
            <span>Dopasowanie: {score?.toFixed(3)}</span>{" "}
            <span>Id: {values.original_id || values.id}</span>
          </p>
          <DisplayResultsText
            text={values.description}
            scrollView={scrollView}
          />
          <Button
            label="Wyświetl w nowym oknie"
            type="button"
            onClick={handleClick({
              id: values.original_id || values.id,
              score,
            })}
            width="200px"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayResultsView;
