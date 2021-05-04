import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import error404 from "../Images/Error/error404.svg";
import "./styles.css";
export default function Error404() {
  const history = useHistory();

  const goback = () => {
    history.goBack();
  };

  return (
    <div className={"Error404"}>
      <img
        src={error404}
        alt={"error"}
        style={{
          display: "block",
          margin: "auto",
          width: "25%",
          marginBottom: "0px",
        }}
      />
      <Button className="button" onClick={() => goback()}>
        Go Back
      </Button>
    </div>
  );
}
