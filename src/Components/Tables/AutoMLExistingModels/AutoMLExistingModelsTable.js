/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { Table, Space, Empty, Button, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styles from "./AutoMLExistingModelsTable.module.scss";
import { useHistory, useParams } from "react-router-dom";
import infoIcon from "../../Icons/AutoML/info.svg";
import deleteIcon from "../../Icons/AutoML/delete.svg";
import { List } from "antd/lib/form/Form";
import { ModelContext } from "../../../Data/Contexts/AutoMLModelContext/AutoMLModelContext";
import { ProjectContext } from "../../../Data/Contexts/AutoMLProject/AutoMLProjectContext";

export default function AutoMLExistingModelTable(props) {
  let history = useHistory();
  let { project_id } = useParams();

  const { Model } = useContext(ModelContext);
  const { Project } = useContext(ProjectContext);

  // var tds = document.getElementsByTagName("td");
  // for (var i = 0; i < tds.length; i++) {
  //   tds[i].onmouseover = function () {
  //     this.parentNode.style.background = "#ff0000";
  //   };
  //   tds[i].onmouseout = function () {
  //     this.parentNode.style.backgroundColor = "#fff";
  //   };
  // }

  const removed = [
    {
      key: "1",
      name: "Stock Prediction",
      accuracy: 12,
      state: "In Progress",
      description: "I am a Model",
      status: "New",
      last_updated: "Monday 21 Dec, 2020",
    },
    {
      key: "2",
      name: "Stock Prediction",
      accuracy: 72,
      state: "Training",
      description: "I am a Model",
      status: "Updated",
      last_updated: "Monday 21 Dec, 2020",
    },
    {
      key: "3",
      name: "Stock Prediction",
      accuracy: 52,
      state: "Training",
      description: "I am a Model",
      status: "Update Available",
      last_updated: "Monday 21 Dec, 2020",
    },
    {
      key: "4",
      name: "Stock Prediction",
      rma: 12,
      accuracy: 72,
      state: "Deployed",
      description: "I am a Model",
      status: "New",
      last_updated: "Monday 21 Dec, 2020",
    },
    {
      key: "5",
      name: "Stock Prediction",
      accuracy: 72,
      state: "In Progress",
      description: "I am a Model",
      status: "New",
      last_updated: "Monday 21 Dec, 2020",
    },
  ];

  let data = Model.allmodels;

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
      y.style.color = "#6D6d6d";
    }
    document.getElementById(id).className = "selected";
    document.getElementById(id).style.backgroundColor = "#e1eeff";
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
        document.getElementById(index).style.backgroundColor = "#e1eeff";
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
          id={index}
          key={index}
          onClick={() => {
            rowclick(index);
            // props.selected(item.key);
          }}
          onMouseOver={() => Hoverover(index)}
          onMouseLeave={() => Hovercancel(index)}
        >
          <td>
            <p className={styles.titlebold}>{item.model_name}</p>
            <span className={styles.subtitle}>
              Created by:{" "}
              <span
                className={styles.author}
                style={{
                  backgroundColor: "#B8F2FF",
                  color: "#38B7D3",
                  fontWeight: "normal",
                  borderRadius: "50%",
                  border: "1px solid #38B7D3",
                  height: "25px",
                  fontSize: "10px",
                  padding: "3px",
                }}
              >
                {Project.user}
              </span>
            </span>
          </td>
          <td
            className={styles.description}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              paddingRight: "70px",
            }}
          >
            {" "}
            {item.model_desc}{" "}
          </td>
          <td>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "normal",
                color: "#6d6d6d",
                fontFamily: "Lato",
              }}
            >
              Accuracy:{" "}
              {
                <span style={{ fontWeight: "700" }}>
                  {item.model_performance}
                </span>
              }
            </div>
            <div
              style={
                item.state === "In Progress"
                  ? { fontSize: "14px", color: "#A3A3A3" }
                  : item.state === "Training"
                  ? { fontSize: "14px", color: "#E15100 " }
                  : { color: "#1DDFA9", fontSize: "14px" }
              }
            >
              {item.model_status}
            </div>
          </td>
          <td className={styles.model_last_modified}>
            <p className={styles.desc}>{item.model_last_modified}</p>
          </td>
          <td>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginRight: "40px",
              }}
            >
              <a
                style={{
                  textDecoration: " none",
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#6d6d6d",
                }}
                onClick={() => props.showinfo(item.key, item)}
              >
                <img
                  src={infoIcon}
                  alt="delete icon"
                  style={{ width: "16px" }}
                ></img>
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "12px",
                    marginLeft: "4px",
                  }}
                >
                  Info
                </span>
              </a>
              <a
                style={{
                  textDecoration: " none",
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#6d6d6d",
                }}
                onClick={() => props.showdelete(index, item)}
              >
                <img
                  src={deleteIcon}
                  alt="delete icon"
                  style={{ width: "16px" }}
                ></img>
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "12px",
                    marginLeft: "4px",
                  }}
                >
                  Delete
                </span>
              </a>
            </div>
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
              <th>Last Updated</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>{getrows()}</tbody>
        </table>
      ) : (
        <Empty style={{ marginTop: "20px" }} />
      )}
    </div>
  );
}
