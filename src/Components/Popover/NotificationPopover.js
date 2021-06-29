import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import sharing_started from "../Icons/AutoML/Notifications/sharenotify.svg";
import deleteicon from "../Icons/AutoML/Notifications/deletenotify.svg";
import downloading_started from "../Icons/AutoML/Notifications/downloadnotify.svg";
import trainicon from "../Icons/AutoML/Notifications/trainnotify.svg";
import sharing_completed from "../Icons/AutoML/Notifications/share_completed.svg";
import downloading_completed from "../Icons/AutoML/Notifications/download_completed.svg";
import file_uploaded from "../Icons/AutoML/Notifications/file_uploaded.svg";
import data_configured from "../Icons/AutoML/Notifications/data_configured.svg";
import data_concatenated from "../Icons/AutoML/Notifications/concat_completed.svg";
import { useHistory } from "react-router-dom";
import { NotificationsContext } from "../../Data/Contexts/AutoMLNotifications/AutoMLNotificationsContext";
import { DataLakeBucketContext } from "../../Data/Contexts/DataLake/DataLakeBucketContext/DataLakeBucketContext";
import { Tooltip } from "antd";

export default function NotificationPopover() {
  let history = useHistory();

  const { Notifications } = useContext(NotificationsContext);
  const [data, setdata] = useState(null);
  const [render, setrender] = useState(false);

  const { setBucket } = useContext(DataLakeBucketContext);

  // let data = [
  //   {
  //     filename: "HBL 2019",
  //     message: "has  been deleted",
  //     date: "Just now",
  //     type: "deleted",
  //   },
  //   {
  //     filename: "BAHL 2020",
  //     message: "has shared successfully",
  //     date: "Yesterday",
  //     type: "shared",
  //   },
  //   {
  //     filename: "Custom Dataset",
  //     message: "has  been generated",
  //     date: "2/5/21",
  //     type: "generated",
  //   },
  //   {
  //     filename: "HBL 2019",
  //     message: "has  been deleted",
  //     date: "Just now",
  //     type: "deleted",
  //   },
  //   {
  //     filename: "BAHL 2020",
  //     message: "has shared successfully",
  //     date: "Yesterday",
  //     type: "shared",
  //   },
  //   {
  //     filename: "Custom Dataset",
  //     message: "has  been generated",
  //     date: "2/5/21",
  //     type: "generated",
  //   },
  // ];

  useEffect(() => {
    if (Notifications.Notifications) {
      let temp = [];
      Notifications.Notifications.forEach((element) => {
        let type = element.tag.split("_")[1];
        let info = {};
        if (type === "downloading") {
          type = "downloaded";
          info = {
            screen: "databuckets",
            tab: "downloaded",
            bucket: {
              name: element.path_info ? element.path_info.databucket : "",
              created_by: element.path_info ? element.path_info.created_by : "",
            },
            filename: element.object_name ? element.object_name : null,
          };
        } else if (type === "sharing") {
          type = "shared";
          info = {
            screen: "databuckets",
            tab: "global",
            bucket: {
              name: element.path_info ? element.path_info.databucket : "",
              created_by: element.path_info ? element.path_info.created_by : "",
            },
            filename: element.object_name ? element.object_name : null,
          };
          // }
        } else if (
          type === "generating" ||
          type === "processing" ||
          type === "concatenation"
        ) {
          type = "generated";
          info = {
            screen: "databuckets",
            tab: "global",
            bucket: {
              name: element.path_info ? element.path_info.databucket : "",
              created_by: element.path_info ? element.path_info.created_by : "",
            },
            filename: element.object_name ? element.object_name : null,
          };
        } else if (type === "deleting") {
          type = "deleted";
          info = { screen: "databuckets", tab: "my" };
        } else {
          type = "";
          info = {
            screen: "",
            tab: "",
            filename: element.object_name ? element.object_name : null,
          };
        }
        let icon = "";
        let tag = "";
        if (
          element.tag.includes("sharing") &&
          element.tag.includes("started")
        ) {
          icon = "sharing_started";
          tag = "Sharing Started";
        }
        if (
          element.tag.includes("sharing") &&
          element.tag.includes("completed")
        ) {
          icon = "sharing_completed";
          tag = "Sharing Completed";
        }
        if (
          element.tag.includes("downloading") &&
          element.tag.includes("started")
        ) {
          icon = "downloading_started";
          tag = "Downloading Started";
        }
        if (
          element.tag.includes("downloading") &&
          element.tag.includes("completed")
        ) {
          icon = "downloading_completed";
          tag = "Downloading Completed";
        }
        if (
          element.tag.includes("processing") &&
          element.tag.includes("completed") &&
          element.tag.includes("dataset")
        ) {
          icon = "file_uploaded";
          tag = "File Uploaded";
        }
        if (
          element.tag.includes("concatenation") &&
          element.tag.includes("completed") &&
          element.tag.includes("dataset")
        ) {
          icon = "data_concatenated";
          tag = "Dataset Concatenated";
        }
        if (
          element.tag.includes("completed") &&
          element.tag.includes("configuration") &&
          element.tag.includes("dataset")
        ) {
          icon = "data_configured";
          tag = "Dataset Configured";
        }
        temp.push({
          tag: tag,
          filename: info.filename,
          message: element.message,
          date: element.time,
          type: type,
          info: info,
          icon: icon,
        });
      });
      temp.reverse();
      console.log(temp);
      setdata(temp);
      setrender(!render);
    }
  }, [Notifications]);

  const navigate = () => {
    history.push({
      pathname: `/automl/all_notifications/`,
      state: { detail: "I am from Models page" },
    });
  };

  const notificationClicked = async (item) => {
    if (
      item.message.includes("has been processed") ||
      item.message.includes("has been concatenated")
      //  ||
      // item.message.includes("has been configured")
    ) {
      await setBucket({
        bucket: {
          created_by: item.info.bucket.created_by,
          desc: "",
          last_modified: "",
          name: item.info.bucket.name,
          size: "",
        },
        type: "My Data",
      });
      history.push({
        pathname: `/datalake/${item.info.bucket.name}/datasets`,
        state: {
          info: item.info,
          detail: "I am from Databuckets Screen",
          page_name: "Datasets_Screen",
        },
      });
    }
    if (item.message.includes("has been shared")) {
      await setBucket({
        bucket: {
          created_by: item.info.bucket.created_by,
          desc: "",
          last_modified: "",
          name: item.info.bucket.name,
          size: "",
        },
        type: "Global Data",
      });
      history.push({
        pathname: `/datalake/${item.info.bucket.name}/datasets`,
        state: {
          info: item.info,
          detail: "I am from Databuckets Screen",
          page_name: "Datasets_Screen",
        },
      });
    }
    if (item.message.includes("has been downloaded")) {
      await setBucket({
        bucket: {
          created_by: item.info.bucket.created_by,
          desc: "",
          last_modified: "",
          name: item.info.bucket.name,
          size: "",
        },
        type: "Downloaded Data",
      });
      history.push({
        pathname: `/datalake/${item.info.bucket.name}/datasets`,
        state: {
          info: item.info,
          detail: "I am from Databuckets Screen",
          page_name: "Datasets_Screen",
        },
      });
    }
    // if (
    //   item.info.screen === "databuckets" &&
    //   item.message.includes("has been")
    // ) {
    //   history.push({
    //     pathname: `/datalake/databuckets`,
    //     state: {
    //       info: item.info,
    //       detail: "I am from Databuckets Screen",
    //       page_name: "Datasets_Screen",
    //     },
    //   });
    // }
  };

  return (
    <>
      <ul className="NotificationPopover">
        {data
          ? data.map((item, index) => (
              <li key={index} onClick={() => notificationClicked(item)}>
                <Tooltip title={item.tag} color={"#343649"}>
                  <div
                    style={{
                      display: "inline-block",
                      width: "40px",
                      // backgroundColor: "red",
                      verticalAlign: "top",
                    }}
                  >
                    <img
                      src={
                        item.icon === "file_uploaded"
                          ? file_uploaded
                          : item.icon === "sharing_started"
                          ? sharing_started
                          : item.icon === "downloading_started"
                          ? downloading_started
                          : item.icon === "sharing_completed"
                          ? sharing_completed
                          : item.icon === "downloading_completed"
                          ? downloading_completed
                          : item.icon === "data_concatenated"
                          ? data_concatenated
                          : item.icon === "data_configured"
                          ? data_configured
                          : null
                      }
                      alt="icon"
                    />
                  </div>
                </Tooltip>
                <div
                  style={{
                    display: "inline-block",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    width: "250px",
                  }}
                >
                  <span>
                    <span className="title">{item.filename}</span>{" "}
                    {/* {item.message}{" "} */}
                  </span>
                  <p className="date">{item.date}</p>
                </div>
              </li>
            ))
          : null}
      </ul>
      <p
        style={{
          textAlign: "center",
          fontSize: "12px",
          color: "#a1a1a1",
          backgroundColor: "#F5FAFF",
          margin: "0px",
          paddingTop: "10px",
          paddingBottom: "10px",
          cursor: "pointer",
          borderRadius: "8px",
        }}
        onClick={() => navigate()}
      >
        View all notifications
      </p>
    </>
  );
}
