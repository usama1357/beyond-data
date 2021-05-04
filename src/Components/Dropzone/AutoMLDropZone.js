import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import uploadIcon from "../Icons/AutoML/uploadfile.svg";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  width: "30%",
  height: "130px",
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

export default function AutoMLDropZone(props) {
  const [file, setfile] = useState(null);

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: ".csv", maxFiles: 1 });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
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

  return (
    <div className="container">
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
      <ul>{files}</ul>
    </div>
  );
}

<AutoMLDropZone />;
