/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Space, Empty } from "antd";
import styles from "./AutoMLExistingProjectsTable.module.scss";
import { useHistory } from "react-router-dom";
import deleteIcon from "../../Icons/AutoML/delete.svg";
import infoIcon from "../../Icons/AutoML/info.svg";
import downloadIcon from "../../Icons/AutoML/download.svg";
import shareIcon from "../../Icons/AutoML/share.svg";

export default function AutoMLExistingProjectsTable(props) {
  let history = useHistory();

  const data = [
    {
      key: "1",
      name: "Trade Prediction",
      no_of_models: 12,
      last_updated: "Monday 21 Dec, 2020",
      description:
        "I am a new project,I am a new project,I am a new ,I am a new project,I am a new projectI am a new project,,I am a new project,",
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

  const getrows = () => {
    return data.map((item, index) => {
      return (
        <tr id={item.key} key={index}>
          <td
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              history.push({
                pathname: `/automl/projects/${item.name}/models`,
                state: { detail: `I am ${item.name}` },
              });
            }}
          >
            <a
              style={{
                textDecoration: "none",
                color: "#38B7D3",
                cursor: "pointer",
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
                  border: "1px solid #38B7D3",
                  height: "25px",
                  fontSize: "10px",
                  padding: "3px",
                }}
              >
                BD
              </span>
            </span>
          </td>
          <td
            onClick={() => {
              history.push({
                pathname: `/automl/projects/${item.name}/models`,
                state: { detail: `I am ${item.name}` },
              });
            }}
            className={styles.description}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              paddingRight: "70px",
              cursor: "pointer",
            }}
          >
            {" "}
            {item.description}{" "}
          </td>
          {/* <td className={styles.status}> {item.no_of_models} </td> */}
          <td
            className={styles.last_updated}
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              history.push({
                pathname: `/automl/projects/${item.name}/models`,
                state: { detail: `I am ${item.name}` },
              });
            }}
          >
            <p className={styles.desc}>{item.last_updated}</p>
          </td>
          <td>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginRight: "20px",
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
                onClick={() => props.showinfo(item.key)}
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
                style={
                  props.type === "downloaded_projects"
                    ? {
                        textDecoration: " none",

                        fontStyle: "normal",
                        cursor: "not-allowed",
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "grey",
                        opacity: "0.4",
                      }
                    : {
                        textDecoration: " none",
                        fontStyle: "normal",

                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#6d6d6d",
                      }
                }
                onClick={() => props.showModal(item.key)}
              >
                <img
                  src={
                    props.type === "global_projects" ? downloadIcon : shareIcon
                  }
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
                  {props.type === "global_projects" ? "Download" : "Share"}
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
