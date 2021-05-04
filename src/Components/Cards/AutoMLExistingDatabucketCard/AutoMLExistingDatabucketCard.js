import React from "react";
import dataBucket from "../../Icons/AutoML/SaveDatabucket/databucket.svg";
import "./styles.css";
import cross from "../../../Components/Icons/AutoML/crossbucket.svg";

export default function AutoMLExistingDatabucketCard(props) {
  return (
    <div className="AutoMLExistingDatabucketCard">
      {props.created === true && props.id === props.length - 1 ? (
        <img
          className={props.highlight === props.id ? "whiteicon" : "normal"}
          src={cross}
          alt="crossicon"
          style={{
            position: "absolute",
            marginLeft: "78px",
            marginTop: "4px",
            width: "18px",
            cursor: "pointer",
          }}
          onClick={() => props.remove()}
        />
      ) : null}
      <div
        className={props.highlight === props.id ? "highlight" : "box"}
        onClick={() => props.selected(props.id)}
      >
        <img src={dataBucket} alt={"Data-bucket"} style={{ width: "20px" }} />
        <div className="text">{props.name}</div>
      </div>
    </div>
  );
}
