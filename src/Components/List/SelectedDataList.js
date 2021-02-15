import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";
import "./SelectedDataList.scss";

export default function SelectedDataList(props) {
  return (
    <>
      {props.data.map((item, index) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "blue",
              width: "100%",
              padding: "17px",
              paddingLeft: "27px",
              height: "49px",
              marginBottom: "15px",
              background: "#FFFFFF",
              borderRadius: "10px",
            }}
            className="SelectedDataList"
          >
            <div
              style={{
                fontStyle: " normal",
                fontWeight: "normal",
                fontSize: "12px",
                lineHeight: "14px",
                color: "#6D6D6D",
              }}
            >
              {item}
            </div>
            <div
              style={{
                flexGrow: "1",
                textAlign: "right",
                fontSize: "20px",
                lineHeight: "14px",
                color: "#EC547A",
              }}
            >
              <CloseCircleOutlined
                style={{ backgroundColor: "#FDEEF2", borderRadius: "50%" }}
                className="icon"
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
