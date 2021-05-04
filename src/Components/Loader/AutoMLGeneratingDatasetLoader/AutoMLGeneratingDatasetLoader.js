/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Modal, Button } from "antd";
import ShareAvatar from "../../Images/AutoML/generatedatasetrobot.svg";
import "./styles.css";
import closeIcon from "../../Icons/AutoML/closeicon.svg";

export default function AutoMLGeneratingDatasetLoader(props) {
  return (
    <div className="AutoMLGeneratingDatasetLoader">
      <Modal
        width={332}
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
          <div style={{ display: "flex", padding: "12px", marginLeft: "20px" }}>
            <h2
              style={{
                flexGrow: "1",
                fontWeight: "bold",
                color: "#90A8BE",
                fontSize: "18px",
                fontStyle: "Lato",
              }}
            >
              Generating Dataset
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
            flexDirection: "column",
            textAlign: "center",
            paddingBottom: "19px",
          }}
        >
          <img
            className="shareAvatar"
            src={ShareAvatar}
            style={{
              width: "73px",
              height: "107px",
              display: "block",
              margin: "auto",
              marginBottom: "10px",
            }}
          />
          <h2
            style={{ fontFamily: "Lato", fontWeight: "bold", fontSize: "18px" }}
          >
            This may take a while
          </h2>
          <p
            style={{
              padding: "10px",
              paddingTop: "10px",
              fontFamily: "Lato",
              fontSize: "13px",
              fontWeight: "normal",
              color: "#6d6d6d",
            }}
          >
            We have sent your request to generate the Dataset! Based on the size
            of your data, it could take some time while processing. <br />
            <span style={{ fontWeight: "bold", color: "#6d6d6d" }}>
              We will let you know once your Dataset is generated
            </span>
          </p>
        </div>
      </Modal>
    </div>
  );
}
