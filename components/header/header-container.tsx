import React from "react";
import HeaderMenu from "./header-menu";
import styles from "./header.module.scss";

const HeaderContainer = () => {
  return (
    <header className={styles["header-container"]}>
      <HeaderMenu />
    </header>
  );
};

export default HeaderContainer;
