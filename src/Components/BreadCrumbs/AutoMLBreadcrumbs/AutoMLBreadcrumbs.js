import { Breadcrumb } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";

export default function AutoMLBreadcrumbs() {
  let location = useLocation();
  let paths = location.pathname.split("/");

  return (
    <>
      <Breadcrumb
        style={{ marginLeft: "8em", marginTop: "10px", textAlign: "left" }}
      >
        {paths
          ? paths.map((item, index) => (
              <Breadcrumb.Item href="#" key={index}>
                {item}
              </Breadcrumb.Item>
            ))
          : null}
      </Breadcrumb>
    </>
  );
}
