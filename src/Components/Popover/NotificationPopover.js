import React from "react";
import "./styles.css";
import shareicon from "../Icons/AutoML/Notifications/sharenotify.svg";
import deleteicon from "../Icons/AutoML/Notifications/deletenotify.svg";
import downloadicon from "../Icons/AutoML/Notifications/downloadnotify.svg";
import trainicon from "../Icons/AutoML/Notifications/trainnotify.svg";
import { useHistory } from "react-router-dom";

export default function NotificationPopover() {
  let history = useHistory();

  let data = [
    {
      filename: "HBL 2019",
      message: "has  been deleted",
      date: "Just now",
      type: "deleted",
    },
    {
      filename: "BAHL 2020",
      message: "has shared successfully",
      date: "Yesterday",
      type: "shared",
    },
    {
      filename: "Custom Dataset",
      message: "has  been generated",
      date: "2/5/21",
      type: "generated",
    },
    {
      filename: "HBL 2019",
      message: "has  been deleted",
      date: "Just now",
      type: "deleted",
    },
    {
      filename: "BAHL 2020",
      message: "has shared successfully",
      date: "Yesterday",
      type: "shared",
    },
    {
      filename: "Custom Dataset",
      message: "has  been generated",
      date: "2/5/21",
      type: "generated",
    },
  ];

  const navigate = () => {
    history.push({
      pathname: `/automl/all_notifications/`,
      state: { detail: "I am from Models page" },
    });
  };

  return (
    <>
      <ul className="NotificationPopover">
        {data.map((item, index) => (
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
                <span className="title">"{item.filename}"</span> {item.message}{" "}
              </span>
              <p className="date">{item.date}</p>
            </div>
          </li>
        ))}
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
