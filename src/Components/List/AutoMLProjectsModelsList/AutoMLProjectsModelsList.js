import React from "react";

export default function AutoMLProjectsModelsList(props) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: "18px",
          paddingTop: "0px",
          paddingBottom: "0px",
          marginRight: "15px",
        }}
      >
        <p style={{ width: "40%", marginBottom: "0px" }}></p>
        <p
          style={{
            width: "30%",
            fontFamily: "Lato",
            fontSize: "14px",
            marginBottom: "0px",
          }}
        >
          Model Type
        </p>
        <p
          style={{
            width: "30%",
            fontFamily: "Lato",
            fontSize: "14px",
            marginBottom: "0px",
          }}
        >
          Last Updated
        </p>
      </div>
      {props.data.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              background: "#F5FAFF",
              borderRadius: "8px",
              padding: "13px",
              paddingLeft: "18px",
              marginBottom: "10px",
              height: "50px",
            }}
          >
            <p
              style={{
                width: "40%",
                fontFamily: "Lato",
                fontWeight: "700",
                fontSize: "14px",
                color: "#707070",
              }}
            >
              {item.model_name}
            </p>
            <p
              style={{
                width: "30%",
                fontFamily: "Lato",
                fontWeight: "500",
                fontSize: "13px",
                color: "#707070",
              }}
            >
              {item.model_type}
            </p>
            <p
              style={{
                width: "30%",
                fontFamily: "Lato",
                fontWeight: "500",
                fontSize: "13px",
                color: "#707070",
              }}
            >
              {item.model_last_modified}
            </p>
          </div>
        );
      })}
    </div>
  );
}
