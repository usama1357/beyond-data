/* eslint-disable no-unused-vars */
import { Drawer, message, Skeleton } from "antd";
import React, { useContext, useEffect, useState } from "react";
import AutoMLNewProjectButton from "../../../Components/Button/AutoMLNewProjectButton/AutoMLNewProjectButton";
import AutoMLExistingProjectsTable from "../../../Components/Tables/AutoMLExistingProjects/AutoMLExistingProjectsTable";
import { Tabs } from "antd";
import AutoMLProjectsDrawer from "../../../Components/Drawers/AutoMLProjectsDrawer/AutoMLProjectsDrawer";
import "./NewProject.css";
import AutoMLProjectShareModal from "../../../Components/Modals/AutoMLProjectShareModal/AutoMLProjectShareModal";
import AutoMLProjectsTypeTabs from "../../../Components/Tabs/AutoMLProjectsTypeTabs.js";
import AutoMLDeleteProjectModal from "../../../Components/Modals/AutoMLDeleteProjectModal/AutoMLDeleteProjectModal";
import { PageContext } from "../../../Data/Contexts/AutoMLPageState/AutoMLPageStateContext";
import { URL } from "../../../Config/config";
import axios from "axios";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";
import { serialize } from "object-to-formdata";
import Cliploader from "../../../Components/Loader/Cliploader";

export default function NewProject(props) {
  const { TabPane } = Tabs;

  const [loading, setloading] = useState(false);
  const [drawervisible, setdrawervisible] = useState(false);
  const [modalvisible, setmodalvisible] = useState(false);
  const [tab, settab] = useState("my_projects");
  const [deletemodal, setdeletemodal] = useState(false);
  const [selectedProject, setselectedProject] = useState(null);
  const [rendertable, setrendertable] = useState(false);

  const { Auth } = useContext(AuthContext);
  const { setPageFalse } = useContext(PageContext);

  useEffect(() => {
    setPageFalse("models");
  }, []);

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

  const showinfo = (row, data) => {
    setselectedProject(data);
    setdrawervisible(true);
  };

  const onClose = () => {
    settab("");
    settab(tab);
    setdrawervisible(false);
  };

  const showModal = async (item) => {
    if (tab === "my_projects") {
      console.log(item);
      setselectedProject(item);
      setmodalvisible(true);
    }
    if (tab === "global_projects") {
      const myData = {
        company_name: Auth.company_name,
        company_id: Auth.company_id,
        user_id: Auth.user_id,
        project_name: item.project_name,
        created_by: item.user_name,
      };
      const formData = serialize(myData);
      setloading(true);
      await axios({
        method: "post",
        url: `${URL}/automl/download/project/`,
        data: formData,
        headers: {
          "content-type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      })
        .then(function (response) {
          console.log(response);
          message.success(response.data);
          setloading(false);
        })
        .catch(function (error) {
          setloading(false);
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            message.error("Error", error.message);
          }
        });
    }
  };

  const DeleteModal = (row, data) => {
    setselectedProject(data);
    setdeletemodal(true);
  };

  const ShareProject = async () => {
    const myData = {
      company_name: Auth.company_name,
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      project_name: selectedProject.project_name,
    };
    console.log(myData);
    const formData = serialize(myData);
    setloading(true);
    await axios({
      method: "post",
      url: `${URL}/automl/share/project/`,
      data: formData,
      headers: {
        "content-type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    })
      .then(function (response) {
        console.log(response);
        message.success(response.data);
        settab("");
        setloading(false);
        settab(tab);
      })
      .catch(function (error) {
        setloading(false);
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          message.error("Error", error.message);
        }
      });
    setmodalvisible(false);
    setdeletemodal(false);
  };

  const DeleteProject = async (pin) => {
    setmodalvisible(false);
    setdeletemodal(false);
    let space = null;
    if (tab === "my_projects") {
      space = "my_projects";
    } else if (tab === "downloaded_projects") {
      space = "downloaded_projects";
    } else if (tab === "global_projects") {
      space = "shared_projects";
    }
    const myData = {
      company_name: Auth.company_name,
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      project_name: selectedProject.project_name,
      project_space: space,
    };
    const formData = serialize(myData);
    setloading(true);
    await axios({
      method: "post",
      url: `${URL}/automl/delete/project/`,
      data: formData,
      headers: {
        "content-type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    })
      .then(function (response) {
        console.log(response);
        setloading(false);
        settab("");
        settab(tab);
      })
      .catch(function (error) {
        setloading(false);
        console.log(error);
      });
  };

  const handleModalCancel = () => {
    setmodalvisible(false);
    setdeletemodal(false);
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
      <AutoMLNewProjectButton createProject={() => createProject()} tab={tab} />
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
          overflowY: "scroll",
          marginTop: "-11px",
          paddingRight: "10px",
        }}
      >
        {loading === true ? (
          <Skeleton active loading={loading} />
        ) : (
          <AutoMLExistingProjectsTable
            render={rendertable}
            type={tab}
            showinfo={showinfo}
            showModal={showModal}
            showdelete={DeleteModal}
          />
        )}
      </div>
      <AutoMLProjectsDrawer
        onClose={onClose}
        drawervisible={drawervisible}
        type={tab}
        data={selectedProject}
      />
      <AutoMLProjectShareModal
        isModalVisible={modalvisible}
        handleOK={() => ShareProject()}
        handleCancel={() => handleModalCancel()}
      />
      <AutoMLDeleteProjectModal
        deletemodal={deletemodal}
        Delete={(pin) => DeleteProject(pin)}
        handleCancel={() => handleModalCancel()}
      />
      <Cliploader loading={loading} />
    </div>
  );
}
