/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import blueIcon from "../../../Components/Icons/DataLake/lightblueKey.svg";
import darkBlueIcon from "../../../Components/Icons/DataLake/darkblueKey.svg";
import questionIcon from "../../../Components/Icons/DataLake/QuestionIcon.svg";
import DataLakeTitle from "../../../Components/Icons/DataLake/DataLakeTitle.svg";
import uploadIcon from "../../../Components/Icons/DataLake/upload.svg";
import newBucketIcon from "../../../Components/Icons/DataLake/newDatabucket.svg";
import discardIcon from "../../../Components/Icons/DataLake/discardIcon.svg";
import { Button, Col, Input, message, Popover, Row, Tooltip } from "antd";
import "./styles.css";
import editIcon from "../../../Components/Icons/AutoML/edit.svg";
import saveIcon from "../../../Components/Icons/DataLake/saveIcon.svg";
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
import searchIcon from "../../../Components/Icons/AutoML/search1.svg";
import { DataLakeBucketContext } from "../../../Data/Contexts/DataLake/DataLakeBucketContext/DataLakeBucketContext";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";
import { serialize } from "object-to-formdata";
import axios from "axios";
import { URL } from "../../../Config/config";
import DataLakeBucketDownloadModal from "../../../Components/Modals/DataLakeBucketDownloadModal/DataLakeBucketDownloadModal";
import Cliploader from "../../../Components/Loader/Cliploader";
import fileDownload from "js-file-download";
import BucketShareReplaceModal from "../../../Components/Modals/Misc/BucketShareReplaceModal/BucketShareReplaceModal";
import { useLocation, useParams } from "react-router-dom";

export default function DataBucketsMain(props) {
  const [editable, seteditable] = useState(false);
  const [description, setdescription] = useState("");
  const [title, settitle] = useState("");
  const [editabledescription, seteditabledescription] = useState(null);
  const [editabletitle, seteditabletitle] = useState(null);
  const [selected, setselected] = useState(null);
  const [selectedBucket, setselectedBucket] = useState(null);
  const [resettable, setresettable] = useState(false);
  const [searchval, setsearchval] = useState("");
  const [rendertable, setrendertable] = useState(true);
  const [recallAPI, setrecallAPI] = useState(false);
  const [tempDatasets, settempDatasets] = useState(null);
  const [tempDeleteDatasets, settempDeleteDatasets] = useState(null);
  const [tempDownloadDatasets, settempDownloadDatasets] = useState(null);
  const [tempDownloadLocalDatasets, settempDownloadLocalDatasets] =
    useState(null);

  const [downloadPopover, setdownloadPopover] = useState(false);
  const [shareModal, setshareModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [downloadModal, setdownloadModal] = useState(false);
  const [downloadLocalModal, setdownloadLocalModal] = useState(false);
  const [newBucketModal, setnewBucketModal] = useState(false);
  const [uploadDatasetModal, setuploadDatasetModal] = useState(false);
  const [ReplaceShareModal, setReplaceShareModal] = useState(false);
  const [ReplaceDownloadModal, setReplaceDownloadModal] = useState(false);
  const [tab, settab] = useState("My Data");
  const [loading, setloading] = useState(false);
  const [SpaceInfo, setSpaceInfo] = useState({ free_space: 0, used_space: 0 });

  const [ConfirmShareData, setConfirmShareData] = useState(false);

  const { Bucket, setBucket } = useContext(DataLakeBucketContext);
  const { Auth, setAuth } = useContext(AuthContext);

  let location = useLocation();

  useEffect(() => {
    if (location && location.state) {
      if (location.state.info) {
        if (
          location.state.info.screen === "databuckets" &&
          location.state.info.tab
        ) {
          if (location.state.info.tab === "global") {
            settab("Global Data");
            setselected(null);
            setselectedBucket(null);
            seteditabledescription("");
            settitle("");
            seteditable(false);
            setdescription("");
            seteditabletitle("");
            setsearchval("");
            setresettable(!resettable);
            setrecallAPI(!recallAPI);
          }
          if (location.state.info.tab === "downloaded") {
            settab("Downloaded Data");
            setselected(null);
            setselectedBucket(null);
            seteditabledescription("");
            settitle("");
            seteditable(false);
            setdescription("");
            seteditabletitle("");
            setsearchval("");
            setresettable(!resettable);
            setrecallAPI(!recallAPI);
          }
        }
      }
    }
  }, [location]);

  useEffect(() => {
    let demo = {
      company_name: "aawaz4",
      company_id: "aawaz_217",
      user_id: "BD_usama1",
    };
    setAuth(demo);
  }, [tab]);

  const shareBucket = async (data) => {
    console.log(data);
    let arr = [];
    if (data && data.length !== 0) {
      data.forEach((element) => {
        if (element.checked === true) {
          arr.push(element.name);
        }
      });
    }
    let obj = {
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      company_name: Auth.company_name,
      databucket_name: selectedBucket.name,
      databucket_desc: selectedBucket.desc,
      datasets: arr,
      confirmation: "no",
    };
    console.log(obj);
    await axios({
      method: "post",
      url: `${URL}/automl/share_databucket/`,
      data: {
        company_id: Auth.company_id,
        user_id: Auth.user_id,
        company_name: Auth.company_name,
        databucket_name: selectedBucket.name,
        databucket_desc: selectedBucket.desc,
        confirmation: "no",
        datasets: arr,
      },
    })
      .then(function (response) {
        setloading(false);
        console.log(response);
        if (response.data.message === "sharing started") {
          setshareModal(false);
        } else if (
          response.data.message === "conflict" &&
          response.data.already_exists.length !== 0
        ) {
          setshareModal(false);
          setReplaceShareModal(true);
          setConfirmShareData(response.data.already_exists);
        }
      })
      .catch(function (error) {
        setloading(false);
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          message.error("Server Error");
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

  const confirmShare = async () => {
    let obj = {
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      company_name: Auth.company_name,
      databucket_name: selectedBucket.name,
      databucket_desc: selectedBucket.desc,
      datasets: ConfirmShareData,
      confirmation: "yes",
    };
    console.log(obj);
    await axios({
      method: "post",
      url: `${URL}/automl/share_databucket/`,
      data: {
        company_id: Auth.company_id,
        user_id: Auth.user_id,
        company_name: Auth.company_name,
        databucket_name: selectedBucket.name,
        databucket_desc: selectedBucket.desc,
        confirmation: "yes",
        datasets: ConfirmShareData,
      },
    })
      .then(function (response) {
        setloading(false);
        console.log(response);
        setReplaceShareModal(false);
      })
      .catch(function (error) {
        setloading(false);
        setReplaceShareModal(false);
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

  const confirmDownload = async () => {
    let obj = {
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      company_name: Auth.company_name,
      databucket_name: selectedBucket.name,
      databucket_desc: selectedBucket.desc,
      created_by: selectedBucket.created_by,
      datasets: ConfirmShareData,
      confirmation: "yes",
    };
    console.log(obj);
    await axios({
      method: "post",
      url: `${URL}/automl/download_databucket/`,
      data: {
        company_id: Auth.company_id,
        user_id: Auth.user_id,
        company_name: Auth.company_name,
        databucket_name: selectedBucket.name,
        databucket_desc: selectedBucket.desc,
        created_by: selectedBucket.created_by,
        datasets: ConfirmShareData,
        confirmation: "yes",
      },
    })
      .then(function (response) {
        setloading(false);
        setReplaceDownloadModal(false);
        console.log(response);
      })
      .catch(function (error) {
        setloading(false);
        setReplaceDownloadModal(false);
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

  const downloadBucket = async (data) => {
    console.log(data);
    let arr = [];
    if (data && data.length !== 0) {
      data.forEach((element) => {
        if (element.checked === true) {
          arr.push(element.name);
        }
      });
    }
    let obj = {
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      company_name: Auth.company_name,
      databucket_name: selectedBucket.name,
      databucket_desc: selectedBucket.desc,
      created_by: selectedBucket.created_by,
      datasets: arr,
      confirmation: "no",
    };
    console.log(obj);
    await axios({
      method: "post",
      url: `${URL}/automl/download_databucket/`,
      data: {
        company_id: Auth.company_id,
        user_id: Auth.user_id,
        company_name: Auth.company_name,
        databucket_name: selectedBucket.name,
        databucket_desc: selectedBucket.desc,
        created_by: selectedBucket.created_by,
        confirmation: "no",
        datasets: arr,
      },
    })
      .then(function (response) {
        setloading(false);
        if (response.data.message === "downloading started") {
          setdownloadModal(false);
        } else if (response.data.message === "conflict") {
          setdownloadModal(false);
          setReplaceDownloadModal(true);
          setConfirmShareData(response.data.already_exists);
        }
        console.log(response);
      })
      .catch(function (error) {
        setloading(false);
        setdownloadModal(false);
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

  const deleteBucket = async (data) => {
    let arr = [];
    setloading(true);
    setdeleteModal(false);
    if (data && data.length !== 0) {
      data.forEach((element) => {
        if (element.checked === true) {
          arr.push(element.name);
        }
      });
    }
    let s = "";
    if (tab === "My Data") {
      s = "my_datasets";
    } else if (tab === "Downloaded Data") {
      s = "downloaded_datasets";
    } else if (tab === "Global Data") {
      s = "shared_datasets";
    }
    let obj = {
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      company_name: Auth.company_name,
      databucket_name: selectedBucket.name,
      datasets: arr,
      space: s,
    };
    console.log(obj);
    await axios({
      method: "post",
      url: `${URL}/automl/delete_databucket/`,
      data: {
        company_id: Auth.company_id,
        user_id: Auth.user_id,
        company_name: Auth.company_name,
        databucket_name: selectedBucket.name,
        datasets: arr,
        space: s,
      },
    })
      .then(function (response) {
        console.log(response);
        if (response.data.message === "deleted") {
          setloading(false);
          setresettable(!resettable);
          setrecallAPI(!recallAPI);
          setselectedBucket(null);
          setselected(null);
          setBucket({ bucket: null, type: null });
          settitle("");
          setdescription("");
          seteditabletitle(null);
          seteditabledescription(null);
        } else {
          message.error(response.data.message);
        }
      })
      .catch(function (error) {
        setloading(false);
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
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

  const createNewBucket = async (name, desc) => {
    const myData = {
      company_name: Auth.company_name,
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      databucket_name: name,
      databucket_desc: desc,
    };
    console.log(myData);
    const formData = serialize(myData);
    setloading(true);
    await axios({
      method: "post",
      url: `${URL}/automl/create_databucket/`,
      data: formData,
      headers: {
        "content-type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    })
      .then(function (response) {
        setloading(false);
        console.log(response);
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

  const startUploading = () => {
    console.log("Upload Start");
  };

  const setDataBucket = (id, item) => {
    console.log(item);
    setselected(id);
    // setselectedBucket({
    //   name: "abc",
    //   datasets: [
    //     {
    //       name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    //       desc: "my name is dataset",
    //     },
    //     { name: "abc", desc: "my name is dataset" },
    //     { name: "abc", desc: "my name is dataset" },
    //     { name: "abc", desc: "my name is dataset" },
    //     { name: "abc", desc: "my name is dataset" },
    //   ],
    // });
    setselectedBucket(item);
    settitle(item.name);
    setdescription(item.desc);
    seteditabletitle(item.name);
    seteditabledescription(item.desc);
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

  const showshareModal = async () => {
    if (tab === "My Data") {
      setloading(true);
      await axios({
        method: "get",
        url: `${URL}/automl/share_databucket?company_id=${Auth.company_id}&user_id=${Auth.user_id}&databucket_name=${selectedBucket.name}`,
      })
        .then(function (response) {
          setloading(false);
          setshareModal(true);
          console.log(response);
          if (response.data) {
            settempDatasets(response.data);
          } else {
            settempDatasets(null);
          }
        })
        .catch(function (error) {
          setloading(false);
        });
    }
  };

  const showDeleteModal = async () => {
    let s = "";
    let enable = false;
    if (tab === "My Data") {
      s = "p";
      enable = true;
    } else if (tab === "Downloaded Data") {
      s = "d";
      enable = true;
    } else if (tab === "Global Data") {
      s = "s";
      if (selectedBucket.created_by === Auth.user_id) {
        enable = true;
      }
    }
    if (enable) {
      setloading(true);
      let obj = {
        company_id: Auth.company_id,
        user_id: Auth.user_id,
        databucket_name: selectedBucket.name,
        space: s,
      };
      console.log(obj);
      await axios({
        method: "get",
        url: `${URL}/automl/delete_databucket?company_id=${Auth.company_id}&user_id=${Auth.user_id}&databucket_name=${selectedBucket.name}&space=${s}`,
      })
        .then(function (response) {
          setloading(false);
          setdeleteModal(true);
          console.log(response);
          if (response.data) {
            let temp = [];
            for (const [key, value] of Object.entries(response.data)) {
              let obj = { name: key, used: value };
              temp.push(obj);
            }
            settempDeleteDatasets(temp);
          } else {
            settempDeleteDatasets(null);
          }
        })
        .catch(function (error) {
          setloading(false);
        });
    }
  };

  const DownloadLocally = async (data) => {
    console.log(data);
    let s = "";
    if (tab === "My Data") {
      s = "my_datasets";
    } else if (tab === "Downloaded Data") {
      s = "downloaded_datasets";
    } else if (tab === "Global Data") {
      s = "shared_datasets";
    }
    setdownloadPopover(false);
    let arr = [];
    if (data && data.length !== 0) {
      data.forEach((element) => {
        if (element.checked === true) {
          arr.push(element.name);
        }
      });
    }

    if (arr.length === 1) {
      let obj = {
        company_id: Auth.company_id,
        user_id: Auth.user_id,
        company_name: Auth.company_name,
        created_by: selectedBucket.created_by,
        databucket_name: selectedBucket.name,
        databucket_desc: selectedBucket.desc,
        dataset_name: arr[0],
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
          setdownloadLocalModal(false);
          fileDownload(response.data, arr[0]);
        })
        .catch(function (error) {
          setloading(false);
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            setdownloadLocalModal(false);
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
    } else {
      let obj = {
        company_id: Auth.company_id,
        user_id: selectedBucket.created_by,
        company_name: Auth.company_name,
        databucket_name: selectedBucket.name,
        datasets: arr,
        space: s,
      };
      console.log(obj);
      await axios({
        method: "post",
        url: `${URL}/automl/download_databucket_local/`,
        data: {
          company_id: Auth.company_id,
          user_id: selectedBucket.created_by,
          company_name: Auth.company_name,
          databucket_name: selectedBucket.name,
          datasets: arr,
          space: s,
        },
      })
        .then(function (response) {
          setloading(false);
          console.log(response);
          setdownloadLocalModal(false);
          fileDownload(response.data, "filename.zip");
        })
        .catch(function (error) {
          setloading(false);
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            setdownloadLocalModal(false);
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
    }
  };

  const showDownloadModal = async () => {
    if (tab === "Global Data") {
      setloading(true);
      await axios({
        method: "get",
        url: `${URL}/automl/download_databucket?company_id=${Auth.company_id}&created_by=${selectedBucket.created_by}&databucket_name=${selectedBucket.name}`,
      })
        .then(function (response) {
          setloading(false);
          setdownloadPopover(false);
          setdownloadModal(true);
          console.log(response);
          if (response.data) {
            settempDownloadDatasets(response.data);
          } else {
            settempDownloadDatasets(null);
          }
        })
        .catch(function (error) {
          setloading(false);
          setdownloadPopover(false);
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
    }
  };

  const showDownloadLocalModal = async () => {
    setloading(true);
    let s = "";
    let url = "";
    if (tab === "My Data") {
      s = "p";
      url = `${URL}/automl/datasets_list?company_id=${Auth.company_id}&user_id=${Auth.user_id}&databucket_name=${selectedBucket.name}&space=${s}`;
    } else if (tab === "Downloaded Data") {
      s = "d";
      url = `${URL}/automl/datasets_list?company_id=${Auth.company_id}&user_id=${Auth.user_id}&databucket_name=${selectedBucket.name}&space=${s}`;
    } else if (tab === "Global Data") {
      s = "s";
      url = `${URL}/automl/download_databucket?company_id=${Auth.company_id}&created_by=${selectedBucket.created_by}&databucket_name=${selectedBucket.name}`;
    }
    await axios({
      method: "get",
      url: url,
    })
      .then(function (response) {
        setloading(false);
        setdownloadPopover(false);
        setdownloadLocalModal(true);
        console.log(response);
        if (response.data) {
          settempDownloadLocalDatasets(response.data);
        } else {
          settempDownloadLocalDatasets(null);
        }
      })
      .catch(function (error) {
        setloading(false);
        setdownloadPopover(false);
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

  const renameBucket = async () => {
    if (editable === true) {
      if (title !== editabletitle || description !== editabledescription) {
        let updated = {};
        if (title !== editabletitle && description === editabledescription) {
          updated = { databucket_name: editabletitle };
        } else if (
          title === editabletitle &&
          description !== editabledescription
        ) {
          updated = { databucket_desc: editabledescription };
        } else if (
          title !== editabletitle &&
          description !== editabledescription
        ) {
          updated = {
            databucket_name: editabletitle,
            databucket_desc: editabledescription,
          };
        }
        setloading(true);
        let obj = {
          company_id: Auth.company_id,
          user_id: Auth.user_id,
          company_name: Auth.company_name,
          databucket_name: selectedBucket.name,
          update: updated,
        };
        console.log(obj);
        await axios({
          method: "post",
          url: `${URL}/automl/edit_databucket/`,
          data: {
            company_id: Auth.company_id,
            user_id: Auth.user_id,
            company_name: Auth.company_name,
            databucket_name: selectedBucket.name,
            update: updated,
          },
        })
          .then(function (response) {
            setloading(false);
            console.log(response);
            if (response.data === "Updated") {
              settitle(editabletitle);
              setdescription(editabledescription);
              setrecallAPI(!recallAPI);
            }
          })
          .catch(function (error) {
            setloading(false);
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              message.error("Error", error.response.status);
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
                setselectedBucket(null);
                seteditabledescription("");
                settitle("");
                seteditable(false);
                setdescription("");
                seteditabletitle("");
                setsearchval("");
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
                value={searchval}
                onChange={(e) => {
                  setselected(null);
                  setselectedBucket(null);
                  setresettable(!resettable);
                  setsearchval(e.target.value);
                }}
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
                showshareModal();
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
                  }}
                >
                  Download
                </span>
              </div>
            </Popover>
            <div
              style={
                selectedBucket && selectedBucket.created_by !== Auth.user_id
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
              onClick={() => {
                showDeleteModal();
              }}
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
                  marginRight: "15px",
                }}
              >
                Delete
              </span>
            </div>
          </div>
        </div>
        <div style={{ flexGrow: "1", overflow: "scroll" }}>
          <DataLakeDatabucketstable
            selected={(id, item) => {
              setDataBucket(id, item);
            }}
            recallAPI={recallAPI}
            SpaceInfo={(val) => setSpaceInfo(val)}
            tab={tab}
            reset={resettable}
            render={rendertable}
            value={searchval}
          />
        </div>
        <Button
          className="proceedButton"
          style={
            tab === "Removed Check"
              ? { display: "none" }
              : selected === null
              ? { opacity: "0.3", cursor: "not-allowed" }
              : null
          }
          onClick={() => {
            if (selected !== null) {
              proceed();
            }
          }}
        >
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
                maxLength={30}
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
          <Tooltip title="Discard">
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
              <img style={{ width: "20px" }} src={discardIcon} alt="icon" />
            </a>
          </Tooltip>
          <div
            style={
              tab === "My Data" && title !== ""
                ? { cursor: "pointer" }
                : { display: "none" }
            }
            onClick={() => {
              renameBucket();
              seteditable(!editable);
            }}
          >
            <Tooltip title={editable === true ? "Save" : "Edit"}>
              <img
                src={editable === true ? saveIcon : editIcon}
                alt="edit icon"
                style={{ width: "16px", marginBottom: "2px" }}
              ></img>
            </Tooltip>
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
        <div
          style={{
            marginTop: "15px",
            height: "110px",
            overflow: "hidden",
            flexGrow: "1",
          }}
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
            maxLength={300}
          />
        </div>{" "}
        <div style={tab === "My Data" ? null : { marginBottom: "11vh" }}>
          <DataLakeSpaceGraph data={SpaceInfo} />
          <div style={{ display: "flex", marginTop: "12px" }}>
            <img
              alt={"text"}
              src={darkBlueIcon}
              width={18}
              style={{ marginRight: "25px" }}
            />
            <span style={{ flexGrow: "1", fontSize: "13px", marginTop: "2px" }}>
              Free Space on Cloud
            </span>
            <span
              style={{ fontSize: "13px", marginTop: "2px", color: "#6d6d6d" }}
            >
              {SpaceInfo.free_space}
            </span>
          </div>
          <div style={{ display: "flex", marginTop: "12px" }}>
            <img
              alt={"text"}
              src={blueIcon}
              width={18}
              style={{ marginRight: "25px" }}
            />
            <span style={{ flexGrow: "1", fontSize: "13px", marginTop: "2px" }}>
              Used Space on Cloud
            </span>
            <span
              style={{ fontSize: "13px", marginTop: "2px", color: "#6d6d6d" }}
            >
              {SpaceInfo.used_space}
            </span>
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
          style={
            tab === "My Data"
              ? {
                  display: "flex",
                  height: "16px",
                  marginBottom: "10vh",
                  marginRight: "18px",
                  cursor: "pointer",
                }
              : { display: "none" }
          }
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
        {/* <div
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
        </div> */}
        <br />
      </Col>
      <DataLakeBucketShareModal
        data={selectedBucket}
        datasets={tempDatasets}
        isModalVisible={shareModal}
        handleCancel={() => {
          settempDatasets(null);
          setshareModal(false);
        }}
        handleOK={(data) => shareBucket(data)}
      />
      <BucketShareReplaceModal
        isModalVisible={ReplaceShareModal}
        handleCancel={() => setReplaceShareModal(false)}
        handleOK={() => confirmShare()}
      />
      <BucketShareReplaceModal
        isModalVisible={ReplaceDownloadModal}
        handleCancel={() => setReplaceDownloadModal(false)}
        handleOK={() => confirmDownload()}
      />
      <DataLakeBucketDownloadModal
        data={selectedBucket}
        datasets={tempDownloadDatasets}
        isModalVisible={downloadModal}
        handleCancel={() => {
          settempDownloadDatasets(null);
          setdownloadModal(false);
        }}
        handleOK={(data) => downloadBucket(data)}
      />
      <DataLakeBucketDownloadModal
        data={selectedBucket}
        datasets={tempDownloadLocalDatasets}
        isModalVisible={downloadLocalModal}
        handleCancel={() => {
          settempDownloadLocalDatasets(null);
          setdownloadLocalModal(false);
        }}
        handleOK={(data) => DownloadLocally(data)}
      />
      <DataLakeBucketDeleteModal
        data={selectedBucket}
        datasets={tempDeleteDatasets}
        isModalVisible={deleteModal}
        handleCancel={() => {
          settempDeleteDatasets(null);
          setdeleteModal(false);
        }}
        handleOK={(data) => deleteBucket(data)}
      />
      <DataLakeNewBucketModal
        isModalVisible={newBucketModal}
        handleCancel={() => setnewBucketModal(false)}
        recallAPI={() => {
          setnewBucketModal(false);
          setrecallAPI(!recallAPI);
        }}
        handleOK={(name, desc) => createNewBucket(name, desc)}
      />
      <DataLakeUploadDatasetModal
        isModalVisible={uploadDatasetModal}
        handleCancel={() => setuploadDatasetModal(false)}
        handleOK={() => startUploading()}
      />
      <div style={{ position: "fixed", bottom: "0", right: "0" }}>
        <UploadCollapsable />
      </div>
      <Cliploader loading={loading} handleCancel={() => setloading(false)} />
    </Row>
  );
}
