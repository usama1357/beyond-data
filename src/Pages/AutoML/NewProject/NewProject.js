import React from "react";
import AutoMLNewProjectButton from "../../../Components/Button/AutoMLNewProjectButton/AutoMLNewProjectButton";
import AutoMLExistingProjectsTable from "../../../Components/Tables/AutoMLExistingProjects/AutoMLExistingProjectsTable";

export default function NewProject(props) {
  const createProject = () => {
    props.history.push({
      pathname: "/automl/projects/newproject/",
      state: {
        detail: "I am from Projects page",
        page_name: "automl_newproject",
      },
    });
  };

  return (
    <div
      style={{
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <h3
        style={{
          fontWeight: "700",
          marginBottom: "0px",
          marginTop: "11px",
          fontSize: "18px",
        }}
      >
        New Project
      </h3>
      <hr
        style={{
          backgroundColor: "#E1EEFF",
          border: "none",
          height: "1px",
          marginBottom: "20px",
        }}
      />
      <AutoMLNewProjectButton createProject={() => createProject()} />
      <h3 style={{ fontWeight: "700", marginTop: "20px", fontSize: "18px" }}>
        Projects
      </h3>
      <hr
        style={{
          backgroundColor: "#E1EEFF",
          border: "none",
          height: "1px",
          marginBottom: "0px",
        }}
      />
      <div style={{ flex: "1", overflow: "scroll" }}>
        <AutoMLExistingProjectsTable />
      </div>
    </div>
  );
}
