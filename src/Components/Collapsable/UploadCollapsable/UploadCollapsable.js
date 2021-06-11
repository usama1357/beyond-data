import { Collapse, Progress } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import icon from "../../Icons/DataLake/datasetIcon.svg";
import cross from "../../Icons/DataLake/cross.svg";
import { DataLakeFileUploadContext } from "../../../Data/Contexts/DataLakeFileUploadContext/DataLakeFileUploadContext";

export default function UploadCollapsable() {
  const { Panel } = Collapse;

  const { Files, deleteFile } = useContext(DataLakeFileUploadContext);

  const [Title, setTitle] = useState("");
  const [list, setlist] = useState([
    { name: "file1", progress: 25, error: true },
    { name: "file1", progress: 53, error: false },
    { name: "file1", progress: 100, error: false },
  ]);
  const [render, setrender] = useState(false);

  useEffect(() => {
    let temp = [];
    Files.files.forEach((element) => {
      if (element.correct === true) {
        let progress = Files.progress[element.file.path]
          ? Files.progress[element.file.path]
          : null;
        temp.push({
          name: element.file.path,
          progress: progress,
          error:
            Files.error && Files.error[element.file.path] !== null
              ? Files.error[element.file.path]
              : false,
          // error: false,
        });
      }
    });
    console.log(temp);
    setlist(temp);
    setrender(!render);
  }, [Files]);

  useEffect(() => {
    let text = "Uploaded";
    if (list) {
      list.forEach((element) => {
        if (element.progress < 100) {
          text = "Uploading";
        }
      });
    } else {
      text = "Upload";
    }
    setTitle(text);
  }, [list]);

  function callback(key) {
    console.log(key);
  }

  const removefile = (index, file) => {
    let temp = [];
    list.forEach((element) => {
      temp.push(element);
    });
    if (temp.length === 1) {
      temp = null;
    } else {
      temp = temp.splice(index, 1);
      console.log(temp);
    }
    setlist(temp);
    setrender(!render);
  };

  const files =
    list || list.length !== 0
      ? list.map((file, index) => (
          <div key={index}>
            <div style={{ display: "flex" }}>
              <img
                src={icon}
                alt="icon"
                width={15}
                style={{ marginRight: "12px" }}
              />{" "}
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
              <img
                src={cross}
                alt="icon"
                width={8}
                style={{ cursor: "pointer" }}
                onClick={() => deleteFile(index, file)}
              />
            </div>
            <Progress
              percent={file.progress}
              size="small"
              status={
                file.error
                  ? "exception"
                  : file.progress === 100
                  ? "success"
                  : "normal"
              }
            />
          </div>
        ))
      : null;

  return (
    <div className="UploadCollapsable">
      {list ? (
        <Collapse
          onChange={callback}
          defaultActiveKey="1"
          expandIconPosition={"right"}
          style={list.length === 0 ? { display: "none" } : null}
        >
          <Panel header={`${Title} Files`} key="1">
            {files}
          </Panel>
        </Collapse>
      ) : null}
    </div>
  );
}
