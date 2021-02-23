/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Modal, Button } from "antd";
import ShareAvatar from "../../Images/AutoML/shareAvatar.svg";
import "./AutoMLProjectShareModal.css";
import closeIcon from "../../Icons/AutoML/closeicon.svg";

export default function AutoMLProjectShareModal(props) {
  return (
    <div className="AutoMLProjectShareModal">
      <Modal
        width={332}
        wrapClassName="ProjectsModal"
        visible={props.isModalVisible}
        onOk={props.handleOk}
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
          <div style={{ display: "flex", padding: "12px", marginLeft: "35px" }}>
            <h2
              style={{
                flexGrow: "1",
                fontWeight: "500",
                color: "#90A8BE",
                fontSize: "18px",
                fontStyle: "Lato",
              }}
            >
              Are you Sure?
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
            Make Global Public?
          </h2>
          <p
            style={{
              padding: "25px",
              paddingTop: "10px",
              fontFamily: "Lato",
              fontSize: "13px",
              fontStyle: "normal",
              color: "#A1A1A1",
            }}
          >
            Making this project ‘Global Public’ would in turn make all the
            models inside this project, Public as well. Are you sure you want to
            proceed?
          </p>
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
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
