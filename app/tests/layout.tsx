"use client";

import { DataContextProvider } from "@/context/data-context";
import TestNav from "@/components/test-nav/index";
import styles from "./page.module.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={styles.main}>
      <TestNav />
      <DataContextProvider>{children}</DataContextProvider>
    </main>
  );
}
