import React from "react";
import icon from "../Icons/DataLake/noData.svg";
export default function NoData(props) {
  return (
    <div
      style={{
        display: "block",
        margin: "auto",
        textAlign: "center",
        marginTop: "40px",
      }}
    >
      <img src={icon} alt="nodata" width={150} />
      {/* <h2 style={{ fontSize: "14px", color: "#A1A1A1" }}>
        {props.text ? props.text : "Nothing to show"}
      </h2> */}
    </div>
  );
}
