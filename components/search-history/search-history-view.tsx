"use client";

import { COLORS } from "./constants";
import { SEARCH_HISTORY } from "../test-search-form/test-search-container";
import { useDataContext } from "@/context/data-context";
import React from "react";
import Table from "../table/index";
import { MODELS } from "../test-search-form/constants";

interface DataItem {
  [key: string]: string;
}

export type Columns = typeof COLUMNS;

const COLUMNS = Object.keys(MODELS).map((model, index) => ({
  title: model,
  dataIndex: `model-${index + 1}`,
  key: `model-${index + 1}`,
  render: (value: DataItem) => (
    <div>
      <p>{value?.id}</p>
      <br />
      <p>{value?.score}</p>
    </div>
  ),
}));

const findDuplicates = (data: DataItem[][]) => {
  const values = data.reduce((acc: any, item: any) => {
    let occurrences: { [key: string]: number } = {};

    item?.forEach((val: any) => {
      Object.values(val).forEach((value: any) => {
        if (value?.id) {
          if (occurrences[value.id as keyof typeof occurrences]) {
            occurrences[value.id as keyof typeof occurrences]++;
          } else {
            occurrences[value.id as keyof typeof occurrences] = 1;
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
  console.log("🚀 ~ SearchHistoryView ~ data:", data);

  const duplicates = findDuplicates(data);

  const cellClassName = (value: DataItem, tableIndex: number) => {
    if (duplicates[tableIndex]?.includes(value?.id)) {
      const index = duplicates[tableIndex]?.indexOf(value.id);
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
          title={`Szukana fraza: ${storedItems?.[index].question}`}
        />
      ))}
    </>
  );
};

export default SearchHistoryView;
