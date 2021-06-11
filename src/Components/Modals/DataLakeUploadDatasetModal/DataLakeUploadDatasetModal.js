/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useState } from "react";
import { Modal, Button } from "antd";
import ShareAvatar from "../../Images/AutoML/shareAvatar.svg";
import "./DataLakeUploadDatasetModal.css";
import closeIcon from "../../Icons/AutoML/closeicon.svg";
import DataLakeDropZone from "../../Dropzone/DataLakeDropZone/DataLakeDropZone";
import { DataLakeFileUploadContext } from "../../../Data/Contexts/DataLakeFileUploadContext/DataLakeFileUploadContext";

export default function DataLakeUploadDatasetModal(props) {
  const { Files, setFiles } = useContext(DataLakeFileUploadContext);

  return (
    <div className="DataLakeUploadDatasetModal">
      <Modal
        width={"50%"}
        wrapClassName="ProjectsModal"
        visible={props.isModalVisible}
        onCancel={props.handleCancel}
        footer={false}
        closable={false}
        bodyStyle={{ borderRadius: "20px" }}
      >
        <div
          style={{
            height: "50px",
            background: "#EFF4F9",
            borderRadius: "20px 20px 0px 0px",
          }}
        >
          <div style={{ display: "flex", padding: "12px", marginLeft: "15px" }}>
            <h2
              style={{
                flexGrow: "1",
                fontWeight: "bold",
                color: "#90A8BE",
                fontSize: "18px",
                fontStyle: "normal",
              }}
            >
              Drop your files here
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
            marginTop: "30px",
            marginLeft: "20px",
            marginRight: "20px",
            flexDirection: "column",
            textAlign: "center",
            paddingBottom: "19px",
          }}
        >
          <DataLakeDropZone setFile={(files) => setFiles(files)} />
          <hr
            style={{
              backgroundColor: "#E2E9EF",
              border: "none",
              height: "1px",
              marginBottom: "20px",
              width: "100%",
            }}
          />
          <div style={{ marginBottom: "19px" }}>
            <Button
              style={{
                width: "120px",
                height: "35px",
                backgroundColor: "white",
                fontFamily: "Lato",
                fontSize: "16px",
                fontWeight: "700",
                color: "#085FAB",
                border: "none",
                borderRadius: "65px",
              }}
              onClick={props.handleCancel}
            >
              Cancel
            </Button>
            <Button
              style={{
                width: "130px",
                height: "35px",
                backgroundColor: "#085FAB",
                fontFamily: "Lato",
                fontSize: "14px",
                fontWeight: "normal",
                letterSpacing: "0.5px",
                color: "white",
                border: "none",
                borderRadius: "65px",
                borderColor: "none",
              }}
              onClick={() => props.handleOK()}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
