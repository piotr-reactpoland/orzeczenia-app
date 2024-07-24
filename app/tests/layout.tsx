"use client";

import { DataContextProvider } from "@/context/data-context";
import TestNav from "@/components/test-nav/index";
import styles from "./page.module.scss";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer />
    </main>
  );
}
