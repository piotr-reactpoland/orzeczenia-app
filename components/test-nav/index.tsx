"use client";

import styles from "./test-nav.module.scss";
import Link from "@/node_modules/next/link";
import { usePathname, useSearchParams } from "@/node_modules/next/navigation";

const TestNav = () => {
  const pathname = usePathname();
  const isDetailsSide = useSearchParams().get("score");

  const isCategorize = pathname.includes("categorize");
  const label = `Przejdz do ${isCategorize ? "testów" : "kategoryzacji"}`;
  const href = `/tests${isCategorize ? "" : "/categorize"}`;

  return isDetailsSide ? null : (
    <Link href={href} className={styles["nav-link"]}>
      {label}
    </Link>
  );
};

export default TestNav;
