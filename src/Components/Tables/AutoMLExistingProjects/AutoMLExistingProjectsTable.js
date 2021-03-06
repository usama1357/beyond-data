/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { Space, Empty, Tooltip, message } from "antd";
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
import { URL } from "../../../Config/config";
import axios from "axios";
import { serialize } from "object-to-formdata";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";
import Cliploader from "../../Loader/Cliploader";
import NoData from "../../NoData/NoData";

export default function AutoMLExistingProjectsTable(props) {
  let history = useHistory();

  const { setProject } = useContext(ProjectContext);
  const { pages, setCurrentPage } = useContext(PageContext);
  const { setModelList, setModelsType } = useContext(ModelContext);
  const [called, setcalled] = useState(false);
  const Auth = useContext(AuthContext);
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(false);

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

  let tempdata = [
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

  useEffect(() => {
    setdata(null);
    let type = "";
    if (props.type === "my_projects") {
      type = "p";
    }
    if (props.type === "downloaded_projects") {
      type = "d";
    }
    if (props.type === "global_projects") {
      type = "s";
    }
    let demo = {
      company_name: "beyond_data",
      company_id: "214",
      user_id: "usama",
    };
    Auth.setAuth(demo);
    async function fetch() {
      const myData = {
        company_id: demo.company_id,
        user_id: demo.user_id,
        space: type,
      };
      console.log(myData);
      const formData = serialize(myData);
      setloading(true);
      await axios({
        method: "post",
        url: `${URL}/automl/load_projects/`,
        data: formData,
        headers: {
          "content-type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      })
        .then(function (response) {
          setloading(false);
          console.log(response);
          setdata(response.data);
        })
        .catch(function (error) {
          setloading(false);
          message.error("Failed to Fetch Projects");
          console.log(error);
        });
    }
    fetch();
  }, [props.type]);

  const selectProject = (index) => {
    if (props.type !== "global_projects") {
      setProject({
        name: data[index].project_name,
        type: props.type,
        desc: data[index].project_desc,
        user: data[index].user_name,
      });
      setCurrentPage("models");
      if (data[index].model_info[0].model_name === null) {
        setModelList(null);
      } else {
        setModelList(data[index].model_info);
      }
      setModelsType(props.type);
      history.push({
        pathname: `/automl/projects/${data[index].project_name}/models`,
        state: {
          detail: `I am ${data[index].project_name}`,
          page_name: "automl_models",
        },
      });
    }
  };

  const getrows = () => {
    if (data !== null && data.length !== undefined) {
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
                <Tooltip title={item.user_name}>
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
                </Tooltip>
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
              <p
                style={{
                  margin: "0px",
                  paddingTop: "3px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  paddingBottom: "3px",
                }}
              >
                {item.project_last_modified.split(",")[0]}
              </p>
              <p style={{ margin: "0px", padding: "0", fontSize: "13px" }}>
                {item.project_last_modified.split(",")[1]}
              </p>
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
                          marginLeft: "8px",
                          fontWeight: "bold",
                          fontSize: "14px",
                          color: "#6d6d6d",
                        }
                  }
                  onClick={() => props.showModal(item)}
                >
                  <img
                    src={
                      props.type === "global_projects"
                        ? downloadIcon
                        : shareIcon
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
                  style={
                    item.user_name === Auth.Auth.user_id ||
                    props.type === "downloaded_projects"
                      ? {
                          textDecoration: " none",
                          fontStyle: "normal",
                          fontWeight: "bold",
                          fontSize: "14px",
                          color: "#6d6d6d",
                        }
                      : {
                          textDecoration: " none",
                          fontStyle: "normal",
                          fontWeight: "bold",
                          fontSize: "14px",
                          color: "#6d6d6d",
                          opacity: "0.3",
                          cursor: "not-allowed",
                        }
                  }
                  onClick={() => {
                    if (props.type === "global_projects") {
                      if (item.user_name === Auth.Auth.user_id) {
                        props.showdelete(index, item);
                      }
                    } else {
                      props.showdelete(index, item);
                    }
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
    }
  };

  return (
    <div className={styles.Container}>
      {data && data.length > 0 ? (
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
        <>
          <NoData text="No Data" />
          {/* <Empty style={{ marginTop: "40px" }} /> */}
          <Cliploader loading={loading} />
        </>
      )}
    </div>
  );
}
