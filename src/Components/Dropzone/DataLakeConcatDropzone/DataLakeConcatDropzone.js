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
  height: "100%",
  alignItems: "center",
  padding: "20px",
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

export default function DataLakeConcatDropzone(props) {
  const [fileList, setfileList] = useState(null);
  const [count, setcount] = useState(0);

  const fileSizeValidator = (file) => {
    console.log(file);
    if (file.size > 8000) {
      setfileList(file);
      return {
        code: "File Size too large",
        message: `Size is larger than 3 mb (Example)`,
      };
    } else {
      setfileList(file);
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
    accept: ".xlsx,.csv",
    maxFiles: 1,
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
    if (fileList !== null) {
      props.savefile(fileList);
    }
  }, [fileList]);

  return (
    <div className="DataLakeConcatDropzone" style={{ height: "inherit" }}>
      {fileList ? (
        <div className="file">
          <span style={{ flexGrow: "1" }}>
            {fileList.path} - {(fileList.size / 1048576).toFixed(2)} MBs
          </span>
          <img
            src={closeIcon}
            alt="icon"
            style={{ cursor: "pointer" }}
            onClick={() => setfileList(null)}
          />
        </div>
      ) : (
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          {/* <br /> */}
          <img src={uploadIcon} alt="upload" />
          <p style={{ fontSize: "13px", color: "#6d6d6d" }}>
            Drop a local file here, or{" "}
            <span style={{ color: "#085fab" }}>Browse</span>
          </p>
        </div>
      )}
      {/* <h4>Uploaded File</h4>
      <ul>{files}</ul>
      <ul>{rejected}</ul> */}
    </div>
  );
}

<DataLakeConcatDropzone />;
