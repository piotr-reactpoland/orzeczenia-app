import { TabsContainerProps } from "./tabs-container";
import classnames from "@/node_modules/classnames/index";
import React from "react";
import styles from "./tabs.module.scss";

type TabsView = TabsContainerProps;

const TabsView = ({ options = [], active, onClick }: TabsView) => {
  return (
    <>
      {options.map(({ id, label, disabled }) => (
        <div
          key={id}
          role="tab"
          className={classnames(`${styles["tabs-button"]}`, {
            [styles["tabs-button-active"]]: id === active,
            [styles["tabs-button-disabled"]]: disabled,
          })}
          onClick={() => onClick(id)}
        >
          {label}
        </div>
      ))}
    </>
  );
};

export default TabsView;
