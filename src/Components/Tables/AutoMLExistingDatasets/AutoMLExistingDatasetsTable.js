/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Empty } from "antd";
import styles from "./AutoMLExistingDatasetsTable.module.scss";

export default function AutoMLExistingDatasetsTable(props) {
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

  const rowclick = (id) => {
    let trs = document.getElementsByTagName("tr");
    for (var x of trs) {
      x.style.backgroundColor = "#f5faff";
      x.className = "";
    }
    let tds = document.getElementsByTagName("td");
    for (var y of tds) {
      y.style.fontWeight = "normal";
    }
    document.getElementById(id).className = "selected";
    document.getElementById(id).style.backgroundColor = "#b8d7f5";
    let list = document.getElementById(id).children;
    for (var i = 0; i < list.length; i++) {
      list[i].style.fontWeight = "700";
    }
    props.selected(id);
  };

  const Hoverover = (index) => {
    // console.log(document.getElementById(index));
    if (document.getElementsByClassName("selected")[0]) {
      if (document.getElementsByClassName("selected")[0].id !== index) {
        document.getElementById(index).style.backgroundColor = "#a0cfff";
      }
    }
  };
  const Hovercancel = (index) => {
    // console.log(document.getElementById(index));
    if (document.getElementsByClassName("selected")[0]) {
      if (document.getElementsByClassName("selected")[0].id !== index) {
        document.getElementById(index).style.backgroundColor = "#f5faff";
      }
    }
  };

  const getrows = () => {
    return data.map((item, index) => {
      return (
        <tr
          id={item.key}
          key={index}
          onClick={() => {
            rowclick(item.key);
            // props.selected(item.key);
          }}
          onMouseOver={() => Hoverover(item.key)}
          onMouseLeave={() => Hovercancel(item.key)}
        >
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
