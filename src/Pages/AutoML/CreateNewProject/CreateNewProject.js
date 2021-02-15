/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import { Button, Input } from "antd";
import styles from "./CreateNewProject.module.scss";
import TextArea from "antd/lib/input/TextArea";
import "./styles.scss";

export default function CreateNewProject(props) {
  const [p_name, setp_name] = useState("");
  const [p_desc, setp_desc] = useState("");

  const createProject = () => {
    //Api call here to save project
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (format.test(p_name)) {
      // let textfield = document.getElementById("project_name");
      // textfield.style.backgroundColor = "red";
      console.log("Contains");
    } else {
      console.log("Doesnt Contain");
    }
  };

  return (
    <div style={{ textAlign: "left" }}>
      <h3 style={{ fontWeight: "700", fontSize: "18px" }}>New Project</h3>
      <hr
        style={{ backgroundColor: "#E1EEFF", border: "none", height: "1px" }}
      />
      <label htmlFor="project_name" className={styles.label}>
        Project Name
      </label>
      <Input
        placeholder="Enter Project Name"
        id="project_name"
        className={styles.input_name}
        value={p_name}
        onChange={(e) => setp_name(e.target.value)}
      />
      <label htmlFor="project_description" className={styles.label}>
        Project Description <span className={styles.span}>(optional)</span>
      </label>
      <TextArea
        id="project_description"
        className={styles.input_desc}
        placeholder="Write something about project..."
        autoSize={{ minRows: 7, maxRows: 10 }}
        value={p_desc}
        onChange={(e) => setp_desc(e.target.value)}
      ></TextArea>
      <div style={{}}>
        <Button
          className={styles.btn_cancel}
          onClick={() => {
            props.history.push({
              pathname: "/automl/projects/",
              state: { detail: "I am from Create New Project page" },
            });
          }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          className={styles.btn_create}
          disabled={p_name === "" ? true : false}
          onClick={() => createProject()}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
