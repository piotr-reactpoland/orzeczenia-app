"use client";

import { COLORS } from "./constants";
import { MODELS } from "../test-search-form/constants";
import { DataItem } from "./search-history-container";
import React, { useState } from "react";
import Table from "../table/index";
import OpenImage from "../../shares/icons/open-image.svg";
import Image from "@/node_modules/next/image";
import styles from "./search-history.module.scss";
import classnames from "@/node_modules/classnames/index";

export type Columns = typeof COLUMNS;
interface SearchHistoryTableViewProps {
  data: any;
  duplicates: any;
  title: string;
}

const COLUMNS = Object.keys(MODELS).map((model, index) => ({
  title: model,
  dataIndex: `model-${index + 1}`,
  key: `model-${index + 1}`,
  render: (value: DataItem) => {
    const handleClick =
      ({ id, score }: { id: string; score: string }) =>
      () => {
        const href = `${window.location.href}/${id}?score=${score}`;
        window.open(href, "_blank", "noopener,noreferrer");
      };

    return value?.id ? (
      <div className={styles["cell-render"]}>
        <p>{value.id}</p>
        <br />
        <p>Dopasowanie: {value.score}</p>
        <Image
          className={styles["cell-render-image"]}
          priority={false}
          src={OpenImage}
          alt="Open in a new window icon"
          width={26}
          height={26}
          onClick={handleClick({ id: value.id, score: value.score })}
        />
      </div>
    ) : null;
  },
}));

const SearchHistoryTableView = ({
  data,
  duplicates,
  title,
}: SearchHistoryTableViewProps) => {
  const [highlightId, setHighlightId] = useState("");

  const cellClassName = (value: DataItem, highlightId: string) => {
    let colorName = "";

    if (duplicates.includes(value?.id)) {
      const index = duplicates?.indexOf(value.id);
      colorName = Object.keys(COLORS)?.[index] || "";
    }

    return classnames(`${value?.id || ""}`, {
      [`highlight-${colorName}`]: colorName,
      [styles["rc-table-cell-opacity"]]:
        highlightId && highlightId !== value?.id,
    });
  };

  const columnsWithClassNames = (highlightId: string) =>
    COLUMNS.map((col) => ({
      ...col,
      onCell: (record: any) => ({
        className: cellClassName(record[col.dataIndex], highlightId),
        onMouseEnter: () => {
          if (!record[col.dataIndex]?.id) return;
          setHighlightId(record[col.dataIndex]?.id);
        },
        onMouseLeave: () => {
          highlightId && setHighlightId("");
        },
      }),
    }));

  return (
    <Table
      columns={columnsWithClassNames(highlightId)}
      data={data}
      title={`Szukana fraza: ${title}`}
    />
  );
};

export default SearchHistoryTableView;
