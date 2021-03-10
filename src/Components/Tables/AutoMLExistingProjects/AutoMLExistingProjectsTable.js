/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { Space, Empty } from "antd";
import styles from "./AutoMLExistingProjectsTable.module.scss";
import { useHistory } from "react-router-dom";
import deleteIcon from "../../Icons/AutoML/delete.svg";
import infoIcon from "../../Icons/AutoML/info.svg";
import downloadIcon from "../../Icons/AutoML/download.svg";
import shareIcon from "../../Icons/AutoML/share.svg";
import "../tables.css";
import { ProjectContext } from "../../../Data/Contexts/AutoMLProject/AutoMLProjectContext";
import { PageContext } from "../../../Data/Contexts/AutoMLPageState/AutoMLPageStateContext";
import { ModelContext } from "../../../Data/Contexts/AutoMLModelContext/AutoMLModelContext";

export default function AutoMLExistingProjectsTable(props) {
  let history = useHistory();
  const { setProject } = useContext(ProjectContext);
  const { pages, setCurrentPage } = useContext(PageContext);
  const { setModelList, setModelsType } = useContext(ModelContext);

  const removed = [
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
      name: "Stock Prediction",
      no_of_models: 12,
      last_updated: "Monday 21 Dec, 2020",
      description: "I am a new project",
    },
    {
      key: "3",
      name: "Cash Prediction",
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

  let data = [
    {
      user_name: "101",
      project_name: "project_1",
      project_desc: "dummy project",
      project_last_modified: "03/09/2021, 13:41:12",
      model_info: [
        {
          model_name: "model_3",
          model_last_modified: "03/09/2021, 12:42:25",
          model_desc: "dummy model",
          model_type: null,
          model_status: null,
          model_performance: null,
          databucket_name: "databucket_2",
          dataset_name: "dataset_1",
          dataset_path: "my_datasets\\databucket_2\\dataset_1.csv",
        },
        {
          model_name: "model_2",
          model_last_modified: "03/09/2021, 12:42:21",
          model_desc: "dummy model",
          model_type: null,
          model_status: null,
          model_performance: null,
          databucket_name: "databucket_1",
          dataset_name: "dataset_1",
          dataset_path: "my_datasets\\databucket_1\\dataset_1.csv",
        },
      ],
    },
    {
      user_name: "102",
      project_name: "project_2",
      project_desc: "dummy project2",
      project_last_modified: "03/07/2021, 13:41:12",
      model_info: [
        {
          model_name: "model_4",
          model_last_modified: "03/09/2021, 12:42:25",
          model_desc: "dummy model",
          model_type: null,
          model_status: null,
          model_performance: null,
          databucket_name: "databucket_2",
          dataset_name: "dataset_1",
          dataset_path: "my_datasets\\databucket_2\\dataset_1.csv",
        },
        {
          model_name: "model_5",
          model_last_modified: "03/09/2021, 12:42:21",
          model_desc: "dummy model",
          model_type: null,
          model_status: null,
          model_performance: null,
          databucket_name: "databucket_1",
          dataset_name: "dataset_1",
          dataset_path: "my_datasets\\databucket_1\\dataset_1.csv",
        },
      ],
    },
  ];

  const selectProject = (index) => {
    setProject({
      name: data[index].project_name,
      type: props.type,
      desc: data[index].project_desc,
      user: data[index].user_name,
    });
    setCurrentPage("models");
    setModelList(data[index].model_info);
    setModelsType(props.type);
    history.push({
      pathname: `/automl/projects/${data[index].project_name}/models`,
      state: {
        detail: `I am ${data[index].project_name}`,
        page_name: "automl_models",
      },
    });
  };

  const getrows = () => {
    return data.map((item, index) => {
      return (
        <tr id={item.key} key={index}>
          <td
            style={{
              cursor: "pointer",
            }}
            onClick={() => selectProject(index)}
          >
            <a
              style={{
                textDecoration: "none",
                color: "#38B7D3",
                cursor: "pointer",
              }}
              onClick={() => selectProject(index)}
            >
              <p className={styles.titlebold}>{item.project_name}</p>
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
                {item.user_name}
              </span>
            </span>
          </td>
          <td
            onClick={() => selectProject(index)}
            className={styles.description}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              paddingRight: "70px",
              cursor: "pointer",
            }}
          >
            {" "}
            {item.project_desc}{" "}
          </td>
          {/* <td className={styles.status}> {item.no_of_models} </td> */}
          <td
            className={styles.last_updated}
            style={{
              cursor: "pointer",
            }}
            onClick={() => selectProject(index)}
          >
            <p className={styles.desc}>{item.project_last_modified}</p>
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
                onClick={() => props.showdelete(index)}
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
        <table className={styles.datatable} id="DataTable">
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
