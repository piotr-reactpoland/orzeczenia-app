import { nav } from "./constants";
import Link from "next/link";
import React from "react";
import styles from "./header.module.scss";

const HeaderMenu = () => {
  return (
    <div className={styles["header-menu"]}>
      {nav.map(({ id, path, label }) => (
        <Link href={path} key={id}>
          {label}
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;
