"use client";
import React from "react";

import Header from "@/components/molecules/navbar/header/header";
import styles from "@/components/organisms/layout/layout.module.css";

export default function Layout({ children }: Readonly<ComponentProps>) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
