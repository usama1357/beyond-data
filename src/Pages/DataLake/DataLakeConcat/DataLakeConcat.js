import { Button, message, Radio, Select, Space } from "antd";
import React, { useContext, useState } from "react";
import concatIcon from "../../../Components/Icons/DataLake/concatIcon.svg";
import concatImage from "../../../Components/Icons/DataLake/concatImage.svg";
import "./styles.css";
import bucketIcon from "../../../Components/Icons/DataLake/bucketIcon.svg";
import { useParams } from "react-router-dom";
import datasetIcon from "../../../Components/Icons/DataLake/datasetIcon.svg";
import UploadCollapsable from "../../../Components/Collapsable/UploadCollapsable/UploadCollapsable";
import DataLakeConcatDropzone from "../../../Components/Dropzone/DataLakeConcatDropzone/DataLakeConcatDropzone";
import download from "../../../Components/Icons/AutoML/download.svg";
import eyeIcon from "../../../Components/Icons/AutoML/eyeicon.svg";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import { URL } from "../../../Config/config";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";
import { DataLakeDatasetContext } from "../../../Data/Contexts/DataLake/DataLakeDatasetContext/DataLakeDatasetContext";
import { serialize } from "object-to-formdata";
import { DataLakeBucketContext } from "../../../Data/Contexts/DataLake/DataLakeBucketContext/DataLakeBucketContext";
import Cliploader from "../../../Components/Loader/Cliploader";

export default function DataLakeConcat() {
  const { Option } = Select;

  const [buckets, setbuckets] = useState(null);
  const [datasets, setdatasets] = useState(null);
  const { databucket, dataset } = useParams();
  const [value, setValue] = React.useState(1);
  const [bucketname, setbucketname] = useState(null);
  const [datasetname, setdatasetname] = useState(null);
  const [option1, setoption1] = useState(1);
  const [option2, setoption2] = useState(1);
  const [loading, setloading] = useState(false);
  const [datasetsize, setdatasetsize] = useState(null);

  const [showpopup, setshowpopup] = useState(false);
  const [rows, setrows] = useState([
    { name: "Row1" },
    { name: "Row1" },
    { name: "Row1" },
    { name: "Row1" },
    { name: "Row1" },
    { name: "Row1" },
  ]);
  const [tempData, settempData] = useState(null);
  const [fileList, setfileList] = useState(null);

  const { Auth } = useContext(AuthContext);
  const { Dataset } = useContext(DataLakeDatasetContext);
  const { Bucket } = useContext(DataLakeBucketContext);

  const loadBuckets = async () => {
    setloading(true);
    setbuckets([]);
    if (Dataset.dataset) {
      let keys = Object.keys(Dataset.dataset.dataset_preview);
      let temp = [];
      keys.forEach((element) => {
        temp.push({ name: element });
      });
      setrows(temp);
    }

    await axios({
      method: "get",
      url: `${URL}/automl/concatenate?company_id=${Auth.company_id}&user_id=${Auth.user_id}&required=databuckets`,
    })
      .then(function (response) {
        setloading(false);
        if (response) {
          settempData(response.data);
          setbuckets(Object.keys(response.data));
        } else {
          setbuckets([]);
        }
        console.log(response);
      })
      .catch(function (error) {
        setloading(false);
        setbuckets([]);
      });
  };

  if (buckets === null) {
    loadBuckets();
  }

  const handleChange = async (value) => {
    setbucketname(value);
    setdatasetname(null);
    setdatasetsize(null);
    setdatasets(tempData[`${value}`]);
  };

  const handleDatasetName = async (value) => {
    setdatasetname(value);
    setdatasetsize(0.5);
    // await axios({
    //   method: "get",
    //   url: `${URL}/automl/concatenate?user_id=${Auth.user_id}&company_id=${Auth.company_id}&company_name=${Auth.company_name}&databucket_name=${bucketname}&dataset_name=${value}&required=size`,
    // })
    //   .then(function (response) {
    //     setloading(false);
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     setloading(false);
    //     if (error.response) {
    //       // Request made and server responded
    //       console.log(error.response.data);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //     } else if (error.request) {
    //       // The request was made but no response was received
    //       console.log(error.request);
    //     } else {
    //       // Something happened in setting up the request that triggered an Error
    //     }
    //   });
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  function ChangeOption1(e) {
    setoption1(e.target.value);
  }

  function ChangeOption2(e) {
    setoption2(e.target.value);
  }

  const concatAPI = async () => {
    console.log(fileList);
    console.log(Dataset);
    console.log(Bucket);
    let type = "";
    if (value === 1) {
      type = "existing";
    } else {
      type = "new";
    }
    let option = "";
    if (type === "existing") {
      if (option1 === 1) {
        option = "keep_secondary";
      } else if (option1 === 2) {
        option = "delete_secondary";
      } else if (option1 === 3) {
        option = "keep_both";
      }
    } else if (type === "new") {
      if (option2 === 1) {
        option = "keep_secondary";
      } else if (option2 === 2) {
        option = "keep_both";
      }
    }
    const myData = {
      company_name: Auth.company_name,
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      primary_databucket: Bucket.bucket.name,
      primary_dataset: Dataset.dataset.name,
      primary_dataset_size: parseFloat(Dataset.dataset.size),
      secondary_dataset_size:
        type === "new" ? (fileList.size / 1048576).toFixed(2) : datasetsize,
      concatenate_with: type,
      concatenate_type: option,
      secondary_databucket: bucketname,
      secondary_dataset: type === "new" ? fileList.name : datasetname,
      file: fileList,
    };
    console.log(myData);
    const formData = serialize(myData);
    setloading(true);
    await axios({
      method: "post",
      url: `${URL}/automl/concatenate/`,
      data: formData,
      headers: {
        "content-type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    })
      .then(function (response) {
        setloading(false);
        console.log(response);
        message.success(response.data);
      })
      .catch(function (error) {
        setloading(false);
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);

          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
        }
      });
  };

  const downloadTemplate = () => {
    if (Dataset.dataset) {
      let temp = "";
      Dataset.dataset.dataset_metadata.columns.forEach((element) => {
        temp = temp.concat(element + ",");
      });
      temp = temp.concat("\n");
      Dataset.dataset.dataset_metadata.columns.forEach((element) => {
        temp = temp.concat(",");
      });
      temp.toString();
      let csvContent = "data:text/csv;charset=utf-8," + temp;
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", Dataset.dataset.name);
      document.body.appendChild(link); // Required for FF
      link.click();
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
      className="DataLakeConcat"
    >
      <Cliploader loading={loading} handleCancel={() => setloading(false)} />
      <div style={{ textAlign: "left" }}>
        <img src={concatIcon} alt="icon" style={{ marginBottom: "5px" }} />{" "}
        <span
          style={{
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "18px",
            marginLeft: "3px",
          }}
        >
          Concatenate
        </span>
      </div>
      <div
        style={{
          flexGrow: "1",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex" }}>
          <div className="card">
            <div className="title">Primary Dataset</div>
            <div style={{ display: "flex" }}>
              <img src={bucketIcon} alt="icon" width={22} />
              <div
                style={{
                  marginLeft: "10px",
                  color: "#6d6d6d",
                  fontSize: "14px",
                }}
              >
                {databucket}
              </div>
            </div>
            <div style={{ flexGrow: "1", justifyContent: "center" }}>
              <img
                src={datasetIcon}
                alt="icon"
                // width={40}
                style={{
                  width: "8%",
                  marginTop: "15px",
                  display: "block",
                  margin: "auto",
                }}
              />
              <p
                style={{
                  fontStyle: "normal",
                  fontSize: "14px",
                  color: "#6d6d6d",
                  marginTop: "7px",
                  marginBottom: "0px",
                }}
              >
                {dataset}
              </p>
            </div>
            <div
              style={
                value === 2
                  ? {
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      margin: "auto",
                      marginTop: "3px",
                      paddingBottom: "15px",
                      width: "80%",
                    }
                  : { display: "none" }
              }
            >
              <div
                style={{ display: "flex", cursor: "pointer" }}
                onClick={() => downloadTemplate()}
              >
                <img src={download} alt="icon" width={14} />{" "}
                <span
                  style={{
                    marginLeft: "13px",
                    fontStyle: "normal",
                    fontSize: "14px",
                    color: "#6d6d6d",
                  }}
                >
                  Download Template
                </span>
              </div>
              <div
                style={{ display: "flex", cursor: "pointer" }}
                onClick={() => {
                  setshowpopup(true);
                }}
              >
                <img src={eyeIcon} alt="icon" width={17} />{" "}
                <span
                  style={{
                    marginLeft: "13px",
                    fontStyle: "normal",
                    fontSize: "14px",
                    color: "#6d6d6d",
                  }}
                >
                  Preview Template
                </span>
              </div>
            </div>
          </div>
          <div>
            <img
              src={concatImage}
              alt="icon"
              style={{
                marginTop: "14vh",
                marginLeft: "20px",
                marginBottom: "6px",
                marginRight: "20px",
              }}
            />
          </div>
          <div className="card">
            <div className="title" style={{ marginBottom: "10px" }}>
              Secondary Dataset
            </div>
            <div
              style={{
                fontSize: "14px",
                fontStyle: "normal",
                textAlign: "left",
              }}
            >
              Concatenate Dataset
            </div>
            <div style={{ textAlign: "left" }}>
              <Radio.Group onChange={onChange} value={value}>
                <Radio
                  value={1}
                  style={{
                    marginRight: "80px",
                    fontSize: "14px",
                    color: "#6d6d6d",
                  }}
                >
                  Existing
                </Radio>
                <Radio
                  value={2}
                  style={{
                    fontSize: "14px",
                    color: "#6d6d6d",
                  }}
                >
                  From Local Storage
                </Radio>
              </Radio.Group>
            </div>
            {value === 1 ? (
              <div style={{ textAlign: "left", marginTop: "15px" }}>
                <div>Select </div>
                <Select
                  style={{
                    width: 200,
                    display: "inline-block",
                    marginRight: "15px",
                  }}
                  className="select"
                  onChange={handleChange}
                  disabled={buckets ? false : true}
                  placeholder="Databucket"
                  value={bucketname}
                >
                  {buckets
                    ? buckets.map((element) => (
                        <Option value={element}>{element}</Option>
                      ))
                    : null}
                </Select>
                <Select
                  style={{ width: 200, display: "inline-block" }}
                  onChange={handleDatasetName}
                  placeholder="Dataset"
                  className="select"
                  disabled={datasets ? false : true}
                  value={datasetname}
                >
                  {datasets
                    ? datasets.map((element) => (
                        <Option value={element}>{element}</Option>
                      ))
                    : null}
                </Select>
              </div>
            ) : (
              <div style={{ marginTop: "10px", height: "11vh" }}>
                <DataLakeConcatDropzone
                  savefile={(file) => setfileList(file)}
                  removeFile={() => setfileList(null)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="card2">
          <div className="title" style={{ marginBottom: "10px" }}>
            Concatenated Dataset
          </div>
          {value === 1 ? (
            <div style={{ textAlign: "left" }}>
              <Radio.Group onChange={ChangeOption1} value={option1}>
                <Space direction="vertical">
                  <Radio
                    value={1}
                    style={{
                      marginRight: "80px",
                      fontSize: "14px",
                      color: "#6d6d6d",
                    }}
                  >
                    Concatenate Dataset{" "}
                    <span style={{ color: "#085fab" }}>'{dataset}'</span> and
                    Keep <span>{datasetname}</span>
                  </Radio>
                  <Radio
                    value={2}
                    style={{
                      fontSize: "14px",
                      color: "#6d6d6d",
                    }}
                  >
                    Concatenate Dataset{" "}
                    <span style={{ color: "#085fab" }}>'{dataset}'</span> and
                    Delete <span>{datasetname}</span>
                  </Radio>
                  <Radio
                    value={3}
                    style={{
                      fontSize: "14px",
                      color: "#6d6d6d",
                    }}
                  >
                    Create Dataset{" "}
                    <span style={{ color: "#085fab" }}>
                      '{dataset} Concatenated'
                    </span>{" "}
                    and Keep Both Original Files
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          ) : (
            <div style={{ textAlign: "left" }}>
              <Radio.Group onChange={ChangeOption2} value={option2}>
                <Space direction="vertical">
                  <Radio
                    value={1}
                    style={{
                      marginRight: "80px",
                      fontSize: "14px",
                      color: "#6d6d6d",
                    }}
                  >
                    Concatenate Dataset{" "}
                    <span style={{ color: "#085fab" }}>'{dataset}'</span>
                  </Radio>
                  <Radio
                    value={2}
                    style={{
                      fontSize: "14px",
                      color: "#6d6d6d",
                    }}
                  >
                    Create Dataset{" "}
                    <span style={{ color: "#085fab" }}>
                      '{dataset} Concatenated'
                    </span>{" "}
                    and Keep{" "}
                    <span style={{ color: "#085fab" }}>
                      {fileList ? fileList.name : ""}
                    </span>
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          )}
        </div>
      </div>
      <Button
        className="concatButton"
        disabled={
          value === 2
            ? fileList === null
              ? true
              : false
            : datasetname === null
            ? true
            : false
        }
        style={
          value === 2
            ? fileList === null
              ? { opacity: "0.3", cursor: "not-allowed" }
              : {}
            : datasetname === null
            ? { opacity: "0.3", cursor: "not-allowed" }
            : {}
        }
        onClick={() => concatAPI()}
      >
        Concatenate
      </Button>
      <div style={{ position: "fixed", bottom: "0", right: "0" }}>
        <UploadCollapsable />
      </div>
      {rows ? (
        <Modal
          title={dataset}
          visible={showpopup}
          footer={false}
          centered
          onCancel={() => setshowpopup(false)}
          wrapClassName="PreviewPopup"
          width={"70%"}
          style={{ fontStyle: "normal" }}
        >
          <p className="sublink">{"Template"}</p>
          <ul className="custom_row_concat">
            {rows.map((d) => (
              <li
                key={d.name}
                className={"listitem"}
                style={{ display: "inline-block" }}
              >
                {d.name}
              </li>
            ))}
          </ul>
          <Button
            className="configureButton"
            style={{ marginTop: "15px" }}
            onClick={() => setshowpopup(false)}
          >
            Back
          </Button>
        </Modal>
      ) : null}
    </div>
  );
}
