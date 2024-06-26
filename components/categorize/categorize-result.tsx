import styles from "./categorize.module.scss";

interface CategorizeResultProps {
  category: string;
}

const CategorizeResult = ({ category }: CategorizeResultProps) => {
  return (
    <div className={styles["categorize-result"]}>
      {category ? <p>Kategoria: prawo {category}</p> : null}
    </div>
  );
};

export default CategorizeResult;
