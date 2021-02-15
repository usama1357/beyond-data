import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

export default function AutoMLNewProjectButton(props) {
  return (
    <div>
      <Button
        style={{
          width: "65px",
          height: "46px",
          borderColor: "grey",
          borderRadius: "10px",
        }}
        onClick={() => props.createProject()}
        type="dashed"
        icon={<PlusOutlined style={{ fontSize: "30px", color: "grey" }} />}
      ></Button>
    </div>
  );
}
