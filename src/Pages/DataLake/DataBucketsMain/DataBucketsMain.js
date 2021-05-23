/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import blueIcon from "../../../Components/Icons/DataLake/lightblueKey.svg";
import darkBlueIcon from "../../../Components/Icons/DataLake/darkblueKey.svg";
import questionIcon from "../../../Components/Icons/DataLake/QuestionIcon.svg";
import DataLakeTitle from "../../../Components/Icons/DataLake/DataLakeTitle.svg";
import uploadIcon from "../../../Components/Icons/DataLake/upload.svg";
import newBucketIcon from "../../../Components/Icons/DataLake/newDatabucket.svg";
import { Button, Col, Input, Popover, Row } from "antd";
import "./styles.css";
import editIcon from "../../../Components/Icons/AutoML/edit.svg";
import saveIcon from "../../../Components/Icons/AutoML/save.svg";
import shareIcon from "../../../Components/Icons/AutoML/share.svg";
import deleteIcon from "../../../Components/Icons/AutoML/delete.svg";
import downloadIcon from "../../../Components/Icons/AutoML/download.svg";
import TextArea from "antd/lib/input/TextArea";
import CustomTabs from "../../../Components/Tabs/CustomTabs/CustomTabs";
import DataLakeSpaceGraph from "../../../Components/Graphs/DataLakeSpaceGraph/DataLakeSpaceGraph";
import DataLakeDatabucketstable from "../../../Components/Tables/DataLakeDatabucketstable/DataLakeDatabucketstable";
import DataLakeBucketShareModal from "../../../Components/Modals/DataLakeBucketShareModal/DataLakeBucketShareModal";
import DataLakeNewBucketModal from "../../../Components/Modals/DataLakeNewBucketModal/DataLakeNewBucketModal";
import DataLakeUploadDatasetModal from "../../../Components/Modals/DataLakeUploadDatasetModal/DataLakeUploadDatasetModal";
import UploadCollapsable from "../../../Components/Collapsable/UploadCollapsable/UploadCollapsable";
import DataLakeBucketDeleteModal from "../../../Components/Modals/DataLakeBucketDeleteModal/DataLakeBucketDeleteModal";
import searchIcon from "../../../Components/Icons/AutoML/search.svg";

export default function DataBucketsMain(props) {
  const [editable, seteditable] = useState(false);
  const [description, setdescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in "
  );
  const [title, settitle] = useState("Databucket name");
  const [editabledescription, seteditabledescription] = useState(null);
  const [editabletitle, seteditabletitle] = useState(null);
  const [selected, setselected] = useState(null);
  const [selectedBucket, setselectedBucket] = useState({
    name: "abc",
    datasets: [
      { name: "abc", desc: "my name is dataset" },
      { name: "abc", desc: "my name is dataset" },
      { name: "abc", desc: "my name is dataset" },
      { name: "abc", desc: "my name is dataset" },
      { name: "abc", desc: "my name is dataset" },
    ],
  });
  const [resettable, setresettable] = useState(false);
  const [searchval, setsearchval] = useState("");
  const [rendertable, setrendertable] = useState(true);

  const [shareModal, setshareModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [newBucketModal, setnewBucketModal] = useState(false);
  const [uploadDatasetModal, setuploadDatasetModal] = useState(false);
  const [tab, settab] = useState("My Data");

  const shareBucket = () => {
    console.log("share bucket API");
  };
  const deleteBucket = () => {
    console.log("delete bucket API");
  };
  const createNewBucket = () => {
    console.log("New bucket API");
  };
  const startUploading = () => {
    console.log("Upload Start");
  };

  const proceed = () => {
    props.history.push({
      pathname: `/datalake/${selectedBucket.name}/datasets/`,
      state: {
        detail: "I am from Databuckets Screen",
        page_name: "Datasets_Screen",
      },
    });
  };

  return (
    <Row
      justify="space-between"
      className={"DataBucketsMain"}
      id="DataBucketsMain"
    >
      <Col span={17} className={"column1"}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img
            src={DataLakeTitle}
            alt={"text"}
            style={{ display: "inline-block", height: "21px", width: "120px" }}
          />
          <img
            src={questionIcon}
            alt={"icon"}
            style={{ display: "inline-block", width: "14px", marginTop: "3px" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flexGrow: "1" }}>
            <CustomTabs
              options={["My Data", "Downloaded Data", "Global Data"]}
              setTab={(val) => {
                settab(val);
                setselected(null);
                setresettable(!resettable);
              }}
            />
          </div>
          <div
            style={
              selected !== null
                ? { display: "none" }
                : {
                    borderBottom: "1px solid #e8e8e8",
                    marginBottom: "11px",
                    display: "flex",
                    alignItems: "flex-end",
                  }
            }
          >
            <div className="searchbar">
              <input
                type="text"
                name="search"
                autoComplete="off"
                style={{ backgroundImage: `url(${searchIcon})` }}
                // placeholder="Search.."
                value={searchval}
                onChange={(e) => setsearchval(e.target.value)}
              />
            </div>
          </div>
          <div
            style={
              selected !== null
                ? {
                    borderBottom: "1px solid #e8e8e8",
                    marginBottom: "11px",
                    display: "flex",
                    alignItems: "flex-end",
                  }
                : { display: "none" }
            }
          >
            <div
              style={
                tab === "Global Data"
                  ? { display: "none" }
                  : selected === null || tab === "Downloaded Data"
                  ? {
                      display: "flex",
                      height: "16px",
                      marginBottom: "9px",
                      marginRight: "22px",
                      cursor: "not-allowed",
                      opacity: "0.3",
                    }
                  : {
                      display: "flex",
                      height: "16px",
                      marginBottom: "9px",
                      marginRight: "22px",
                      cursor: "pointer",
                    }
              }
              onClick={() => {
                setshareModal(true);
              }}
            >
              <img
                src={shareIcon}
                alt="icon"
                style={{ width: "18px", height: "18px", marginRight: "5px" }}
              />
              <span
                style={{
                  fontSize: "14px",
                  height: "16px",
                  color: "#6D6D6D",
                }}
              >
                Share
              </span>
            </div>
            <Popover
              content={
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#444444",
                      cursor: "pointer",
                    }}
                  >
                    Download on Local Storage
                  </div>
                  <hr
                    style={{
                      backgroundColor: "#E1EEFF",
                      border: "none",
                      height: "1px",
                      marginBottom: "07px",
                      width: "100%",
                    }}
                  />
                  <div
                    style={
                      tab === "Downloaded Data" || tab === "My Data"
                        ? {
                            fontSize: "14px",
                            color: "#444444",
                            cursor: "not-allowed",
                            opacity: "0.3",
                          }
                        : {
                            fontSize: "14px",
                            color: "#444444",
                            cursor: "pointer",
                          }
                    }
                  >
                    Download on Cloud Storage
                  </div>
                </div>
              }
              placement="bottomRight"
              trigger="click"
            >
              <div
                style={
                  selected === null
                    ? {
                        display: "flex",
                        height: "16px",
                        marginBottom: "9px",
                        marginRight: "22px",
                        cursor: "not-allowed",
                        opacity: "0.3",
                      }
                    : {
                        display: "flex",
                        height: "16px",
                        marginBottom: "9px",
                        marginRight: "22px",
                        cursor: "pointer",
                      }
                }
              >
                <img
                  src={downloadIcon}
                  alt="icon"
                  style={{ width: "16px", height: "16px", marginRight: "5px" }}
                />
                <span
                  style={{
                    fontSize: "14px",
                    height: "16px",
                    color: "#6D6D6D",
                  }}
                >
                  Download
                </span>
              </div>
            </Popover>
            <div
              style={
                selected === null
                  ? {
                      display: "flex",
                      height: "16px",
                      marginBottom: "9px",
                      marginRight: "18px",
                      cursor: "not-allowed",
                      opacity: "0.3",
                    }
                  : {
                      display: "flex",
                      height: "16px",
                      marginBottom: "9px",
                      marginRight: "18px",
                      cursor: "pointer",
                    }
              }
              onClick={() => setdeleteModal(true)}
            >
              <img
                src={deleteIcon}
                alt="icon"
                style={{ width: "18px", height: "18px", marginRight: "5px" }}
              />
              <span
                style={{
                  fontSize: "14px",
                  height: "10px",
                  color: "#6D6D6D",
                }}
              >
                Delete
              </span>
            </div>
          </div>
        </div>
        <div style={{ flexGrow: "1", overflow: "scroll" }}>
          <DataLakeDatabucketstable
            selected={(id) => setselected(id)}
            reset={resettable}
            render={rendertable}
            value={searchval}
          />
        </div>
        <Button className="proceedButton" onClick={() => proceed()}>
          Proceed
        </Button>
      </Col>
      <Col span={7} className={"column2"}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontFamily: "Lato",
            marginTop: "5px",
            height: "30px",
          }}
        >
          {editable === false ? (
            <h2
              style={{
                flexGrow: "1",
                fontSize: "18px",
                fontWeight: "normal",
                lineHeight: "24px",
                fontFamily: "Lato",
                color: "#085fab",
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
                  fontSize: "18px",
                  fontWeight: "normal",
                  lineHeight: "24px",
                  fontFamily: "Lato",
                  width: "80%",
                  color: "#085fab",
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
            style={{ cursor: "pointer" }}
            onClick={() => {
              // renameproject();
              seteditable(!editable);
            }}
          >
            <img
              src={editable === true ? saveIcon : editIcon}
              alt="edit icon"
              style={{ width: "16px", marginBottom: "2px" }}
            ></img>
            {/* <span
              style={{
                fontWeight: "700",
                fontSize: "14px",
                marginLeft: "4px",
                color: "#6D6D6D",
                fontFamily: "Lato",
              }}
            >
              {editable === true ? "Save" : " Edit"}
            </span> */}
          </div>
        </div>
        <div style={{ overflowY: "scroll", paddingRight: "0px" }}>
          <div
            style={{ marginTop: "15px", height: "110px", overflow: "hidden" }}
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
          </div>{" "}
          <div>
            <DataLakeSpaceGraph />
            <div style={{ display: "flex", marginTop: "12px" }}>
              <img
                alt={"text"}
                src={darkBlueIcon}
                width={18}
                style={{ marginRight: "25px" }}
              />
              <span
                style={{ flexGrow: "1", fontSize: "13px", marginTop: "2px" }}
              >
                Free Space on Cloud
              </span>
              <span
                style={{ fontSize: "13px", marginTop: "2px", color: "#6d6d6d" }}
              >
                Value
              </span>
            </div>
            <div style={{ display: "flex", marginTop: "12px" }}>
              <img
                alt={"text"}
                src={blueIcon}
                width={18}
                style={{ marginRight: "25px" }}
              />
              <span
                style={{ flexGrow: "1", fontSize: "13px", marginTop: "2px" }}
              >
                Used Space on Cloud
              </span>
              <span
                style={{ fontSize: "13px", marginTop: "2px", color: "#6d6d6d" }}
              >
                Value
              </span>
            </div>
          </div>
        </div>
        <hr
          style={{
            width: "100%",
            backgroundColor: "#E1EEFF",
            border: "none",
            height: "1px",
            marginBottom: "10px",
          }}
        />
        <div
          style={{
            display: "flex",
            height: "16px",
            marginBottom: "9px",
            marginRight: "18px",
            cursor: "pointer",
          }}
          onClick={() => setnewBucketModal(true)}
        >
          <img
            src={newBucketIcon}
            alt="icon"
            style={{ width: "23px", height: "19px", marginRight: "5px" }}
          />
          <span
            style={{
              fontSize: "14px",
              height: "16px",
              color: "#085fab",
            }}
          >
            New Databucket
          </span>
        </div>
        <div
          style={{
            display: "flex",
            height: "16px",
            marginBottom: "9px",
            marginRight: "18px",
            cursor: "pointer",
          }}
          onClick={() => setuploadDatasetModal(true)}
        >
          <img
            src={uploadIcon}
            alt="icon"
            style={{ width: "16px", height: "19px", marginRight: "12px" }}
          />
          <span
            style={{
              fontSize: "14px",
              height: "16px",
              color: "#085fab",
            }}
          >
            Upload Dataset
          </span>
        </div>
        <br />
      </Col>
      <DataLakeBucketShareModal
        data={selectedBucket}
        isModalVisible={shareModal}
        handleCancel={() => setshareModal(false)}
        handleOK={() => shareBucket()}
      />
      <DataLakeBucketDeleteModal
        data={selectedBucket}
        isModalVisible={deleteModal}
        handleCancel={() => setdeleteModal(false)}
        handleOK={() => deleteBucket()}
      />
      <DataLakeNewBucketModal
        isModalVisible={newBucketModal}
        handleCancel={() => setnewBucketModal(false)}
        handleOK={() => createNewBucket()}
      />
      <DataLakeUploadDatasetModal
        isModalVisible={uploadDatasetModal}
        handleCancel={() => setuploadDatasetModal(false)}
        handleOK={() => startUploading()}
      />
      <div style={{ position: "fixed", bottom: "0", right: "0" }}>
        <UploadCollapsable />
      </div>
    </Row>
  );
}
