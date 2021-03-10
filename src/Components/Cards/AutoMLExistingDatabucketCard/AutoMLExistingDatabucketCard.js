import React from "react";
import dataBucket from "../../Icons/AutoML/SaveDatabucket/databucket.svg";
import "./styles.css";

export default function AutoMLExistingDatabucketCard(props) {
  return (
    <div className="AutoMLExistingDatabucketCard" key={props.key}>
      <div
        className={props.highlight === props.id ? "highlight" : "box"}
        onClick={() => props.selected(props.id)}
      >
        <img src={dataBucket} alt={"Data-bucket"} />
        <div className="text">{props.name}</div>
      </div>
    </div>
  );
}
