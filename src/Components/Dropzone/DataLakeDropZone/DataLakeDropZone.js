import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import uploadIcon from "../../Icons/AutoML/uploadfile.svg";
import "./styles.css";
import closeIcon from "../../Icons/AutoML/closeicon.svg";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "230px",
  alignItems: "center",
  padding: "60px",
  borderWidth: 2,
  border: "1px dashed #6D6D6D",
  boxSizing: "border-box",
  borderRadius: "10px",
  backgroundColor: "white",
  color: "#bdbdbd",
  cursor: "pointer",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function DataLakeDropZone(props) {
  const [file, setfile] = useState([]);
  const [render, setrender] = useState(false);

  let count = 0;

  const fileSizeValidator = (file) => {
    if (file.size > 2000000) {
      return {
        code: "File Size too large",
        message: `Size is larger than 3 mb (Example)`,
      };
    }
  };

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    fileRejections,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: ".csv",
    multiple: true,
    // maxFiles: 5,
    validator: fileSizeValidator,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const rejected = fileRejections.map((file) => (
    <li key={file.file.path}>
      {file.file.path} - {file.file.size} bytes {file.errors[0].message}
    </li>
  ));

  useEffect(() => {
    let temp = file;
    let len = file.length;
    acceptedFiles.map((file) => {
      if (len < 5) {
        temp.push({ file: file, correct: true });
      } else {
        temp.push({
          file: file,
          correct: false,
          error: { message: "Length Exceeded" },
        });
      }
    });
    fileRejections.map((item) => {
      temp.push({ file: item.file, correct: false, error: item.errors[0] });
    });
    setfile(temp);
    setrender(!render);
    // console.log(file);
  }, [acceptedFiles, fileRejections]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  useEffect(() => {
    props.setFile(file);
  }, [file]);

  const removeFile = (index) => {
    console.log(index);
    let temp = file;
    temp.splice(index, 1);
    setfile(temp);
    setrender(!render);
  };

  return (
    <div className="DataLakeDropZone">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <br />
        <img src={uploadIcon} alt="upload" />
        <p style={{ fontSize: "13px", color: "#6d6d6d" }}>
          Drop a local file here, or{" "}
          <span style={{ color: "#085fab" }}>Browse</span>
        </p>
      </div>
      <h4>Uploaded File</h4>
      {file.map((element, index) =>
        element.correct === true ? (
          <div className="accepted" key={index}>
            <div className="file">
              <span
                style={{
                  flexGrow: "1",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {element.file.path} - {(element.file.size / 1048576).toFixed(2)}{" "}
                MBs
              </span>
              <img
                src={closeIcon}
                alt="icon"
                style={{ cursor: "pointer" }}
                onClick={() => removeFile(index)}
              />
            </div>{" "}
          </div>
        ) : (
          <div className="accepted" key={index}>
            <div className="rejectedFile">
              {console.log(element.error.message)}
              <span
                style={{
                  flexGrow: "1",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {element.file.path} - {(element.file.size / 1048576).toFixed(2)}{" "}
                MBs
              </span>
              <img
                src={closeIcon}
                alt="icon"
                style={{ cursor: "pointer" }}
                onClick={() => removeFile(index)}
              />
            </div>{" "}
          </div>
        )
      )}
      {/* {acceptedFiles.map((element) => (
        <div className="accepted">
          <div className="file">
            <span
              style={{
                flexGrow: "1",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {element.path} - {(element.size / 1048576).toFixed(2)} MBs
            </span>
            <img
              src={closeIcon}
              alt="icon"
              style={{ cursor: "pointer" }}
              // onClick={() => setfileList(null)}
            />
          </div>{" "}
        </div>
      ))}
      {fileRejections.map((element) => (
        <div className="accepted">
          <div className="rejectedFile">
            {console.log(element.errors[0].message)}
            <span
              style={{
                flexGrow: "1",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {element.file.path} - {(element.file.size / 1048576).toFixed(2)}{" "}
              MBs
            </span>
            <img
              src={closeIcon}
              alt="icon"
              style={{ cursor: "pointer" }}
              // onClick={() => setfileList(null)}
            />
          </div>{" "}
        </div>
      ))} */}
      {/* <ul>{files}</ul> */}
      {/* <ul>{rejected}</ul> */}
    </div>
  );
}

<DataLakeDropZone />;
