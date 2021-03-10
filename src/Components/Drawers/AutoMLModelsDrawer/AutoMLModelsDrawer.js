/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { Button, Drawer } from "antd";
import React, { useState } from "react";
import "./AutoMLModelsDrawer.css";
import { Input } from "antd";
import AutoMLProjectsModelsList from "../../List/AutoMLProjectsModelsList/AutoMLProjectsModelsList";
import editIcon from "../../Icons/AutoML/edit.svg";
import saveIcon from "../../Icons/AutoML/save.svg";
import { useParams } from "react-router-dom";
import ClassificationImage from "../../Images/AutoML/Models/classification_model.svg";
import forecastingImage from "../../Images/AutoML/Models/forecasting_model.svg";
import timeseriesImage from "../../Images/AutoML/Models/timeseries_model.svg";
import regressionImage from "../../Images/AutoML/Models/regression_model.svg";
import fileIcon from "../../Icons/AutoML/fileicon.svg";

export default function AutoMLModelsDrawer(props) {
  let { project_id } = useParams();

  const { TextArea } = Input;
  const [description, setdescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut l abore."
  );
  const [title, settitle] = useState(null);
  const [editable, seteditable] = useState(false);

  if (props.drawervisible === true && title === null) {
    console.log(props.data);
  }

  return (
    <div
      id="AutoMLModelsDrawer"
      // style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <Drawer
        className="drawer"
        placement="right"
        closable={false}
        width={"39%"}
        onClose={() => {
          settitle(null);
          setdescription(null);
          seteditable(false);
          props.onClose();
        }}
        visible={props.drawervisible}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <p
            style={{
              marginTop: "10px",
              marginBottom: "0px",
              fontSize: "12px",
              color: "#085FAB",
            }}
          >
            {project_id}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              fontFamily: "Lato",
              height: "30px",
            }}
          >
            {editable === false ? (
              <h2
                style={{
                  flexGrow: "1",
                  fontSize: "20px",
                  fontWeight: "bold",
                  lineHeight: "24px",
                  fontFamily: "Lato",
                }}
              >
                {title}
              </h2>
            ) : (
              <div style={{ flexGrow: "1" }}>
                <Input
                  value={title}
                  style={{
                    height: "30px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    lineHeight: "24px",
                    fontFamily: "Lato",
                    width: "50%",
                    // borderRadius: "10px",
                    // padding: "10px",
                  }}
                />
              </div>
            )}
            <a
              style={
                editable === true
                  ? {
                      textDecoration: "none",
                      color: "#6d6d6d",
                      marginRight: "23px",
                      fontSize: "14px",
                    }
                  : { display: "none" }
              }
              onClick={() => seteditable(!editable)}
            >
              Discard
            </a>
            <div
              style={
                props.type === "my_projects"
                  ? { cursor: "pointer" }
                  : { display: "none" }
              }
              onClick={() => seteditable(!editable)}
            >
              <img
                src={editable === true ? saveIcon : editIcon}
                alt="edit icon"
                style={{ width: "16px", marginBottom: "2px" }}
              ></img>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  marginLeft: "4px",
                  color: "#6D6D6D",
                  fontFamily: "Lato",
                }}
              >
                {editable === true ? "Save" : " Edit"}
              </span>
            </div>
          </div>
          <div
            style={{ fontFamily: "Lato", fontSize: "12px", color: "#6D6D6D" }}
          >
            Created by:{" "}
            <span style={{ color: "#085FAB", fontWeight: "700" }}>
              -Author-
            </span>
          </div>
          <div
            style={{
              fontWeight: "700",
              fontFamily: "Lato",
              fontSize: "14px",
              marginTop: "15px",
            }}
          >
            Model Description
          </div>
          <div
            style={{ marginTop: "15px", height: "100px", overflowY: "hidden" }}
          >
            <p
              style={
                editable === false
                  ? { fontFamily: "Lato", fontSize: "14px", color: "#6D6D6D" }
                  : { display: "none" }
              }
            >
              {description}
            </p>
            <TextArea
              style={
                editable === true
                  ? { fontFamily: "Lato", fontSize: "14px", color: "#6D6D6D" }
                  : { display: "none" }
              }
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              placeholder="Controlled autosize"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </div>
          <div>
            <div
              style={{
                fontWeight: "700",
                fontFamily: "Lato",
                fontSize: "14px",
                marginTop: "20px",
              }}
            >
              Model Performance
            </div>
            <p
              style={{
                fontFamily: "Lato",
                fontSize: "12px",
                fontStyle: "italic",
                color: "#6d6d6d",
              }}
            >
              Accuracy (in percentage):{" "}
              <span
                style={{
                  fontFamily: "Lato",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: "bold",
                  color: "#085FAB",
                }}
              >
                94
              </span>{" "}
            </p>
          </div>
          <div>
            <div
              style={{
                fontWeight: "700",
                fontFamily: "Lato",
                fontSize: "14px",
                marginTop: "30px",
              }}
            >
              Model Type
            </div>
            <img
              src={ClassificationImage}
              width={140}
              style={{ marginLeft: "-20px" }}
            />
          </div>
          <div style={{ flexGrow: "1" }}>
            <div
              style={{
                fontWeight: "700",
                fontFamily: "Lato",
                fontSize: "14px",
                marginTop: "0px",
              }}
            >
              Dataset Used
            </div>
            <div>
              <div
                style={{
                  height: "40px",
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "#F5FAFF",
                  borderRadius: "10px",
                  padding: "9px",
                }}
              >
                <img src={fileIcon} width={12} style={{ marginLeft: "10px" }} />
                <p
                  style={{
                    flexGrow: "1",
                    margin: "auto",
                    display: "block",
                    paddingLeft: "7px",
                    fontFamily: "Lato",
                    color: "#6d6d6d",
                    fontStyle: "normal",
                  }}
                >
                  Lorem Ipsum
                </p>
                <p
                  style={{
                    margin: "auto",
                    display: "block",
                    fontFamily: "Lato",
                    color: "#6d6d6d",
                    fontStyle: "normal",
                    marginRight: "20px",
                  }}
                >
                  Path
                </p>
              </div>
            </div>
          </div>
          <div style={{ flexGrow: "1" }}></div>
          <Button
            style={{
              width: "140px",
              height: "40px",
              background: "#085FAB",
              borderRadius: "64px",
              fontFamily: "Lato",
              fontSize: "16px",
              fontWeight: "700",
              color: "white",
              letterSpacing: "0.5px",
              marginTop: "30px",
              border: "none",
              paddingBottom: "5px",
            }}
          >
            Predict
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
