/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-useless-escape */
import React, { useContext, useState } from "react";
import { Button, Input, message } from "antd";
import styles from "./CreateNewProject.module.scss";
import TextArea from "antd/lib/input/TextArea";
import "./styles.css";
import { ProjectContext } from "../../../Data/Contexts/AutoMLProject/AutoMLProjectContext";
import { ModelContext } from "../../../Data/Contexts/AutoMLModelContext/AutoMLModelContext";
import { PageContext } from "../../../Data/Contexts/AutoMLPageState/AutoMLPageStateContext";
import { URL } from "../../../Config/config";
import axios from "axios";
import { serialize } from "object-to-formdata";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";

export default function CreateNewProject(props) {
  const context = useContext(ProjectContext);
  const { setModel, setModelList } = useContext(ModelContext);
  const { setCurrentPage } = useContext(PageContext);
  const { Auth } = useContext(AuthContext);

  const [p_name, setp_name] = useState("");
  const [p_desc, setp_desc] = useState("");
  const [p_name_error, setp_name_error] = useState(null);
  const [enable, setenable] = useState(false);

  const createProject = async () => {
    setModelList(null);
    setCurrentPage("models");
    setModel({ name: null, desc: null });
    context.setProject({ name: p_name, desc: p_desc, type: "my_projects" });
    const myData = {
      company_name: Auth.company_name,
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      project_name: p_name,
      project_desc: p_desc,
    };
    const formData = serialize(myData);
    await axios({
      method: "post",
      url: `${URL}/automl/create_project/`,
      data: formData,
      headers: {
        "content-type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    })
      .then(function (response) {
        if (
          response.data === "Created" ||
          response.data === "Created." ||
          response.data === "created"
        ) {
          props.history.push({
            pathname: `/automl/projects/${p_name}/models/`,
            state: {
              detail: "I am from New Models page",
              page_name: "automl_select_datasets",
            },
          });
        } else {
          setp_name_error(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
        setp_name_error("Server Error");
      });
  };

  const validate = async (e) => {
    setenable(true);
    setp_name_error(null);
    document.getElementById("project_name").style.borderColor = "#40a9ff";
    await setp_name(e.target.value);
    var format = /[!@#$%^&*()+\=\[\]{};':"\\|,<>\/?]+/;
    if (format.test(e.target.value) || format.test(e.target.value)) {
      // let textfield = document.getElementById("project_name");
      // textfield.style.backgroundColor = "red";
      setenable(false);
      setp_name_error("Project Name contains special characters");
      document.getElementById("project_name").style.borderColor = "#EC547A";
      document.getElementById("project_name").style.boxShadow = "none";
    } else {
      setenable(true);
      document.getElementById("project_name").style.borderColor = "#40a9ff";
    }
    let name = "";
    if (e.target.value.length === 0) {
      name = e.target.value;
    } else {
      name = e.target.value;
    }
    if (e.target.value.length < 3) {
      setenable(false);
      setp_name_error("Project Name should be 3 Characters Minimum");
      document.getElementById("project_name").style.borderColor = "#EC547A";
      document.getElementById("project_name").style.boxShadow = "none";
    }
    if (name[0] === " " || name[0] === "_" || name[0] === "-") {
      setenable(false);
      setp_name_error(
        "Project Name first character cannot be a special character"
      );
      document.getElementById("project_name").style.borderColor = "#EC547A";
      document.getElementById("project_name").style.boxShadow = "none";
    }
  };
  return (
    <div style={{ textAlign: "left" }} className="CreateNewProject">
      <h3 style={{ fontWeight: "700", fontSize: "18px" }}>New Project</h3>
      <hr
        style={{
          backgroundColor: "#E1EEFF",
          border: "none",
          height: "1px",
          marginBottom: "20px",
        }}
      />
      <label htmlFor="project_name" className={styles.label}>
        Project Name ({p_name.length}/ 30 Characters)
      </label>
      <Input
        placeholder="Enter Project Name"
        id="project_name"
        className={styles.input_name}
        value={p_name}
        maxLength={30}
        onChange={(e) => validate(e)}
      />
      <p
        style={
          p_name_error === null
            ? { display: "none" }
            : { color: "#EC547A", fontSize: "14px", fontFamily: "Lato" }
        }
      >
        *{p_name_error}
      </p>
      <label htmlFor="project_description" className={styles.label}>
        Project Description <span className={styles.span}>(optional)</span>
      </label>
      <TextArea
        id="project_description"
        className={styles.input_desc}
        placeholder="Write something about project..."
        autoSize={{ minRows: 7, maxRows: 10 }}
        showCount
        maxLength="300"
        value={p_desc}
        onChange={(e) => setp_desc(e.target.value)}
      ></TextArea>
      <div style={{}}>
        <a
          className={styles.btn_cancel}
          onClick={() => {
            props.history.push({
              pathname: "/automl/projects/",
              state: { detail: "I am from Create New Project page" },
            });
          }}
        >
          Cancel
        </a>
        {/* <Button
          className={styles.btn_cancel}
          onClick={() => {
            props.history.push({
              pathname: "/automl/projects/",
              state: { detail: "I am from Create New Project page" },
            });
          }}
        >
          Cancel
        </Button> */}
        <Button
          type="primary"
          className={styles.btn_create}
          disabled={enable === false ? true : false}
          onClick={() => createProject()}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
