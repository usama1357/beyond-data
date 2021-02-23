import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import "./AutoMLNewModelButton.css";

export default function AutoMLNewModelButton(props) {
  return (
    <div className="AutoMLNewModelButton">
      <Button
        style={{
          width: "62px",
          height: "46px",
          borderColor: "#085FAB",
          borderRadius: "10px",
        }}
        onClick={() => props.createModel()}
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
