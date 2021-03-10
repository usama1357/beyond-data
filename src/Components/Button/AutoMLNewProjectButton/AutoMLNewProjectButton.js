import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import "./AutoMLNewProjectButton.css";

export default function AutoMLNewProjectButton(props) {
  return (
    <div className="AutoMLNewProjectButton">
      <Button
        style={{
          width: "62px",
          height: "46px",
          borderColor: "#085FAB",
          borderRadius: "10px",
          // backgroundImage:
          //   "url(data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e)",
        }}
        onClick={() => props.createProject()}
        type="dashed"
        icon={
          <PlusOutlined
            style={{
              fontSize: "30px",
              fontWeight: "700",
              color: "#085FAB",
              paddingTop: "5px",
            }}
          />
        }
      ></Button>
    </div>
  );
}
