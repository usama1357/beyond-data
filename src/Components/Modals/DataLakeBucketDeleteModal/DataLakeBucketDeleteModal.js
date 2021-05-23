/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import deleteAvatar from "../../Images/AutoML/deleteAvatar.svg";
import "./DataLakeBucketDeleteModal.css";
import closeIcon from "../../Icons/AutoML/closeicon.svg";
import datasetIcon from "../../Icons/DataLake/datasetUse.svg";

export default function DataLakeBucketDeleteModal(props) {
  const [pin, setpin] = useState("");
  const [datasets, setdatasets] = useState(null);
  const [rendered, setrendered] = useState(false);

  if (datasets === null) {
    let temp = [];
    props.data.datasets.map((item) => {
      let obj = { name: item.name, desc: item.desc, checked: true };
      temp.push(obj);
    });
    setdatasets(temp);
  }

  const clickcheckbox = (index, val) => {
    let temp = datasets;
    temp[index].checked = !temp[index].checked;
    setdatasets(temp);
    setrendered(!rendered);
  };

  return (
    <div className="DataLakeBucketDeleteModal">
      <Modal
        width={"40%"}
        centered
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
            background: "#EC547A",
            borderRadius: "20px 20px 0px 0px",
          }}
        >
          <div style={{ display: "flex", padding: "12px", marginLeft: "35px" }}>
            <h2
              style={{
                flexGrow: "1",
                fontWeight: "500",
                color: "white",
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
                color: "white",
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
              src={deleteAvatar}
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
                Delete Data Bucket
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
                Deleting this Data Bucket will result in deletion of all the
                following Datasets. Unselect the model which you intend to save.{" "}
                <br />
                <div style={{ marginTop: "5px" }}>
                  <img alt={"Text"} src={datasetIcon} width={20} />{" "}
                  <span style={{ fontWeight: "bold" }}>
                    Datasets in use by another model.
                  </span>
                </div>
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
                    <img
                      alt={"Text"}
                      src={datasetIcon}
                      width={20}
                      style={{
                        marginBottom: "5px",
                        marginRight: "15px",
                        marginLeft: "6px",
                      }}
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
                    <p
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
                    </p>
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
            style={{ width: "50%", margin: "auto" }}
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
          <div style={{ marginBottom: "19px" }}>
            <Button
              style={{
                width: "120px",
                height: "35px",
                backgroundColor: "white",
                fontFamily: "Lato",
                fontSize: "16px",
                fontWeight: "700",
                color: "black",
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
                backgroundColor: "#EC547A",
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
