import Header from "@/components/header/index";
import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <p className={styles.test_redirect}>
        Przejdz do testowania <Link href="/tests">Tests</Link>
      </p>
    </main>
  );
}
