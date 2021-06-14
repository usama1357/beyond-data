import { Breadcrumb } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";

export default function DataLakeBreadcrumbs() {
  let location = useLocation();
  let link = location.pathname.split("/");
  let bucket = JSON.parse(localStorage.getItem("Bucket"));
  let paths = null;

  if (link.includes("concat")) {
    paths = [
      { name: "Databuckets", link: "/datalake/databuckets/" },
      {
        name: "Datasets",
        link: `/datalake/${bucket.bucket.name}/datasets`,
      },
      {
        name: "Concatenation",
        link: `#`,
      },
    ];
  } else if (link.includes("configure")) {
    paths = [
      { name: "Databuckets", link: "/datalake/databuckets/" },
      {
        name: "Datasets",
        link: `/datalake/${bucket.bucket.name}/datasets`,
      },
      {
        name: "Configure",
        link: `#`,
      },
    ];
  } else if (link.includes("datasets")) {
    paths = [
      { name: "Databuckets", link: "/datalake/databuckets/" },
      {
        name: "Datasets",
        link: `#`,
      },
    ];
  } else if (link.includes("databuckets")) {
    paths = [{ name: "Databuckets", link: "#" }];
  }

  return (
    <div className="DataLakeBreadcrumbs">
      <Breadcrumb
        style={{ marginLeft: "8em", marginTop: "10px", textAlign: "left" }}
      >
        {paths
          ? paths.map((item, index) => (
              <Breadcrumb.Item key={index}>
                <Link
                  to={item.link}
                  className={item.disabled ? "disabled" : "notdisabled"}
                >
                  {item.name}
                </Link>
              </Breadcrumb.Item>
            ))
          : null}
      </Breadcrumb>
    </div>
  );
}
