/* eslint-disable no-unused-vars */
import { Drawer, Skeleton } from "antd";
import React, { useState } from "react";
import AutoMLNewProjectButton from "../../../Components/Button/AutoMLNewProjectButton/AutoMLNewProjectButton";
import AutoMLExistingProjectsTable from "../../../Components/Tables/AutoMLExistingProjects/AutoMLExistingProjectsTable";
import { Tabs } from "antd";
import AutoMLProjectsDrawer from "../../../Components/Drawers/AutoMLProjectsDrawer/AutoMLProjectsDrawer";
import "./NewProject.css";
import AutoMLProjectShareModal from "../../../Components/Modals/AutoMLProjectShareModal/AutoMLProjectShareModal";
import AutoMLProjectsTypeTabs from "../../../Components/Tabs/AutoMLProjectsTypeTabs.js";

export default function NewProject(props) {
  const { TabPane } = Tabs;

  const [loading, setloading] = useState(false);
  const [drawervisible, setdrawervisible] = useState(false);
  const [modalvisible, setmodalvisible] = useState(false);
  const [tab, settab] = useState("my_projects");

  const createProject = () => {
    props.history.push({
      pathname: "/automl/projects/newproject/",
      state: {
        detail: "I am from Projects page",
        page_name: "automl_newproject",
      },
    });
  };

  const callback = (id) => {
    settab(id);
  };

  const showinfo = (row) => {
    console.log(row);
    setdrawervisible(true);
  };
  const onClose = () => {
    setdrawervisible(false);
  };

  const showModal = (row) => {
    setmodalvisible(true);
  };

  const handleModalOk = () => {
    setmodalvisible(false);
  };

  const handleModalCancel = () => {
    setmodalvisible(false);
  };

  return (
    <div
      className="NewProject"
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
          width: "100%",
        }}
      />
      <AutoMLNewProjectButton createProject={() => createProject()} />
      {/* <h3 style={{ fontWeight: "700", marginTop: "20px", fontSize: "18px" }}>
        Projects
      </h3> */}
      {/* <Tabs
        defaultActiveKey="my_projects"
        onChange={callback}
        style={{ marginTop: "15px", color: "grey" }}
      >
        <TabPane tab="My Projects" key="my_projects"></TabPane>
        <TabPane tab="Downloaded Projects" key="downloaded_projects"></TabPane>
        <TabPane tab="Global Projects" key="global_projects"></TabPane>
      </Tabs> */}
      <AutoMLProjectsTypeTabs setTab={(val) => settab(val)} />
      <div
        style={{
          flex: "1",
          overflow: "scroll",
          marginTop: "-11px",
          paddingRight: "10px",
        }}
      >
        {loading === true ? (
          <Skeleton active loading={loading} />
        ) : (
          <AutoMLExistingProjectsTable
            type={tab}
            showinfo={showinfo}
            showModal={showModal}
          />
        )}
      </div>
      <AutoMLProjectsDrawer onClose={onClose} drawervisible={drawervisible} />
      <AutoMLProjectShareModal
        isModalVisible={modalvisible}
        handleOK={() => handleModalOk()}
        handleCancel={() => handleModalCancel()}
      />
    </div>
  );
}
