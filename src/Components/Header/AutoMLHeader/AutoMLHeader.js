import React from "react";
import styles from "./AutoMLHeader.module.scss";
import { Layout } from "antd";

export default function AutoMLHeader() {
  const { Header } = Layout;

  return (
    <div className={styles.Container}>
      <Header className={styles.header}>
        <div className="logo" />
        <h2>
          Beyond<span> Data</span>
        </h2>
      </Header>
    </div>
  );
}
