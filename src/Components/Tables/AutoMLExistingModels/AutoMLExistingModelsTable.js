/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Table, Space, Empty, Button, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styles from "./AutoMLExistingModelsTable.module.scss";
import { useHistory, useParams } from "react-router-dom";
import deleteIcon from "../../Icons/AutoML/delete.svg";

export default function AutoMLExistingModelTable(props) {
  let history = useHistory();
  let { project_id } = useParams();

  // var tds = document.getElementsByTagName("td");
  // for (var i = 0; i < tds.length; i++) {
  //   tds[i].onmouseover = function () {
  //     this.parentNode.style.background = "#ff0000";
  //   };
  //   tds[i].onmouseout = function () {
  //     this.parentNode.style.backgroundColor = "#fff";
  //   };
  // }

  const data = [
    {
      key: "1",
      name: "Stock Prediction",
      rma: 12,
      description: "I am a Model",
      status: "New",
      last_updated: "Monday 21 Dec, 2020",
    },
    {
      key: "2",
      name: "Stock Prediction",
      rma: 12,
      description: "I am a Model",
      status: "Updated",
      last_updated: "Monday 21 Dec, 2020",
    },
    {
      key: "3",
      name: "Stock Prediction",
      rma: 12,
      description: "I am a Model",
      status: "Update Available",
      last_updated: "Monday 21 Dec, 2020",
    },
    {
      key: "4",
      name: "Stock Prediction",
      rma: 12,
      description: "I am a Model",
      status: "New",
      last_updated: "Monday 21 Dec, 2020",
    },
    {
      key: "5",
      name: "Stock Prediction",
      rma: 12,
      description: "I am a Model",
      status: "New",
      last_updated: "Monday 21 Dec, 2020",
    },
  ];

  const rowclick = (id) => {
    let trs = document.getElementsByTagName("tr");
    for (var x of trs) {
      x.style.backgroundColor = "#f5faff";
      // var css = "tbody tr:hover { background: red;}";
      // var s = document.createElement("style");

      // if (s.styleSheet) {
      //   s.styleSheet.cssText = css;
      // } else {
      //   s.appendChild(document.createTextNode(css));
      // }
      // x.appendChild(s);
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
          <td>
            <p className={styles.titlebold}>{item.name}</p>
            <span className={styles.subtitle}>
              Created by:{" "}
              <span
                className={styles.author}
                style={{
                  backgroundColor: "#B8F2FF",
                  color: "#38B7D3",
                  fontWeight: "normal",
                  borderRadius: "50%",
                  height: "15px",
                  width: "14px",
                }}
              >
                JD
              </span>
            </span>
          </td>
          <td className={styles.description}> {item.description} </td>
          <td className={styles.status}>
            {" "}
            <Tag
              color={
                item.status === "New"
                  ? "blue"
                  : item.status === "Updated"
                  ? "gold"
                  : "green"
              }
            >
              {item.status}
            </Tag>{" "}
          </td>
          <td className={styles.rma}> {item.rma} </td>
          <td className={styles.last_updated}>
            <p className={styles.titlebold}>{item.last_updated}</p>
            <span className={styles.subtitle}>
              Created by:{" "}
              <span
                className={styles.author}
                style={{
                  backgroundColor: "#FFE4EC",
                  color: "#F087A3",
                  fontWeight: "normal",
                  borderRadius: "50%",
                  height: "15px",
                  width: "14px",
                }}
              >
                JD
              </span>
            </span>
          </td>
          <td>
            <a
              style={{
                textDecoration: " none",
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "14px",
                color: "#6d6d6d",
              }}
            >
              <Space align="center">
                <img src={deleteIcon} alt="delete icon"></img>
                <span style={{ fontWeight: "400", fontSize: "12px" }}>
                  Delete
                </span>
              </Space>
            </a>
          </td>
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
              <th>Status</th>
              <th>RMA</th>
              <th>Last Updated</th>
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
