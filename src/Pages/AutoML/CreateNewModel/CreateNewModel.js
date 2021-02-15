import React, { useState } from "react";
import { Button, Input } from "antd";
import styles from "./CreateNewModel.module.scss";
import TextArea from "antd/lib/input/TextArea";
import { useParams } from "react-router-dom";

export default function CreateNewModel(props) {
  let { project_id } = useParams();
  const [m_name, setm_name] = useState("");
  const [m_desc, setm_desc] = useState("");

  const checkvals = () => {
    props.history.push({
      pathname: `/automl/projects/${project_id}/models/${m_name}/select_datasets/`,
      state: {
        detail: "I am from New Models page",
        page_name: "automl_select_datasets",
      },
    });
  };

  return (
    <div style={{ textAlign: "left" }}>
      <h3
        style={{ fontWeight: "700", fontSize: "18px" }}
        className={styles.title}
      >
        New Model
      </h3>
      <hr
        style={{ backgroundColor: "#E1EEFF", border: "none", height: "1px" }}
      />
      <label htmlFor="project_name" className={styles.label}>
        Model Name
      </label>
      <Input
        placeholder="Enter Model Name"
        id="project_name"
        className={styles.input_name}
        value={m_name}
        onChange={(e) => setm_name(e.target.value)}
      />
      <label htmlFor="project_description" className={styles.label}>
        Model Description <span className={styles.span}>(optional)</span>
      </label>
      <TextArea
        id="project_description"
        className={styles.input_desc}
        placeholder="write something about model..."
        autoSize={{ minRows: 7, maxRows: 10 }}
        value={m_desc}
        onChange={(e) => setm_desc(e.target.value)}
      ></TextArea>
      <div style={{}}>
        <Button
          className={styles.btn_cancel}
          onClick={() => {
            props.history.push({
              pathname: `/automl/projects/${project_id}/models`,
              state: { detail: "I am from Create New Project page" },
            });
          }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          className={styles.btn_create}
          onClick={() => checkvals()}
          disabled={m_name === "" ? true : false}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
