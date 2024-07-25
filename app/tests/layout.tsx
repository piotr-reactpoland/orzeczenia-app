"use client";

import { DataContextProvider } from "@/context/data-context";
import { Suspense } from "react";
import TestNav from "@/components/test-nav/index";
import styles from "./page.module.scss";
import Toast from "@/components/toast/toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={styles.main}>
      <Suspense fallback={<span />}>
        <TestNav />
      </Suspense>
      <DataContextProvider>{children}</DataContextProvider>
      <Toast />
    </main>
  );
}
