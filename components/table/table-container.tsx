import { Columns } from "../search-history/search-history-table-view";
import React from "react";
import TableView from "./table-view";
import styles from "./table.module.scss";

export interface TableContainerProps {
  columns: Columns;
  data: Array<any>;
  title?: string;
}

const TableContainer = ({ columns, data, title }: TableContainerProps) => {
  return (
    <div className={styles["table-wrapper"]}>
      <p>{title}</p>
      <TableView columns={columns} data={data} />
    </div>
  );
};

export default TableContainer;
