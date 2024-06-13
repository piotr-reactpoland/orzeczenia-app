import DisplayResultsView from "@/components/display-results/display-results-view";
import styles from "./page.module.scss";
import json_cases from "../../utils/orzeczenia.json";

interface Cases {
  id: string;
  text: string;
}
interface DisplayDetailsProps {
  readonly params: {
    "result-id": string;
  };
  readonly searchParams: {
    score: string;
  };
}

const DisplayDetails = ({ params, searchParams }: DisplayDetailsProps) => {
  const resultId = params?.["result-id"]?.[0];
  const score = searchParams?.score;
  const result = (json_cases as Array<Cases>)?.find(
    ({ id }) => id === resultId
  );

  const values = {
    score: Number(score),
    values: {
      id: result?.id || "",
      description: result?.text || "",
    },
  };

  return (
    <div className={styles["display-details-container"]}>
      {result ? (
        <DisplayResultsView value={[values]} />
      ) : (
        <p>Wróć do wyszukiwania</p>
      )}
    </div>
  );
};

export default DisplayDetails;
