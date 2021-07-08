import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import bucketIcon from "../../../Components/Icons/DataLake/bucketIcon.svg";
import searchIcon from "../../../Components/Icons/AutoML/search1.svg";
import "./styles.css";
import { Button, message, Popover } from "antd";
import DataLakeDatasetsTable from "../../../Components/Tables/DataLakeDatasetsTable/DataLakeDatasetstable";
import shareIcon from "../../../Components/Icons/AutoML/share.svg";
import deleteIcon from "../../../Components/Icons/AutoML/delete.svg";
import downloadIcon from "../../../Components/Icons/AutoML/download.svg";
import ellipsis from "../../../Components/Icons/DataLake/ellipsis.svg";
import concatIcon from "../../../Components/Icons/DataLake/concat_s_icon.svg";
import DataLakeDeleteDatasetModal from "../../../Components/Modals/DataLakeDeleteDatasetModal/DataLakeDeleteDatasetModal";
import DataLakeShareDatasetModal from "../../../Components/Modals/DataLakeShareDatasetModal/DataLakeShareDatasetModal";
import DataLakeDatasetInfoDrawer from "../../../Components/Drawers/DataLakeDatasetInfoDrawer/DataLakeDatasetInfoDrawer";
import Modal from "antd/lib/modal/Modal";
import AutoMLSelectedDatasetsPreviewRowsTable from "../../../Components/Tables/AutoMLSelectedDataPopupTables/AutoMLSelectedDatasetsPreviewRowsTable";
import AutoMLSelectedDatasetsMetaTable from "../../../Components/Tables/AutoMLSelectedDatasetsMetaTable/AutoMLSelectedDatasetsMetaTable";
import UploadCollapsable from "../../../Components/Collapsable/UploadCollapsable/UploadCollapsable";
import DataLakeUploadDatasetModal from "../../../Components/Modals/DataLakeUploadDatasetModal/DataLakeUploadDatasetModal";
import { DataLakeBucketContext } from "../../../Data/Contexts/DataLake/DataLakeBucketContext/DataLakeBucketContext";
import { DataLakeDatasetContext } from "../../../Data/Contexts/DataLake/DataLakeDatasetContext/DataLakeDatasetContext";
import axios from "axios";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";
import { URL } from "../../../Config/config";
import { serialize } from "object-to-formdata";
import Cliploader from "../../../Components/Loader/Cliploader";
import { DataLakeFileUploadContext } from "../../../Data/Contexts/DataLakeFileUploadContext/DataLakeFileUploadContext";
import DataLakeDownloadDatasetModal from "../../../Components/Modals/DataLakeDownloadDatasetModal/DataLakeDownloadDatasetModal";
import fileDownload from "js-file-download";
import { NotificationsContext } from "../../../Data/Contexts/AutoMLNotifications/AutoMLNotificationsContext";

export default function DatasetsMain(props) {
  const { databucket } = useParams();
  const wrapperRef = useRef(null);

  const [searchval, setsearchval] = useState("");
  const [selected, setselected] = useState(null);
  const [downloadPopover, setdownloadPopover] = useState(false);

  const [shareModal, setshareModal] = useState(false);
  const [downloadModal, setdownloadModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [infoDrawer, setinfoDrawer] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [resettable, setresettable] = useState(false);
  const [uploadDatasetModal, setuploadDatasetModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [recallapi, setrecallapi] = useState(false);
  const [downloadCloudModal, setdownloadCloudModal] = useState(false);

  const [selectedDataset, setselectedDataset] = useState(null);

  const { Bucket } = useContext(DataLakeBucketContext);
  const { Dataset } = useContext(DataLakeDatasetContext);
  const { Auth } = useContext(AuthContext);
  const { Files, setProgress, setError } = useContext(
    DataLakeFileUploadContext
  );
  const { Notifications } = useContext(NotificationsContext);

  // console.log(Notifications);

  let location = useLocation();

  useEffect(() => {
    setresettable(!resettable);
    setrecallapi(!recallapi);
  }, [location]);

  useEffect(() => {
    Notifications.Notifications.forEach((element) => {
      if (
        element.status === "unread" &&
        (element.message ===
          "Your data has been processed and is ready to use." ||
          element.message ===
            "Your data has been concatenated and is ready to use." ||
          element.message === "Your data has been configured.") &&
        Bucket.bucket.name === element.path_info.databucket &&
        Bucket.bucket.created_by === element.path_info.created_by
      ) {
        console.log(element);
        setrecallapi(!recallapi);
      }
    });
  }, [Notifications]);

  useEffect(() => {
    if (Dataset.dataset !== null) {
      let temp = [];
      let keys = Object.keys(Dataset.dataset.dataset_preview);
      temp.push(keys);
      keys.forEach((element, index) => {
        let arr = [];
        keys.forEach((item) => {
          arr.push(Dataset.dataset.dataset_preview[`${item}`][index]);
        });
        temp.push(arr);
      });
      let slicedArr = [];
      if (temp.length > 3) {
        slicedArr = temp.slice(0, 4);
      } else {
        slicedArr = temp;
      }
      setrows(slicedArr);
      temp = [];
      console.log(Dataset.dataset.dataset_metadata);
      temp.push(Dataset.dataset.dataset_metadata.columns);
      temp.push(Dataset.dataset.dataset_metadata.dtypes);
      let arr = [];
      Dataset.dataset.dataset_metadata.columns.forEach((element) => {
        arr.push("-");
      });
      temp.push(arr);
      // Dataset.dataset.dataset_metadata.columns.forEach((element) => {
      //   arr.push("-");
      // });
      temp.push(arr);
      setmeta(temp);
    }
  }, [Dataset]);

  const [rows, setrows] = useState(null);
  const [meta, setmeta] = useState(null);

  const useOutsideAlerter = (ref) => {
    // useEffect(() => {
    async function handleClickOutside(event) {
      if (
        (ref.current &&
          !ref.current.contains(event.target) &&
          event.target.className === "ant-breadcrumb") ||
        event.target.className === "DataLakeBreadcrumbs" ||
        event.target.className === "ant-layout" ||
        event.target.className ===
          "ant-menu ant-menu-light ant-menu-root ant-menu-inline"
      ) {
        //  alert("You clicked outside of me!");
        console.log("outside click");
        setselectedDataset(null);
        setselected(null);
        setresettable(!resettable);
        // if (resettable === false) {
        //   setresettable(true);
        // } else {
        //   setresettable(false);
        // }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // }, [ref]);
  };

  useOutsideAlerter(wrapperRef);

  const shareDataset = async () => {
    setloading(true);
    let obj = {
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      company_name: Auth.company_name,
      databucket_name: Bucket.bucket.name,
      databucket_desc: Bucket.bucket.desc,
      dataset_name: selectedDataset.name,
      confirmation: "no",
    };
    console.log(obj);
    const formData = serialize(obj);
    await axios({
      method: "post",
      url: `${URL}/automl/share_dataset/`,
      data: formData,
      headers: {
        "content-type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    })
      .then(function (response) {
        setloading(false);
        console.log(response);
        setshareModal(false);
      })
      .catch(function (error) {
        setloading(false);
        setshareModal(false);
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
  };

  const deleteDataset = async () => {
    setloading(true);
    let s = "";
    if (Bucket.type === "My Data") {
      s = "my_datasets";
    } else if (Bucket.type === "Downloaded Data") {
      s = "downloaded_datasets";
    } else if (Bucket.type === "Global Data") {
      s = "shared_datasets";
    }
    let obj = {
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      company_name: Auth.company_name,
      databucket_name: Bucket.bucket.name,
      databucket_desc: Bucket.bucket.desc,
      space: s,
      dataset_name: selectedDataset.name,
      confirmation: "no",
    };
    console.log(obj);
    const formData = serialize(obj);
    await axios({
      method: "post",
      url: `${URL}/automl/delete_dataset/`,
      data: formData,
      headers: {
        "content-type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    })
      .then(function (response) {
        setloading(false);
        console.log(response);
        if (response.data.message === "deleted") {
          setdeleteModal(false);
          setrecallapi(!recallapi);
          setselected(null);
          setselectedDataset(null);
        } else {
          message.error(response.data.message);
        }
      })
      .catch(function (error) {
        setloading(false);
        setdeleteModal(false);
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          if (
            error.response.data.used_by &&
            error.response.data.used_by[0] &&
            error.response.data.used_for
          ) {
            message.error(
              `Dataset is currently used by ${error.response.data.used_by[0]} for ${error.response.data.used_for}`
            );
          } else {
            message.error("Server Error");
          }

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

  const concatScreen = () => {
    props.history.push({
      pathname: `/datalake/${databucket}/datasets/${selectedDataset.name}/concat`,
      state: {
        detail: "I am from Databuckets Screen",
        page_name: "Datasets_Screen",
      },
    });
  };

  const configureScreen = () => {
    console.log("call");
    props.history.push({
      pathname: `/datalake/${databucket}/datasets/${selectedDataset.name}/configure`,
      state: {
        detail: "I am from Databuckets Screen",
        page_name: "Datasets_Screen",
      },
    });
  };

  const showDownloadLocalModal = () => {
    setdownloadPopover(false);
    setdownloadModal(true);
  };

  const showDownloadModal = () => {
    setdownloadPopover(false);
    setdownloadCloudModal(true);
  };

  const downloadDataset = async () => {
    let s = "";
    setloading(true);
    if (Bucket.type === "My Data") {
      s = "my_datasets";
    } else if (Bucket.type === "Downloaded Data") {
      s = "downloaded_datasets";
    } else if (Bucket.type === "Global Data") {
      s = "shared_datasets";
    }
    let obj = {
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      company_name: Auth.company_name,
      created_by: selectedDataset.created_by,
      databucket_name: Bucket.bucket.name,
      databucket_desc: Bucket.bucket.desc,
      dataset_name: selectedDataset.name,
      confirmation: "no",
      download_type: "local",
      space: s,
    };
    console.log(obj);
    const formData = serialize(obj);
    await axios({
      method: "post",
      url: `${URL}/automl/download_dataset/`,
      data: formData,
      headers: {
        "content-type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    })
      .then(function (response) {
        setloading(false);
        console.log(response);
        setdownloadModal(false);
        fileDownload(response.data, selectedDataset.name);
      })
      .catch(function (error) {
        setloading(false);
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          setdownloadModal(false);
          message.error("Server Error", error.response.status);
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

  const downloadCloudDataset = async () => {
    let s = "";
    setloading(true);
    if (Bucket.type === "My Data") {
      s = "my_datasets";
    } else if (Bucket.type === "Downloaded Data") {
      s = "downloaded_datasets";
    } else if (Bucket.type === "Global Data") {
      s = "shared_datasets";
    }
    let obj = {
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      company_name: Auth.company_name,
      created_by: selectedDataset.created_by,
      databucket_name: Bucket.bucket.name,
      databucket_desc: Bucket.bucket.desc,
      dataset_name: selectedDataset.name,
      confirmation: "no",
      download_type: "cloud",
      space: s,
    };
    console.log(obj);
    const formData = serialize(obj);
    await axios({
      method: "post",
      url: `${URL}/automl/download_dataset/`,
      data: formData,
      headers: {
        "content-type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    })
      .then(function (response) {
        setloading(false);
        console.log(response);
        if (response.data === "Your Dataset is being downloaded !!!") {
          setdownloadCloudModal(false);
        } else {
          message.error(response.data);
        }
        // fileDownload(response.data, selectedDataset.name);
      })
      .catch(function (error) {
        setloading(false);
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          setdownloadCloudModal(false);
          message.error(error.response.data);
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

  const startUploading = async () => {
    console.log("Upload Start");
    let s = "";
    if (Bucket.type === "My Data") {
      s = "my_datasets";
    } else if (Bucket.type === "Downloaded Data") {
      s = "downloaded_datasets";
    } else if (Bucket.type === "Global Data") {
      s = "shared_datasets";
    }
    // setloading(true);
    setuploadDatasetModal(false);
    let corrected = [];
    let sizes = {};
    let fileList = [];
    let count = 0;
    Files.files.forEach((element, index) => {
      if (element.correct === true) {
        fileList[count] = element.file;
        count = count + 1;
        corrected.push(element.file);
        sizes[`${element.file.path}`] = "0.01";
      }
    });
    //Iterating though each file and seperate API
    corrected.forEach(async (element, index) => {
      let obj = {
        company_id: Auth.company_id,
        user_id: Auth.user_id,
        company_name: Auth.company_name,
        databucket_name: Bucket.bucket.name,
        files: element,
        files_size: JSON.stringify(sizes),
        space: s,
      };
      console.log(obj);
      const formData = serialize(obj);
      await axios({
        method: "post",
        url: `${URL}/automl/upload_dataset/`,
        data: formData,
        onUploadProgress: (progressEvent) => {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress({ name: element.path, val: percentCompleted });
        },
        headers: {
          "content-type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      })
        .then(function (response) {
          setloading(false);
          if (response.data.message === "success") {
            setuploadDatasetModal(false);
          } else {
            if (response.data.alread_exists.length !== 0) {
              message.error(`${response.data.alread_exists[0]} already exists`);
            } else if (response.data.invalid_files.length) {
              message.error(`${response.data.invalid_files[0]} is invalid`);
            }
          }
          console.log(response);
        })
        .catch(function (error) {
          setloading(false);
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            setuploadDatasetModal(false);
            setError({ name: element.path, val: true });
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
          }
        });
    });
  };

  return (
    <div
      className="DatasetsMain"
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        height: "100%",
      }}
      ref={wrapperRef}
    >
      <Cliploader loading={loading} handleCancel={() => setloading(false)} />
      <div>
        <div style={{ display: "flex" }}>
          <img src={bucketIcon} alt="icon" width={20} />
          <span
            style={{
              flexGrow: "1",
              fontWeight: "bold",
              fontStyle: "normal",
              fontSize: "18px",
              marginLeft: "10px",
            }}
          >
            {databucket}
          </span>
          <div className="Searchbar">
            <input
              type="text"
              name="search"
              autoComplete="off"
              style={{
                backgroundImage: `url(${searchIcon})`,
                marginRight: "10px",
              }}
              // placeholder="Search.."
              value={searchval}
              onChange={(e) => {
                setselected(null);
                setselectedDataset(null);
                setresettable(!resettable);
                setsearchval(e.target.value);
              }}
            />
          </div>
          <Button
            className="UploadButton"
            style={
              selected === null && Bucket.type === "My Data"
                ? null
                : { display: "none" }
            }
            onClick={() => setuploadDatasetModal(true)}
          >
            Upload Dataset
          </Button>
          <div
            style={
              selected !== null
                ? {
                    marginBottom: "0px",
                    marginLeft: "10px",
                    display: "flex",
                    alignItems: "flex-end",
                  }
                : { display: "none" }
            }
          >
            <Popover
              content={
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#444444",
                      cursor: "pointer",
                    }}
                    onClick={() => showDownloadLocalModal()}
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
                      Bucket.type === "Downloaded Data" ||
                      Bucket.type === "My Data"
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
                    onClick={() => showDownloadModal()}
                  >
                    Download on Cloud Storage
                  </div>
                </div>
              }
              placement="bottomRight"
              trigger="click"
              visible={downloadPopover}
              onVisibleChange={() => setdownloadPopover(!downloadPopover)}
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
                  style={{
                    width: "16px",
                    height: "16px",
                    marginRight: "5px",
                    marginTop: "2px",
                  }}
                />
                <span
                  style={{
                    fontSize: "14px",
                    height: "16px",
                    color: "#6D6D6D",
                    fontWeight: "normal",
                  }}
                >
                  Download
                </span>
              </div>
            </Popover>
            <div
              style={
                Bucket.type === "Downloaded Data" ||
                Bucket.type === "Global Data"
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
                if (Bucket.type === "My Data") {
                  setshareModal(true);
                }
              }}
            >
              <img
                src={shareIcon}
                alt="icon"
                style={{
                  width: "18px",
                  height: "18px",
                  marginRight: "5px",
                  marginTop: "2px",
                }}
              />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "normal",
                  height: "16px",
                  color: "#6D6D6D",
                }}
              >
                Share
              </span>
            </div>
            <div
              style={
                selectedDataset !== null &&
                Auth.user_id === selectedDataset.created_by
                  ? {
                      display: "flex",
                      height: "16px",
                      marginBottom: "9px",
                      marginRight: "18px",
                      cursor: "pointer",
                    }
                  : {
                      display: "flex",
                      height: "16px",
                      marginBottom: "9px",
                      marginRight: "18px",
                      cursor: "not-allowed",
                      opacity: "0.3",
                    }
              }
              onClick={() => {
                if (
                  selectedDataset !== null &&
                  Auth.user_id === selectedDataset.created_by
                ) {
                  setdeleteModal(true);
                }
              }}
            >
              <img
                src={deleteIcon}
                alt="icon"
                style={{
                  width: "18px",
                  height: "18px",
                  marginRight: "5px",
                  marginTop: "1px",
                }}
              />
              <span
                style={{
                  fontSize: "14px",
                  height: "10px",
                  color: "#6D6D6D",
                  fontWeight: "normal",
                }}
              >
                Delete
              </span>
            </div>
            <Popover
              content={
                <div
                  style={{ width: "200px", cursor: "pointer" }}
                  onClick={() => concatScreen()}
                >
                  <img
                    src={concatIcon}
                    alt="Icon"
                    style={{ marginRight: "3px" }}
                  />{" "}
                  Concatenate
                </div>
              }
              placement="bottomRight"
              trigger="click"
            >
              <img
                src={ellipsis}
                alt="icon"
                style={
                  Bucket.type === "My Data"
                    ? {
                        width: "18px",
                        height: "18px",
                        marginRight: "5px",
                        marginBottom: "5px",
                        cursor: "pointer",
                      }
                    : { display: "none" }
                }
              />
            </Popover>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "100%",
          backgroundColor: "#E1EEFF",
          border: "none",
          height: "1px",
          marginBottom: "15px",
        }}
      />
      <div style={{ flexGrow: "1", overflow: "scroll" }}>
        <DataLakeDatasetsTable
          selected={(id) => setselected(id)}
          selectedDataset={(val) => setselectedDataset(val)}
          showdrawer={() => setinfoDrawer(true)}
          showpopup={() => setshowpopup(true)}
          reset={resettable}
          recallAPI={recallapi}
          value={searchval}
        />
      </div>
      <DataLakeDeleteDatasetModal
        dataset={selectedDataset}
        isModalVisible={deleteModal}
        handleCancel={() => setdeleteModal(false)}
        handleOK={() => deleteDataset()}
      />
      <DataLakeShareDatasetModal
        dataset={selectedDataset}
        isModalVisible={shareModal}
        handleCancel={() => setshareModal(false)}
        handleOK={() => shareDataset()}
      />
      <DataLakeDownloadDatasetModal
        dataset={selectedDataset}
        isModalVisible={downloadModal}
        handleCancel={() => setdownloadModal(false)}
        handleOK={() => downloadDataset()}
      />
      <DataLakeDownloadDatasetModal
        dataset={selectedDataset}
        isModalVisible={downloadCloudModal}
        handleCancel={() => setdownloadCloudModal(false)}
        handleOK={() => downloadCloudDataset()}
      />
      <DataLakeDatasetInfoDrawer
        onClose={() => setinfoDrawer(false)}
        drawervisible={infoDrawer}
        type={"My Data"}
        data={selectedDataset}
        recallAPI={() => setrecallapi(!recallapi)}
      />
      {selectedDataset !== null ? (
        <Modal
          title={"Configurations"}
          visible={showpopup}
          footer={false}
          centered
          onCancel={() => setshowpopup(false)}
          wrapClassName="PreviewPopup"
          width={"80%"}
          style={{ fontStyle: "normal" }}
        >
          <p className="sublink">{selectedDataset.name}</p>
          <p className="subtitle" style={{ marginBottom: "7px" }}>
            Dataset Description
          </p>
          <p className="desc">{selectedDataset.description} </p>
          <div
            style={{
              width: "inherit",
              overflowX: "scroll",
              paddingBottom: "10px",
            }}
          >
            <AutoMLSelectedDatasetsPreviewRowsTable rows={rows} />
          </div>
          <p className="subtitle" style={{ marginTop: "10px" }}>
            Meta Data
          </p>
          <div
            style={{
              width: "inherit",
              overflowX: "scroll",
              paddingBottom: "10px",
            }}
          >
            <AutoMLSelectedDatasetsMetaTable rows={meta} />
          </div>
          <Button
            className="configureButton"
            style={Bucket.type === "Global Data" ? { display: "none" } : {}}
            onClick={() => configureScreen()}
          >
            Configure
          </Button>
        </Modal>
      ) : null}
      <div style={{ position: "fixed", bottom: "0", right: "0" }}>
        <UploadCollapsable />
      </div>
      <DataLakeUploadDatasetModal
        isModalVisible={uploadDatasetModal}
        handleCancel={() => setuploadDatasetModal(false)}
        handleOK={() => startUploading()}
      />
    </div>
  );
}
