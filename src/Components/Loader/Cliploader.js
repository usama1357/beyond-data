import React from "react";
// import PuffLoader from "react-spinners/PuffLoader";
import { GuardSpinner } from "react-spinners-kit";
import { css } from "@emotion/react";

export default function Cliploader(props) {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #085fab;
    margin-top: 35vh;
    border-width: 10px;
  `;

  return (
    <div
      style={
        props.loading
          ? {
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              // opacity: "0.3",
              // background: "#000",
              width: "100%",
              height: "100%",
              zIndex: "10",
              top: "0",
              left: "0",
              position: "fixed",
            }
          : { display: "none" }
      }
    >
      <div
        style={{
          display: "block",
          margin: "0 auto",
          borderColor: "#085fab",
          marginTop: "35vh",
          marginLeft: "50%",
          borderWidth: "10px",
        }}
      >
        <GuardSpinner
          frontColor="#085fab"
          backColor="#e1eeff"
          loading={props.loading}
          // css={override}
          size={45}
        />
      </div>
    </div>
  );
}