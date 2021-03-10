/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useState } from "react";
import { Modal, Button, Row, Col } from "antd";
import ShareAvatar from "../../Images/AutoML/shareAvatar.svg";
import "./styles.css";
import closeIcon from "../../Icons/AutoML/closeicon.svg";
import AutoMLExistingDatabucketCard from "../../Cards/AutoMLExistingDatabucketCard/AutoMLExistingDatabucketCard";
import fileIcon from "../../Icons/AutoML/SaveDatabucket/fileicon.svg";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import dataBucket from "../../Icons/AutoML/SaveDatabucket/databucket.svg";
import { PageContext } from "../../../Data/Contexts/AutoMLPageState/AutoMLPageStateContext";

export default function AutoMLSaveDatasetModal(props) {
  const [selected, setselected] = useState(null);
  let { project_id, model_id } = useParams();
  const [newdatabucket, setnewdatabucket] = useState(false);
  const [newdatabucketname, setnewdatabucketname] = useState("");

  let history = useHistory();
  const { setCurrentPage } = useContext(PageContext);

  const savedataset = () => {
    setCurrentPage("metascreen");
    history.push({
      pathname: `/automl/projects/${project_id}/models/${model_id}/customised_dataset/`,
      state: {
        detail: "I am from New link page",
        page_name: "automl_customised_datasets",
      },
    });
  };

  const savedatasetapi = () => {
    if (newdatabucketname === "") {
      setnewdatabucket(false);
    }
  };

  let databuckets = [
    {
      name: "Oil and Gas",
      datasets: [
        "Oil and Gas Refinery",
        "Oil and Gas Exploration",
        "Oil and Gas Exploration",
      ],
    },
    {
      name: "Cement",
      datasets: ["Cement Refinery", "Cement Exploration", "Cement Exploration"],
    },
    {
      name: "Banks",
      datasets: ["HBL", "AL-Falah", "Habib Bank", "Summit Bank", "UBL"],
    },
    {
      name: "Fertilizer",
      datasets: ["ETC", "BCD", "ABC", "PPL", "FFC"],
    },
    {
      name: "Automobile",
      datasets: ["Indus Motors", "Toyota", "Kia", "Hyundai", "Suzuki"],
    },
  ];

  return (
    <div className="AutoMLSaveDatasetModal">
      <Modal
        width={"80%"}
        style={{ top: 20 }}
        wrapClassName="DatasetsModal"
        visible={props.isModalVisible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={false}
        closable={false}
        destroyOnClose
        bodyStyle={{ borderRadius: "20px" }}
      >
        <div
          style={{
            height: "50px",
            background: "white",
            borderRadius: "20px 20px 0px 0px",
          }}
        >
          <div style={{ display: "flex", padding: "12px", marginLeft: "0px" }}>
            <h2
              style={{
                flexGrow: "1",
                fontWeight: "bold",
                color: "black",
                fontSize: "18px",
              }}
            >
              Save Dataset
            </h2>
            <img
              onClick={props.handleCancel}
              src={closeIcon}
              style={{
                paddingBottom: "10px",
                paddingRight: "15px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: "100%",
            marginTop: "30px",
            flexDirection: "column",
            textAlign: "left",
            paddingBottom: "19px",
          }}
        >
          <Row
            justify="space-between"
            style={{
              flexGrow: "1",
              marginBottom: "20px",
              height: "40vh",
            }}
          >
            <Col
              style={{
                backgroundColor: "#F5FAFF",
                padding: "20px",
                borderRadius: "18px",
                width: "49%",
              }}
            >
              <h3 className="ModalHeading">Data Buckets</h3>

              {databuckets.map((item, index) => (
                <AutoMLExistingDatabucketCard
                  key={index}
                  name={item.name}
                  id={index}
                  highlight={selected}
                  selected={(id) => setselected(id)}
                />
              ))}
              <div
                className="newdatasetbutton"
                style={{
                  display: "inline-block",
                  marginRight: "10px",
                  marginBottom: "10px",
                }}
              >
                {newdatabucket === false ? (
                  <Button
                    style={{
                      width: "100px",
                      height: "60px",
                      top: "10px",
                      borderColor: "#085FAB",
                      borderRadius: "10px",
                      backgroundColor: "inherit",
                    }}
                    onClick={() => setnewdatabucket(true)}
                    type="dashed"
                    icon={
                      <PlusOutlined
                        style={{
                          fontSize: "30px",
                          fontWeight: "700",
                          color: "#085FAB",
                          paddingTop: "5px",
                        }}
                      />
                    }
                  ></Button>
                ) : (
                  <div className="newdatabucket">
                    <div
                      className="box"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                        borderRadius: "10px",
                        height: "60px",
                        width: "100px",
                        border: "1px solid #085fab",
                        boxSizing: "border-box",
                        paddingBottom: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={dataBucket}
                        alt={"Data-bucket"}
                        style={{
                          width: "25px",
                          display: "block",
                          margin: "auto",
                        }}
                      />
                      <input
                        style={{
                          height: "15px",
                          padding: "0px",
                          margin: "0",
                          paddingLeft: "10px",
                        }}
                        onBlur={() => savedatasetapi()}
                        value={newdatabucketname}
                        onChange={(e) => setnewdatabucketname(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>
                )}
              </div>
            </Col>
            <Col
              style={{
                backgroundColor: "#F5FAFF",
                padding: "20px",
                borderRadius: "18px",
                width: "49%",
              }}
            >
              <h3 className="ModalHeading" style={{ marginBottom: "10px" }}>
                {selected !== null ? databuckets[selected].name : "Datasets"}
              </h3>
              {selected !== null
                ? databuckets[selected].datasets.map((item, index) => (
                    <div style={{ marginBottom: "12px" }}>
                      <img
                        src={fileIcon}
                        alt="FileIcon"
                        style={{ marginRight: "10px" }}
                      />
                      <div
                        style={{
                          fontWeight: "normal",
                          display: "inline-block",
                        }}
                      >
                        {item}
                      </div>
                    </div>
                  ))
                : null}
              <div></div>
            </Col>
          </Row>
          <label htmlFor="dname">Dataset Name</label>
          <input
            type="text"
            id="dname"
            name="dname"
            placeholder="Enter dataset name..."
          ></input>
          <label htmlFor="ddesc">
            Dataset Description
            <span
              style={{
                fontSize: "14px",
                fontWeight: "normal",
                color: "#90A8BE",
                fontStyle: "italic",
              }}
            >
              {" "}
              (optional)
            </span>{" "}
          </label>
          <input
            type="text"
            id="ddesc"
            name="ddesc"
            placeholder="Enter dataset description..."
          ></input>
          <br />
          <div style={{ marginBottom: "5px" }}>
            <Button
              style={{
                width: "130px",
                height: "40px",
                backgroundColor: "#085FAB",
                fontFamily: "Lato",
                fontSize: "16px",
                fontWeight: "bold",
                letterSpacing: "1.5px",
                color: "white",
                border: "none",
                borderRadius: "65px",
                borderColor: "none",
              }}
              onClick={() => savedataset()}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
