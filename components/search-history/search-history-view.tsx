"use client";

import { COLORS, COLUMNS } from "./constants";
import { SEARCH_HISTORY } from "../test-search-form/test-search-container";
import { useDataContext } from "@/context/data-context";
import React, { useRef } from "react";
import Table from "../table/index";

interface DataItem {
  [key: string]: string;
}

interface Values {
  data: any;
  limit: string;
  question: string;
  model: string;
}

type CreateValues = Readonly<Values>;

// # intfloat/multilingual-e5-base
// # intfloat/multilingual-e5-large
// # OrlikB/st-polish-kartonberta-base-alpha-v1
// # sdadas/st-polish-paraphrase-from-distilroberta
// # sdadas/st-polish-paraphrase-from-mpnet

export type Columns = typeof COLUMNS;

const findDuplicates = (data: DataItem[][]) => {
  const values = data.reduce((acc: any, item: any) => {
    let occurrences: { [key: string]: number } = {};

    item?.forEach((val: any) => {
      Object.values(val).forEach((value) => {
        if (typeof value === "string") {
          const splitValue = ((value as string) || "")?.split(" ")?.[0];

          if (occurrences[splitValue as keyof typeof occurrences]) {
            occurrences[splitValue as keyof typeof occurrences]++;
          } else {
            occurrences[splitValue as keyof typeof occurrences] = 1;
          }
        }
      });
    });

    return [...acc, { ...occurrences }];
  }, []);

  const duplicates = values?.map((occurrences: any) =>
    Object.keys(occurrences).filter((key) => occurrences[key] > 1)
  );

  return duplicates;
};

const createData = (storedItems: DataItem[]) => {
  const data = storedItems?.reduce(
    (acc: DataItem[][] | [], values: any) => [
      ...acc,
      values?.data?.map((item: DataItem, index: number) => {
        if (index === 0) {
          return {
            ...item,
            question: values.question,
            limit: values.data.length,
          };
        }

        return { ...item };
      }),
    ],
    []
  );

  return data;
};

const SearchHistoryView = () => {
  useDataContext(); //refresh after update
  let storedItems: any = localStorage.getItem(SEARCH_HISTORY);

  if (storedItems) {
    storedItems = JSON.parse(storedItems);
  }

  const data = createData(storedItems || []);

  const duplicates = findDuplicates(data);

  const cellClassName = (value: string, tableIndex: number) => {
    const splitValue = (value || "").split(" ")?.[0];

    if (duplicates[tableIndex]?.includes(splitValue)) {
      const index = duplicates[tableIndex]?.indexOf(splitValue);
      const colorName = Object.keys(COLORS)?.[index];

      if (colorName) {
        return `highlight-${colorName}`;
      }
    }
    return "";
  };

  const columnsWithClassNames = (index: number) =>
    COLUMNS.map((col) => ({
      ...col,
      onCell: (record: any) => ({
        className: cellClassName(record[col.dataIndex], index),
      }),
    }));

  return (
    <>
      <h3>Szybkie porównanie wyników wyszukiwania</h3>
      {data.map((rows, index) => (
        <Table
          key={index}
          columns={columnsWithClassNames(index)}
          data={rows}
          title={rows?.[0].question}
        />
      ))}
    </>
  );
};

export default SearchHistoryView;
