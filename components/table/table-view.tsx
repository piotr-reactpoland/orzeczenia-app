import { TableContainerProps } from "./table-container";
import React from "react";
import Table from "@/node_modules/rc-table/lib/index";
import styles from "./table.module.scss";
import classnames from "@/node_modules/classnames/index";
import "./highlights.scss";

type TableViewProps = Omit<TableContainerProps, "title">;

const TableView = ({ columns, data }: TableViewProps) => {
  return (
    <Table
      columns={columns}
      data={data}
      className={classnames(styles["test-table"])}
    />
  );
};

export default TableView;
