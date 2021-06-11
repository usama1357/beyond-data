import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import shareicon from "../Icons/AutoML/Notifications/sharenotify.svg";
import deleteicon from "../Icons/AutoML/Notifications/deletenotify.svg";
import downloadicon from "../Icons/AutoML/Notifications/downloadnotify.svg";
import trainicon from "../Icons/AutoML/Notifications/trainnotify.svg";
import { useHistory } from "react-router-dom";
import { NotificationsContext } from "../../Data/Contexts/AutoMLNotifications/AutoMLNotificationsContext";

export default function NotificationPopover() {
  let history = useHistory();

  const { Notifications } = useContext(NotificationsContext);
  const [data, setdata] = useState(null);
  const [render, setrender] = useState(false);

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
    // {
    //   filename: "HBL 2019",
    //   message: "has  been deleted",
    //   date: "Just now",
    //   type: "deleted",
    // },
    console.log(Notifications);
    if (Notifications.Notifications) {
      let temp = [];
      Notifications.Notifications.forEach((element) => {
        let type = element.tag.split("_")[1];
        if (type === "downloading") {
          type = "downloaded";
        }
        if (type === "sharing") {
          type = "shared";
        }
        if (
          type === "generating" ||
          type === "processing" ||
          type === "concatenation"
        ) {
          type = "generated";
        }
        if (type === "deleting") {
          type = "deleted";
        }
        temp.push({
          filename: "",
          message: element.message,
          date: element.time,
          type: type,
        });
      });
      temp.reverse();
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

  return (
    <>
      <ul className="NotificationPopover">
        {data
          ? data.map((item, index) => (
              <li key={index}>
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
                      item.type === "deleted"
                        ? deleteicon
                        : item.type === "shared"
                        ? shareicon
                        : item.type === "downloaded"
                        ? downloadicon
                        : item.type === "generated"
                        ? trainicon
                        : null
                    }
                    alt="icon"
                  />
                </div>
                <div style={{ display: "inline-block" }}>
                  <span>
                    <span className="title">"{item.filename}"</span>{" "}
                    {item.message}{" "}
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
