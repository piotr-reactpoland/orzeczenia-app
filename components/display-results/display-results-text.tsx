import classNames from "@/node_modules/classnames/index";
import styles from "./display-results.module.scss";

interface DisplayResultsTextProps {
  readonly text: string;
  readonly scrollView?: boolean;
}

const DisplayResultsText = ({ text, scrollView }: DisplayResultsTextProps) => {
  console.log("🚀 ~ DisplayResultsText ~ scrollView:", scrollView);
  return (
    <div
      className={classNames({
        [styles["display-results-text"]]: scrollView,
      })}
    >
      {text}
    </div>
  );
};

export default DisplayResultsText;
