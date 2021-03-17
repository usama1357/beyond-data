import React, { useEffect, useState } from "react";
import "./styles.css";
import upArrow from "../../Icons/AutoML/DatasetProcessing/uparrow.svg";
import Circle from "../../Icons/AutoML/DatasetProcessing/circle.svg";
import downArrow from "../../Icons/AutoML/DatasetProcessing/downarrow.svg";
import eye from "../../Icons/AutoML/DatasetProcessing/eye.svg";

export default function AutoMLDatasetProcessingList(props) {
  const [elements, setelements] = useState(props.data);

  const itemclicked = (id) => {
    let all = document.getElementsByClassName("array");
    for (var y of all) {
      y.id = "";
    }
    all[id].id = "selected";
    props.selected(id);
  };
  const clear = () => {
    let all = document.getElementsByClassName("array");
    for (var y of all) {
      y.id = "";
    }
  };

  const getlist = (elements) => {
    return elements.map((item, index) => {
      return (
        <li key={index} className="listitem">
          <div className="col1">
            <img
              onClick={() => {
                clear();
                props.moveup(index);
              }}
              src={upArrow}
              alt="uparrow"
              style={{ marginBottom: "5px", cursor: "pointer" }}
            />
            <img
              src={downArrow}
              onClick={() => {
                clear();
                props.movedown(index);
              }}
              alt="downarrow"
              style={{ marginBottom: "5px", cursor: "pointer" }}
            />
          </div>
          <div className="col2">
            <div className="title">{item.name}</div>
            <div className="array" onClick={() => itemclicked(index)}>
              {item.showncolumns.map((element, i) => {
                return (
                  <span key={i} className="column">
                    {element}
                  </span>
                );
              })}
              <img
                onClick={() => props.preview(item.key)}
                className="eye"
                src={eye}
                alt="eye"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </li>
      );
    });
  };

  return elements ? (
    <div className="AutoMLDatasetProcessingList">
      <ul>{getlist(elements)}</ul>
    </div>
  ) : (
    <div></div>
  );
}
