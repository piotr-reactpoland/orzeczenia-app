import { Columns } from "../search-history/search-history-view";
import React from "react";
import TableView from "./table-view";

export interface TableContainerProps {
  columns: Columns;
  data: Array<any>;
  title?: string;
}

const TableContainer = ({ columns, data = [], title }: TableContainerProps) => {
  return <TableView columns={columns} data={data} title={title} />;
};

export default TableContainer;
