import { Breadcrumb } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";

export default function AutoMLBreadcrumbs() {
  let location = useLocation();
  let link = location.pathname.split("/");
  let project = JSON.parse(localStorage.getItem("Project"));
  let paths = null;
  if (link.includes("predict_model") && link.includes("upload_dataset")) {
    paths = [
      { name: "projects", link: "/automl/projects/" },
      {
        name: "models",
        link: `/automl/projects/${project.name}/models`,
      },
      {
        name: "prediction",
        link: `#`,
      },
    ];
  } else if (
    link.includes("retrain_model") &&
    link.includes("feature_selection")
  ) {
    paths = [
      { name: "projects", link: "/automl/projects/" },
      {
        name: "models",
        link: `/automl/projects/${project.name}/models`,
      },
      {
        name: "upload dataset",
        link: `/automl/projects/${project.name}/models/$modelname$/retrain_model/upload_dataset/`,
      },
      {
        name: "feature selection",
        link: `#`,
      },
    ];
  } else if (
    link.includes("retrain_model") &&
    link.includes("upload_dataset")
  ) {
    paths = [
      { name: "projects", link: "/automl/projects/" },
      {
        name: "models",
        link: `/automl/projects/${project.name}/models`,
      },
      {
        name: "upload dataset",
        link: `#`,
      },
    ];
  } else if (link.includes("modify_model") && link.includes("correlation")) {
    paths = [
      { name: "projects", link: "/automl/projects/" },
      {
        name: "models",
        link: `/automl/projects/${project.name}/models`,
      },
      {
        name: "target selection",
        link: `/automl/projects/${project.name}/models/$modelname$/modify_model/feature_selection/`,
      },
      {
        name: "data correlation",
        link: `#`,
      },
    ];
  } else if (link.includes("modify_model")) {
    paths = [
      { name: "projects", link: "/automl/projects/" },
      {
        name: "models",
        link: `/automl/projects/${project.name}/models`,
      },
      {
        name: "target selection",
        link: `#`,
      },
    ];
  } else if (link.includes("correlation")) {
    paths = [
      { name: "projects", link: "/automl/projects/" },
      {
        name: "models",
        link: `/automl/projects/${project.name}/models`,
      },
      {
        name: "select datasets",
        link: `#`,
        disabled: true,
      },
      {
        name: "selected datasets",
        link: `#`,
        disabled: true,
      },
      {
        name: "dataset processing",
        link: `#`,
        disabled: true,
      },
      {
        name: "link columns",
        link: `#`,
        disabled: true,
      },
      {
        name: "target selection",
        link: `/automl/projects/${project.name}/models/$modelname$/customised_dataset`,
      },
      {
        name: "correlation",
        link: `#`,
      },
    ];
  } else if (link.includes("customised_dataset")) {
    paths = [
      { name: "projects", link: "/automl/projects/" },
      {
        name: "models",
        link: `/automl/projects/${project.name}/models`,
      },
      {
        name: "select datasets",
        link: `#`,
        disabled: true,
      },
      {
        name: "selected datasets",
        link: `#`,
        disabled: true,
      },
      {
        name: "dataset processing",
        link: `#`,
        disabled: true,
      },
      {
        name: "link columns",
        link: `#`,
        disabled: true,
      },
      {
        name: "target selection",
        link: `#`,
      },
    ];
  } else if (link.includes("link_columns")) {
    paths = [
      { name: "projects", link: "/automl/projects/" },
      {
        name: "models",
        link: `/automl/projects/${project.name}/models`,
      },
      {
        name: "select datasets",
        link: `/automl/projects/${project.name}/models/$modelname$/select_datasets`,
      },
      {
        name: "selected datasets",
        link: `/automl/projects/${project.name}/models/$modelname$/selected_datasets`,
      },
      {
        name: "dataset processing",
        link: `/automl/projects/${project.name}/models/$modelname$/dataset_processing`,
      },
      {
        name: "link columns",
        link: `#`,
      },
    ];
  } else if (link.includes("dataset_processing")) {
    paths = [
      { name: "projects", link: "/automl/projects/" },
      {
        name: "models",
        link: `/automl/projects/${project.name}/models`,
      },
      {
        name: "select datasets",
        link: `/automl/projects/${project.name}/models/$modelname$/select_datasets`,
      },
      {
        name: "selected datasets",
        link: `/automl/projects/${project.name}/models/$modelname$/selected_datasets`,
      },
      {
        name: "dataset processing",
        link: `#`,
      },
    ];
  } else if (link.includes("selected_datasets")) {
    paths = [
      { name: "projects", link: "/automl/projects/" },
      {
        name: "models",
        link: `/automl/projects/${project.name}/models`,
      },
      {
        name: "select datasets",
        link: `/automl/projects/${project.name}/models/$modelname$/select_datasets`,
      },
      {
        name: "selected datasets",
        link: `#`,
      },
    ];
  } else if (link.includes("select_datasets")) {
    paths = [
      { name: "projects", link: "/automl/projects/" },
      {
        name: "models",
        link: `/automl/projects/${project.name}/models`,
      },
      {
        name: "select datasets",
        link: `#`,
      },
    ];
  } else if (link.includes("newmodel")) {
    paths = [
      { name: "projects", link: "/automl/projects/" },
      {
        name: "models",
        link: `/automl/projects/${project.name}/models`,
      },
      {
        name: "new model",
        link: `#`,
      },
    ];
  } else if (link.includes("models")) {
    paths = [
      { name: "projects", link: "/automl/projects/" },
      {
        name: "models",
        link: `#`,
      },
    ];
  } else if (link.includes("newproject")) {
    paths = [
      { name: "projects", link: "/automl/projects/" },
      {
        name: "new project",
        link: `#`,
      },
    ];
  } else if (link.includes("projects")) {
    paths = [{ name: "projects", link: "#" }];
  }

  return (
    <div className="AutoMLBreadcrumbs">
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
