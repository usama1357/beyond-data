import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";
import "./SelectedDataList.scss";
import DeleteIcon from "../Icons/AutoML/deleteDatasetIcon.svg";

export default function SelectedDataList(props) {
  return (
    <>
      {props.data
        ? props.data.map((item, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "blue",
                  width: "100%",
                  padding: "17px",
                  paddingTop: "12px",
                  paddingLeft: "27px",
                  height: "40px",
                  marginBottom: "15px",
                  background: "#FFFFFF",
                  borderRadius: "10px",
                }}
                key={index}
                className="SelectedDataList"
              >
                <div
                  style={{
                    fontStyle: " normal",
                    fontWeight: "normal",
                    fontSize: "14px",
                    lineHeight: "14px",
                    color: "#6D6D6D",
                  }}
                >
                  {item.data.name}
                </div>
                <div
                  style={{
                    flexGrow: "1",
                    textAlign: "right",
                    fontSize: "20px",
                    lineHeight: "14px",
                    color: "#EC547A",
                  }}
                  onClick={() => props.delete(item)}
                >
                  <img
                    src={DeleteIcon}
                    alt={"Delete"}
                    style={{
                      cursor: "pointer",
                      marginTop: "-4px",
                      width: "18px",
                    }}
                  />
                </div>
              </div>
            );
          })
        : null}
    </>
  );
}
