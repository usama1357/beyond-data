/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import ShareAvatar from "../../Images/AutoML/shareAvatar.svg";
import "./DataLakeBucketDownloadModal.css";
import closeIcon from "../../Icons/AutoML/closeicon.svg";

export default function DataLakeBucketDownloadModal(props) {
  const [pin, setpin] = useState("");
  const [datasets, setdatasets] = useState(null);
  const [rendered, setrendered] = useState(false);
  const [enable, setenable] = useState(false);

  if (datasets === null && props.datasets) {
    let temp = [];
    if (props.datasets) {
      props.datasets.forEach((item) => {
        let obj = { name: item, checked: true };
        temp.push(obj);
      });
      setenable(true);
      setdatasets(temp);
    }
  }

  const clickcheckbox = (index, val) => {
    let temp = datasets;
    temp[index].checked = !temp[index].checked;
    let found = false;
    temp.forEach((element) => {
      if (element.checked === true) {
        found = true;
      }
    });
    if (found === true) {
      setenable(true);
    } else {
      setenable(false);
    }
    setdatasets(temp);
    setrendered(!rendered);
  };

  return (
    <div className="DataLakeBucketDownloadModal">
      <Modal
        width={"40%"}
        centered
        wrapClassName="ProjectsModal"
        visible={props.isModalVisible}
        onCancel={() => {
          setdatasets(null);
          props.handleCancel();
        }}
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
          <div style={{ display: "flex", padding: "12px", marginLeft: "25px" }}>
            <h2
              style={{
                flexGrow: "1",
                fontWeight: "500",
                color: "#90A8BE",
                fontSize: "18px",
                fontStyle: "normal",
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              src={ShareAvatar}
              style={{
                width: "73px",
                height: "107px",
                display: "block",
                margin: "auto",
                marginLeft: "30px",
                marginRight: "20px",
                marginBottom: "20px",
                marginTop: "0px",
              }}
            />
            <div>
              <h2
                style={{
                  fontFamily: "Lato",
                  fontWeight: "bold",
                  fontSize: "18px",
                  textAlign: "left",
                  fontStyle: "normal",
                }}
              >
                Download Data Bucket
              </h2>
              <p
                style={{
                  padding: "25px",
                  paddingLeft: "0px",
                  paddingTop: "0px",
                  fontFamily: "Lato",
                  fontSize: "13px",
                  fontStyle: "normal",
                  color: "#A1A1A1",
                  textAlign: "left",
                }}
              >
                Select the datasets that you want to download.
              </p>
            </div>
          </div>
          <p
            style={{
              textAlign: "left",
              marginLeft: "30px",
              color: "black",
              fontWeight: "bold",
              fontStyle: "normal",
              marginBottom: "5px",
            }}
          >
            Datasets
          </p>
          <div style={{ height: "15vh", overflow: "scroll" }}>
            {datasets && datasets.length > 0
              ? datasets.map((item, index) => (
                  <div
                    key={index}
                    style={{ textAlign: "left", display: "flex" }}
                  >
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      style={{
                        marginTop: "5px",
                        marginLeft: "30px",
                        marginRight: "10px",
                      }}
                      checked={item.checked}
                      onChange={(e) => clickcheckbox(index, e.target.value)}
                    />
                    <p
                      style={{
                        flexGrow: "1",
                        color: "#6d6d6d",
                        fontWeight: "bold",
                        fontSize: "14px",
                        fontStyle: "normal",
                        marginBottom: "10px",
                      }}
                    >
                      {item.name}
                    </p>
                    {/* <p
                      style={{
                        marginRight: "20px",
                        color: "#6d6d6d",
                        fontWeight: "normal",
                        fontSize: "14px",
                        fontStyle: "normal",
                        marginBottom: "10px",
                      }}
                    >
                      {item.desc}
                    </p> */}
                    <br />
                  </div>
                ))
              : null}
          </div>
          <input
            placeholder="Enter 4 Digits Pin to confirm"
            type="text"
            maxLength={4}
            autoComplete="off"
            value={pin}
            style={{
              width: "50%",
              margin: "auto",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
            onChange={(e) => setpin(e.target.value)}
          />

          <hr
            style={{
              backgroundColor: "#E2E9EF",
              border: "none",
              height: "1px",
              marginBottom: "20px",
              width: "100%",
            }}
          />
          <div style={{ marginBottom: "0px" }}>
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
              onClick={() => {
                setdatasets(null);
                props.handleCancel();
              }}
            >
              Cancel
            </Button>
            <Button
              style={
                enable === true
                  ? {
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
                    }
                  : {
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
                      opacity: "0.3",
                      cursor: "not-allowed",
                    }
              }
              onClick={() => {
                if (enable === true) {
                  props.handleOK(datasets);
                }
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
