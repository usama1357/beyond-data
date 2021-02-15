/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

export default function AutoMLNewUpload() {
  const [loading, setloading] = useState(false);
  const [fileList, setfileList] = useState([]);
  const [imageUrl, setimageUrl] = useState(null);

  const options = {
    beforeUpload: (file) => {
      setfileList([file]);
      return false;
    },
    fileList,
    accept: ".pdf",
    multiple: false,
  };

  function beforeUpload(file) {
    // const csv = file.type === ".csv" || file.type === ".pdf";
    const csv = true;
    if (!csv) {
      message.error("You can only upload CSV file!");
    }
    return csv;
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      {...options}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
}
