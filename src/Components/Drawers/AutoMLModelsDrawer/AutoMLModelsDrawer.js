/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { Button, Drawer, message } from "antd";
import React, { useContext, useState } from "react";
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
import { URL } from "../../../Config/config";
import axios from "axios";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";

export default function AutoMLModelsDrawer(props) {
  let { project_id } = useParams();

  const { TextArea } = Input;
  const [description, setdescription] = useState(null);
  const [title, settitle] = useState(null);
  const [editabledescription, seteditabledescription] = useState(null);
  const [editabletitle, seteditabletitle] = useState(null);
  const [editable, seteditable] = useState(false);

  const { Auth } = useContext(AuthContext);

  if (props.drawervisible === true && title === null) {
    settitle(props.data.model_name);
    setdescription(props.data.model_desc);
    seteditabletitle(props.data.model_name);
    seteditabledescription(props.data.model_desc);
  }

  const renamemodel = async () => {
    if (editable) {
      if (title !== editabletitle) {
        await axios
          .post(`${URL}/automl/edit_model/`, {
            company_name: Auth.company_name,
            company_id: Auth.company_id,
            user_id: Auth.user_id,
            project_name: project_id,
            model_name: title,
            update: {
              model_name: editabletitle,
              model_desc: editabledescription,
            },
          })
          .then(function (response) {
            message.success("Renamed Successfully");
            console.log(response);
            settitle(editabletitle);
            setdescription(editabledescription);
          })
          .catch(function (error) {
            message.error("Sorry there seems to be an issue");
            console.log(error);
          });
      } else if (description !== editabledescription) {
        await axios
          .post(`${URL}/automl/edit_model/`, {
            company_name: Auth.company_name,
            company_id: Auth.company_id,
            user_id: Auth.user_id,
            project_name: project_id,
            model_name: title,
            update: { model_desc: editabledescription },
          })
          .then(function (response) {
            message.success("Renamed Successfully");
            console.log(response);
            setdescription(editabledescription);
          })
          .catch(function (error) {
            message.error("Sorry there seems to be an issue");
            console.log(error);
          });
      }
    }
  };

  return props.data ? (
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
                  value={editabletitle}
                  style={{
                    height: "30px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    lineHeight: "24px",
                    fontFamily: "Lato",
                    width: "70%",
                    // borderRadius: "10px",
                    // padding: "10px",
                  }}
                  onChange={(e) => seteditabletitle(e.target.value)}
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
              onClick={() => {
                seteditabletitle(title);
                seteditabledescription(description);
                seteditable(!editable);
              }}
            >
              Discard
            </a>
            <div
              style={
                props.type === "my_projects"
                  ? { cursor: "pointer" }
                  : { display: "none" }
              }
              onClick={() => {
                renamemodel();
                seteditable(!editable);
              }}
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
            <span style={{ color: "#085FAB", fontWeight: "700" }}>Author</span>
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
              value={editabledescription}
              onChange={(e) => seteditabledescription(e.target.value)}
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
                {props.data.model_performance}
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
            {/* <img
              src={ClassificationImage}
              width={140}
              style={{ marginLeft: "-20px" }}
            /> */}
            <br />
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
                  {props.data.dataset_name}
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
                  {props.data.dataset_path}
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
  ) : null;
}
