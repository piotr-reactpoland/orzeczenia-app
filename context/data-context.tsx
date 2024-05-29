"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface DataContextType {
  value: Array<any> | undefined;
  setValue: Dispatch<SetStateAction<Array<any> | undefined>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataContextProviderProps {
  children: ReactNode;
}

export const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const [value, setValue] = useState<Array<any> | undefined>(undefined);

  return (
    <DataContext.Provider value={{ value, setValue }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType | undefined =>
  useContext(DataContext);
