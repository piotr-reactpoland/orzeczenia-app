"use client";

import { useRouter } from "@/node_modules/next/navigation";
import Button from "../tools/button/index";
import DisplayResultsText from "./display-results-text";
import styles from "./display-results.module.scss";

interface ResultData {
  score: number;
  text: string;
  id: string;
}

interface DisplayResultsViewProps {
  readonly value: Array<ResultData>;
  readonly scrollView?: boolean;
}

const DisplayResultsView = ({ scrollView, value }: DisplayResultsViewProps) => {
  const router = useRouter();

  const handleClick = (id: string) => () => {
    router.push(`/tests/${id}`);
  };

  return (
    <div className={styles["display-results"]}>
      {value?.map(({ id, text, score }) => (
        <div key={id}>
          <p className={styles["display-results-score"]}>
            Dopasowanie: {score?.toFixed(3)}
          </p>
          <DisplayResultsText text={text} scrollView={scrollView} />
          <Button
            label="Wyświetl w nowym oknie"
            type="button"
            onClick={handleClick(id)}
            width="200px"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayResultsView;
