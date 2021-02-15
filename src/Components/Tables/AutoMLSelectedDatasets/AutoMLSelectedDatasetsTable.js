/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Empty } from "antd";
import styles from "./AutoMLSelectedDatasetsTable.module.scss";

export default function AutoMLSelectedDatasetsTable(props) {
  const [rowID, setrowID] = useState(null);

  const [data, setdata] = useState([
    {
      key: "1",
      name: "Stock Prediction",
      rows: 12,
      cols: 20,
      description: "New",
      selected: "",
    },
    {
      key: "2",
      name: "Stock Prediction",
      rows: 12,
      cols: 20,
      description: "New",
      selected: "",
    },
    {
      key: "3",
      name: "Stock Prediction",
      rows: 12,
      cols: 20,
      description: "New",
      selected: "",
    },
    {
      key: "4",
      name: "Stock Prediction",
      rows: 12,
      cols: 20,
      description: "New",
      selected: "",
    },
    {
      key: "5",
      name: "Stock Prediction",
      rows: 12,
      cols: 20,
      description: "New",
      selected: "",
    },
    {
      key: "6",
      name: "Stock Prediction",
      rows: 12,
      cols: 20,
      description: "New",
      selected: "",
    },
    {
      key: "7",
      name: "Stock Prediction",
      rows: 12,
      cols: 20,
      description: "New",
      selected: "",
    },
  ]);

  const getrows = () => {
    return data.map((item, index) => {
      return (
        <tr id={item.key} key={index}>
          <td className={styles.description}> {item.name} </td>
          <td className={styles.status}> {item.description} </td>

          <td className={styles.description}> {item.rows} </td>
          <td className={styles.status}> {item.cols} </td>
        </tr>
      );
    });
  };

  return (
    <div className={styles.Container}>
      {data ? (
        <table className={styles.datatable}>
          <thead>
            <tr>
              <th> </th>
              <th>Description</th>
              <th>Rows</th>
              <th>Cols</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>{getrows()}</tbody>
        </table>
      ) : (
        <Empty />
      )}
    </div>
  );
}
