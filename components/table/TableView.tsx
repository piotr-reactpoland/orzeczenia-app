import { TableContainerProps } from "./TableContainer";
import React from "react";
import Table from "@/node_modules/rc-table/lib/index";
import styles from "./table.module.scss";
import "./highlights.scss";

type TableViewProps = TableContainerProps;

const TableView = ({ columns, data, title = "" }: TableViewProps) => {
  return (
    <div className="table">
      <p>{title}</p>
      <Table columns={columns} data={data} className={styles["test-table"]} />
    </div>
  );
};

TableView.defaultProps = {};

export default TableView;
