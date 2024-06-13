"use client";

import { COLORS } from "./constants";
import { SEARCH_HISTORY } from "../test-search-form/test-search-container";
import { useDataContext } from "@/context/data-context";
import React, { useEffect, useState } from "react";
import Table from "../table/index";
import { MODELS } from "../test-search-form/constants";
import Button from "../tools/button/index";
import OpenImage from "../../shares/icons/open-image.svg";
import Image from "@/node_modules/next/image";
import styles from "./search-history.module.scss";

interface DataItem {
  [key: string]: string;
}

export type Columns = typeof COLUMNS;

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
  const [reload, setReload] = useState(false);
  useDataContext(); //refresh after update

  useEffect(() => {
    if (reload) setReload(false);
  }, [reload]);

  let storedItems: any = localStorage.getItem(SEARCH_HISTORY);

  if (storedItems) {
    storedItems = JSON.parse(storedItems);
  }

  const data = createData(storedItems || []);

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

  const handleClick = () => {
    localStorage.setItem(SEARCH_HISTORY, "");
    setReload(true);
  };

  return (
    <>
      <p>
        <h3>Szybkie porównanie wyników wyszukiwania</h3>
        <Button
          label="Wyczyść historię"
          type="button"
          width="120px"
          onClick={handleClick}
        />
      </p>
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
