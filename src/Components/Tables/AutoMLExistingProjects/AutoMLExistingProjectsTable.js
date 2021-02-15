/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Space, Empty } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styles from "./AutoMLExistingProjectsTable.module.scss";
import { useHistory } from "react-router-dom";
import deleteIcon from "../../Icons/AutoML/delete.svg";

export default function AutoMLExistingProjectsTable(props) {
  let history = useHistory();

  const data = [
    {
      key: "1",
      name: "Trade Prediction",
      no_of_models: 12,
      last_updated: "Monday 21 Dec, 2020",
      description: "I am a new project",
    },
    {
      key: "2",
      name: "Trade Prediction",
      no_of_models: 12,
      last_updated: "Monday 21 Dec, 2020",
      description: "I am a new project",
    },
    {
      key: "3",
      name: "Trade Prediction",
      no_of_models: 12,
      last_updated: "Monday 21 Dec, 2020",
      description: "I am a new project",
    },
    {
      key: "4",
      name: "Trade Prediction",
      no_of_models: 12,
      last_updated: "Monday 21 Dec, 2020",
      description: "I am a new project",
    },
    {
      key: "5",
      name: "Trade Prediction",
      no_of_models: 12,
      last_updated: "Monday 21 Dec, 2020",
      description: "I am a new project",
    },
  ];

  const rowclick = (id) => {
    // document.getElementsByTagName("tr").map((item) => {
    //   item.style.backgroundColor = "#f5faff";
    // });
    let trs = document.getElementsByTagName("tr");
    for (var x of trs) {
      x.style.backgroundColor = "#f5faff";
      // var css = "tbody tr:hover { background: #a0cfff;}";
      // var s = document.createElement("style");

      // if (s.styleSheet) {
      //   s.styleSheet.cssText = css;
      // } else {
      //   s.appendChild(document.createTextNode(css));
      // }
      // x.appendChild(s);
      x.className = " ";
    }

    document.getElementById(id).className = "selected";
    document.getElementById(id).style.backgroundColor = "#b8d7f5";
    // props.selected(id);
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
        >
          <td>
            <a
              style={{
                textDecoration: "none",
                color: "#38B7D3",
              }}
              onClick={() => {
                history.push({
                  pathname: `/automl/projects/${item.name}/models`,
                  state: { detail: `I am ${item.name}` },
                });
              }}
            >
              <p className={styles.titlebold}>{item.name}</p>
            </a>
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
          <td className={styles.status}> {item.no_of_models} </td>
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
            <Space align="center">
              <a
                style={{
                  textDecoration: " none",
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#6d6d6d",
                }}
              >
                <img src={deleteIcon} alt="delete icon"></img>
                <span style={{ fontWeight: "400", fontSize: "12px" }}>
                  Delete
                </span>
              </a>
            </Space>
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
              <th>Model Count</th>
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
