import { Button, Col, message, Row } from "antd";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { PageContext } from "../../../Data/Contexts/AutoMLPageState/AutoMLPageStateContext";
import styles from "./AutoMLPredictModel.module.scss";
import "./styles.css";
import downloadIcon from "../../../Components/Icons/AutoML/download.svg";
import AutoMLDropZone from "../../../Components/Dropzone/AutoMLDropZone";
import { ModelContext } from "../../../Data/Contexts/AutoMLModelContext/AutoMLModelContext";

export default function PredictModel(props) {
  let { project_id, model_id } = useParams();
  const [loading, setloading] = useState(false);
  const [type, settype] = useState("batch");

  const { Model } = useContext(ModelContext);

  let row = ["Customer ID", "Customer Name", "Dept Name", "Price"];

  const { setCurrentPage } = useContext(PageContext);

  const NextPage = () => {
    // props.history.push({
    //   pathname: `/automl/projects/${project_id}/models/${Model.model.name}/predict_model/feature_selection/`,
    //   state: { detail: "I am from Models page" },
    // });
    message.success("Start Prediction");
  };

  const downloadtemplate = () => {
    let content = row.toString();
    content.concat("\n");
    let csvContent = "data:text/csv;charset=utf-8," + content;
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
  };

  return (
    <Row
      justify="space-between"
      className={styles.container}
      id="SelectedDatasets"
    >
      <Col span={17} className={styles.column1}>
        <h3 className={styles.titleBold}>
          {project_id} | <span className={styles.subtitle}>{model_id}</span>
        </h3>
        <h3
          style={{
            textAlign: "left",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "0px",
          }}
        >
          Predict
        </h3>
        <hr
          style={{
            width: "100%",
            backgroundColor: "#E1EEFF",
            border: "none",
            height: "1px",
            marginBottom: "0px",
          }}
        />
        <div
          style={{ flexGrow: "1", overflow: "scroll", paddingRight: "10px" }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "#085fab",
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "5px",
              cursor: "pointer",
              width: "fit-content",
            }}
            onClick={() => downloadtemplate()}
          >
            <img
              src={downloadIcon}
              alt="Download Icon"
              width={14}
              style={{ marginTop: "-5px", marginRight: "7px" }}
            />
            Download template
          </p>
          <ul className="custom_row">
            {row.map((d, index) => (
              <li
                key={index}
                className={"listitem"}
                style={{ display: "inline-block" }}
              >
                {d}
              </li>
            ))}
          </ul>
          <h2
            style={{
              textAlign: "left",
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "5px",
              marginTop: "15px",
            }}
          >
            Upload Dataset
          </h2>
          <div style={{ marginBottom: "8px" }}>
            <input
              type="radio"
              id="batch"
              value="batch"
              className="radio"
              checked={type === "batch" ? true : false}
              onChange={(e) => settype(e.target.value)}
              style={{ marginTop: "-5px", height: "11px" }}
            />
            <label
              htmlFor="batch"
              className="label"
              style={{
                fontSize: "14px",
                color: "#6d6d6d",
                paddingLeft: "10px",
              }}
            >
              Batch Prediction
            </label>
            <input
              type="radio"
              id="single"
              value="single"
              onChange={(e) => settype(e.target.value)}
              className="radio"
              checked={type === "single" ? true : false}
              style={{ marginTop: "-5px", height: "11px", marginLeft: "30px" }}
            />
            <label
              htmlFor="single"
              className="label"
              style={{
                fontSize: "14px",
                color: "#6d6d6d",
                paddingLeft: "10px",
              }}
            >
              Single Prediction
            </label>
          </div>
          {type === "batch" ? (
            <AutoMLDropZone />
          ) : (
            <table className="predictiontable">
              <thead>
                <tr>
                  {row.map((item, index) => (
                    <th>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {row.map((item, index) => (
                    <td key={index}>
                      <input className="input" />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <Button className={styles.linkcolbutton} onClick={() => NextPage()}>
          Predict
        </Button>
      </Col>
      <Col span={7} className={styles.column2}>
        <h3 className={styles.titleBold}>Instructions</h3>
        <div
          style={{
            flexGrow: "1",
            overflowY: "scroll",
            paddingRight: "0px",
            textAlign: "left",
            color: "#6D6D6D",
            fontSize: "14px",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
      </Col>
    </Row>
  );
}
