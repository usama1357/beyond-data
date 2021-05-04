/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Empty } from "antd";
import styles from "./AutoMLExistingDatasetsTable.module.scss";
import selectedTick from "../../Icons/AutoML/selectedTick.svg";
import NoData from "../../NoData/NoData";
export default function AutoMLExistingDatasetsTable(props) {
  const [rowID, setrowID] = useState(null);

  const rowclick = (id) => {
    let trs = document.getElementsByTagName("tr");
    for (var x of trs) {
      if (x.firstChild.firstChild.style) {
        if (x.firstChild.firstChild.style.cssText === "display: none;") {
          x.style.backgroundColor = "#f5faff";
        } else {
          x.style.backgroundColor = "#e1eeff";
        }
      }
      x.className = "";
    }
    let tds = document.getElementsByTagName("td");
    for (var y of tds) {
      y.style.fontWeight = "normal";
      y.style.border = "none";
    }
    document.getElementById(id).className = "selected";
    document.getElementById(id).style.backgroundColor = "#e1eeff";
    document.getElementById(id).style.borderRight = "2px solid #085FAB";
    let list = document.getElementById(id).children;
    for (var i = 0; i < list.length; i++) {
      list[i].style.fontWeight = "700";
      if (i === 0) {
        list[i].style.border = "2px solid #085FAB";
        list[i].style.borderRight = "none";
      } else if (i === list.length - 1) {
        list[i].style.border = "2px solid #085FAB";
        list[i].style.borderLeft = "none";
      } else {
        list[i].style.borderTop = "2px solid #085FAB";
        list[i].style.borderBottom = "2px solid #085FAB";
      }
      // list[i].style.color = "#085FAB";
    }
    props.selected(id);
  };

  const Hoverover = (index) => {
    // console.log(document.getElementById(index));
    if (document.getElementsByClassName("selected")[0]) {
      if (document.getElementsByClassName("selected")[0].id !== index) {
        document.getElementById(index).style.backgroundColor = "#e1eeff";
      }
    }
  };
  const Hovercancel = (index) => {
    // console.log(document.getElementById(index));
    if (document.getElementsByClassName("selected")[0]) {
      if (
        parseInt(document.getElementsByClassName("selected")[0].id) !== index
      ) {
        if (
          document.getElementById(index).firstChild.firstChild.style.cssText !==
          "display: none;"
        ) {
        } else {
          document.getElementById(index).style.backgroundColor = "#f5faff";
        }
      } else {
        document.getElementById(index).style.backgroundColor = "#e1eeff";
      }
    }
  };
  const RenderRow = (index) => {
    if (
      document.getElementById(index).firstChild.firstChild.style.cssText !==
      "display: none;"
    ) {
      document.getElementById(index).style.backgroundColor = "#e1eeff";
    }
  };

  const getrows = () => {
    return props.data.map((item, index) => {
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
          onLoad={() => RenderRow(item.key)}
        >
          <td className={styles.description}>
            <img
              src={selectedTick}
              alt="Selected"
              style={item.selected !== "yes" ? { display: "none" } : null}
            />{" "}
          </td>
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
      {props.data ? (
        <table className={styles.datatable}>
          <thead>
            <tr>
              <th> </th>
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
        <NoData text="No Data" />
        // <Empty style={{ marginTop: "20px" }} />
      )}
    </div>
  );
}
