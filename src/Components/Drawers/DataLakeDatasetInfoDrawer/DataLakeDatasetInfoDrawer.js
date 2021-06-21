/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { Button, Drawer, message } from "antd";
import React, { useContext, useState } from "react";
import "./DataLakeDatasetInfoDrawer.css";
import { Input } from "antd";
import AutoMLProjectsModelsList from "../../List/AutoMLProjectsModelsList/AutoMLProjectsModelsList";
import editIcon from "../../Icons/AutoML/edit.svg";
import saveIcon from "../../Icons/DataLake/saveIcon.svg";
import { ProjectContext } from "../../../Data/Contexts/AutoMLProject/AutoMLProjectContext";
import { PageContext } from "../../../Data/Contexts/AutoMLPageState/AutoMLPageStateContext";
import { ModelContext } from "../../../Data/Contexts/AutoMLModelContext/AutoMLModelContext";
import { useHistory } from "react-router-dom";
import { URL } from "../../../Config/config";
import axios from "axios";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";
import blackDatasetIcon from "../../Icons/DataLake/datasetBlackIcon.svg";
import bucketIcon from "../../Icons/DataLake/bucketIcon.svg";
import { DataLakeBucketContext } from "../../../Data/Contexts/DataLake/DataLakeBucketContext/DataLakeBucketContext";
import Cliploader from "../../Loader/Cliploader";

export default function DataLakeDatasetInfoDrawer(props) {
  const { TextArea } = Input;

  const [description, setdescription] = useState(null);
  const [title, settitle] = useState(null);
  const [editabledescription, seteditabledescription] = useState(null);
  const [editabletitle, seteditabletitle] = useState(null);
  const [loading, setloading] = useState(false);

  const [editable, seteditable] = useState(false);

  const { Auth } = useContext(AuthContext);
  const { Bucket } = useContext(DataLakeBucketContext);

  if (props.drawervisible === true && title === null) {
    settitle(props.data.name);
    setdescription(props.data.description);
    seteditabletitle(props.data.name);
    seteditabledescription(props.data.description);
  }

  const renameproject = async () => {
    if (editable === true) {
      if (title !== editabletitle || description !== editabledescription) {
        let updated = {};
        if (title !== editabletitle && description === editabledescription) {
          updated = {
            dataset_name: editabletitle.includes(".csv")
              ? editabletitle
              : `${editabletitle}.csv`,
          };
        } else if (
          title === editabletitle &&
          description !== editabledescription
        ) {
          updated = { dataset_desc: editabledescription };
        } else if (
          title !== editabletitle &&
          description !== editabledescription
        ) {
          updated = {
            dataset_name: editabletitle.includes(".csv")
              ? editabletitle
              : `${editabletitle}.csv`,
            dataset_desc: editabledescription,
          };
        }
        setloading(true);
        let obj = {
          company_id: Auth.company_id,
          user_id: Auth.user_id,
          company_name: Auth.company_name,
          databucket_name: Bucket.bucket.name,
          dataset_name: props.data.name,
          update: updated,
        };
        console.log(obj);
        await axios({
          method: "post",
          url: `${URL}/automl/edit_dataset/`,
          data: {
            company_id: Auth.company_id,
            user_id: Auth.user_id,
            company_name: Auth.company_name,
            databucket_name: Bucket.bucket.name,
            dataset_name: props.data.name,
            update: updated,
          },
        })
          .then(function (response) {
            setloading(false);
            console.log(response);
            if (response.data === "Updated") {
              settitle(
                editabletitle.includes(".csv")
                  ? editabletitle
                  : `${editabletitle}.csv`
              );
              setdescription(editabledescription);
              props.recallAPI();
            }
          })
          .catch(function (error) {
            setloading(false);
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              message.error(error.response.data, 3);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
            }
          });
      }
    }
  };

  return props.data ? (
    <div
      id="DataLakeDatasetInfoDrawer"
      // style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <Cliploader loading={loading} />
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
          style={{
            display: "block",
            fontsize: "12px",
            marginTop: "30px",
            color: "#085fab",
          }}
        >
          <img
            src={bucketIcon}
            alt="icon"
            width={14}
            style={{ marginRight: "5px", marginBottom: "2px" }}
          />
          Bucket Name
        </div>
        <div
          className="DataLakeDatasetInfoDrawer"
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
              <img
                src={blackDatasetIcon}
                alt={"Text"}
                width={16}
                style={{ marginBottom: "3px", marginRight: "3px" }}
              />{" "}
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
                  width: "50%",
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
              Bucket.type === "My Data"
                ? { cursor: "pointer" }
                : { display: "none" }
            }
            onClick={() => {
              renameproject();
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
        <div style={{ fontFamily: "Lato", fontSize: "12px", color: "#6D6D6D" }}>
          Created by:{" "}
          <span style={{ color: "#085FAB", fontWeight: "700" }}>
            {props.data.created_by}
          </span>
        </div>
        <div
          style={{
            fontWeight: "700",
            fontFamily: "Lato",
            fontSize: "14px",
            marginTop: "30px",
            color: "black",
          }}
        >
          Dataset Description
        </div>
        <div
          style={{ marginTop: "15px", height: "100px" }}
          className="DataLakeDatasetInfoDrawer"
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
            maxLength={300}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
        <div>
          <div
            style={{
              fontWeight: "700",
              fontFamily: "Lato",
              fontSize: "14px",
              marginTop: "30px",
              color: "black",
            }}
          >
            Previously Used in Trained Models
          </div>
          {/* <div style={{ height: "40vh", overflowY: "scroll" }}>
            <AutoMLProjectsModelsList data={props.data.model_info} />
          </div> */}
          <div
            style={{
              fontWeight: "700",
              fontFamily: "Lato",
              fontSize: "14px",
              marginTop: "30px",
              color: "black",
            }}
          >
            Used in Reports
          </div>
        </div>
      </Drawer>
    </div>
  ) : null;
}
