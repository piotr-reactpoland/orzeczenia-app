"use client";

import { useDataContext } from "@/context/data-context";
import React, { useEffect, useState } from "react";
import { SEARCH_HISTORY } from "../test-search-form/test-search-container";
import Button from "../tools/button/index";
import SearchHistoryTableView from "./search-history-table-view";
import styles from "./search-history.module.scss";

export interface DataItem {
  [key: string]: string;
}

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
            key: index,
          };
        }

        return { ...item, key: index };
      }),
    ],
    []
  );

  return data;
};

const SearchHistoryContainer = () => {
  const [reload, setReload] = useState(false);
  useDataContext(); //refresh after update

  useEffect(() => {
    if (reload) setReload(false);
  }, [reload]);

  let storedItems: any = localStorage.getItem(SEARCH_HISTORY);

  if (storedItems) {
    storedItems = JSON.parse(storedItems);
  }

  const handleClick = () => {
    localStorage.setItem(SEARCH_HISTORY, "");
    setReload(true);
  };

  const data = createData(storedItems || []);
  const duplicates = findDuplicates(data);

  return (
    <section className={styles["search-history-container"]}>
      <div>
        <h3>Szybkie porównanie wyników wyszukiwania</h3>
        <Button
          label="Wyczyść historię"
          type="button"
          width="120px"
          onClick={handleClick}
        />
      </div>
      {data?.map((rows, index) => (
        <SearchHistoryTableView
          key={index}
          data={rows}
          duplicates={duplicates[index]}
          title={storedItems?.[index]?.question}
        />
      ))}
    </section>
  );
};

export default SearchHistoryContainer;
