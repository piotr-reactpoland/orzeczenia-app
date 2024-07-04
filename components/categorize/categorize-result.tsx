import styles from "./categorize.module.scss";

interface CategorizeResultProps {
  category: string;
  result?: string;
}

const CategorizeResult = ({ category, result }: CategorizeResultProps) => {
  return (
    <div className={styles["categorize-result"]}>
      {category ? <p>{category}</p> : null}
      {result ? <p>{result}</p> : null}
    </div>
  );
};

export default CategorizeResult;
