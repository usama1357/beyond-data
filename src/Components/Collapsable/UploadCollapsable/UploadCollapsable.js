import { Collapse, Progress } from "antd";
import React, { useState } from "react";
import "./styles.css";
import icon from "../../Icons/DataLake/datasetIcon.svg";
import cross from "../../Icons/DataLake/cross.svg";

export default function UploadCollapsable() {
  const { Panel } = Collapse;

  const [list, setlist] = useState([
    { name: "file1", progress: 25, error: true },
    { name: "file1", progress: 53, error: false },
    { name: "file1", progress: 100, error: false },
  ]);

  function callback(key) {
    console.log(key);
  }

  const files = list.map((file, index) => (
    <div key={index}>
      <div style={{ display: "flex" }}>
        <img src={icon} alt="icon" width={15} style={{ marginRight: "12px" }} />{" "}
        <span
          style={{
            flexGrow: "1",
            fontStyle: "normal",
            fontSize: "14px",
            color: "#6d6d6d",
          }}
        >
          {file.name}
        </span>{" "}
        <img src={cross} alt="icon" width={8} />
      </div>
      <Progress
        percent={file.progress}
        size="small"
        status={file.error ? "exception" : "normal"}
      />
    </div>
  ));

  return (
    <div className="UploadCollapsable">
      <Collapse onChange={callback} expandIconPosition={"right"}>
        <Panel header="Uploading Files" key="1">
          {files}
        </Panel>
      </Collapse>
    </div>
  );
}
