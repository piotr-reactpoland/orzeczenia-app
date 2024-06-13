"use client";

import DisplayResultsView from "@/components/display-results/display-results-view";
import { useDataContext } from "@/context/data-context";
import Link from "@/node_modules/next/link";
import styles from "./page.module.scss";

interface DisplayDetailsProps {
  readonly params: {
    "result-id": string;
  };
}

const DisplayDetails = (props: DisplayDetailsProps) => {
  const resultId = props?.params?.["result-id"]?.[0];
  const value = useDataContext()?.value;
  const result = value?.find((val) => val.values?.id === resultId);

  return (
    <div className={styles["display-details-container"]}>
      <Link href="/tests">&lt;&lt; Powrót</Link>
      {result ? (
        <DisplayResultsView value={[result]} />
      ) : (
        <p>Wróć do wyszukiwania</p>
      )}
    </div>
  );
};

export default DisplayDetails;
