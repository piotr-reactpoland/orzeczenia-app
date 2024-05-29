"use client";

import styles from "./page.module.scss";
import { DataContextProvider } from "@/context/data-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={styles.main}>
      <DataContextProvider>{children}</DataContextProvider>
    </main>
  );
}
