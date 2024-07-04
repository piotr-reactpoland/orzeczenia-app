import React from "react";
import TabsView from "./tabs-view";
import styles from "./tabs.module.scss";

export interface TabsContainerProps {
  readonly options: Array<{ id: string; label: string }>;
  readonly active: string;
  readonly onClick: (id: string) => void;
  readonly disabled: boolean;
}

const TabsContainer = (props: TabsContainerProps) => {
  return (
    <div className={styles["tabs-container"]}>
      <TabsView {...props} />
    </div>
  );
};

export default TabsContainer;
