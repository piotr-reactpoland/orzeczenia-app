import Categorize from "@/components/categorize/index";
import styles from "./page.module.scss";

const CategorizePage = () => {
  return (
    <section>
      <h3 className={styles["page-title"]}>Kategoryzacja</h3>
      <Categorize />
    </section>
  );
};

export default CategorizePage;
