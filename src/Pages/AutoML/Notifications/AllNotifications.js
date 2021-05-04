import React from "react";
import shareicon from "../../../Components/Icons/AutoML/Notifications/sharenotify.svg";
import deleteicon from "../../../Components/Icons/AutoML/Notifications/deletenotify.svg";
import downloadicon from "../../../Components/Icons/AutoML/Notifications/downloadnotify.svg";
import trainicon from "../../../Components/Icons/AutoML/Notifications/trainnotify.svg";
import "./styles.css";

export default function AllNotifications() {
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
    {
      filename: "Custom Dataset",
      message: "has  been generated",
      date: "2/5/21",
      type: "generated",
    },
    {
      filename: "Custom Dataset",
      message: "has  been generated",
      date: "2/5/21",
      type: "generated",
    },
  ];

  return (
    <div
      style={{
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <h3 style={{ fontWeight: "700", marginTop: "2px", fontSize: "18px" }}>
        Notifications
      </h3>
      <hr
        style={{
          backgroundColor: "#E1EEFF",
          marginTop: "0px",
          marginBottom: "20px",
          border: "none",
          height: "1px",
          width: "100%",
        }}
      />
      <ul className="AllNotificationsList">
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
    </div>
  );
}
