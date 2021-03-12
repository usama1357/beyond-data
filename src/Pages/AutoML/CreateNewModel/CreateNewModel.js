/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import { Button, Input } from "antd";
import styles from "./CreateNewModel.module.scss";
import TextArea from "antd/lib/input/TextArea";
import { useParams } from "react-router-dom";
import { PageContext } from "../../../Data/Contexts/AutoMLPageState/AutoMLPageStateContext";
import { ModelContext } from "../../../Data/Contexts/AutoMLModelContext/AutoMLModelContext";
import axios from "axios";
import { serialize } from "object-to-formdata";
import { URL } from "../../../Config/config";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";

export default function CreateNewModel(props) {
  let { project_id } = useParams();
  const [m_name, setm_name] = useState("");
  const [m_desc, setm_desc] = useState("");
  const [m_name_error, setm_name_error] = useState(null);
  const [enable, setenable] = useState(false);

  const { setCurrentPage } = useContext(PageContext);
  const { setModel } = useContext(ModelContext);
  const { Auth } = useContext(AuthContext);

  const checkvals = async () => {
    setCurrentPage("selectdatasets");
    setModel({ name: m_name, desc: m_desc });

    const myData = {
      company_name: Auth.company_name,
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      project_name: project_id,
      model_name: m_name,
      model_desc: m_desc,
    };
    const formData = serialize(myData);
    await axios({
      method: "post",
      url: `${URL}/automl/my_models/`,
      data: formData,
      headers: {
        "content-type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    })
      .then(function (response) {
        props.history.push({
          pathname: `/automl/projects/${project_id}/models/${m_name}/select_datasets/`,
          state: {
            detail: "I am from New Models page",
            page_name: "automl_select_datasets",
          },
        });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const validate = async (e) => {
    setenable(true);
    setm_name_error(null);
    document.getElementById("project_name").style.borderColor = "#40a9ff";
    await setm_name(e.target.value);
    var format = /[!@#$%^&*()+\=\[\]{};':"\\|,<>\/?]+/;
    if (format.test(e.target.value) || format.test(e.target.value)) {
      // let textfield = document.getElementById("project_name");
      // textfield.style.backgroundColor = "red";
      setenable(false);
      setm_name_error("Model Name contains special characters");
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
      setm_name_error("Model Name should be 3 Characters Minimum");
      document.getElementById("project_name").style.borderColor = "#EC547A";
      document.getElementById("project_name").style.boxShadow = "none";
    }
    if (name[0] === " " || name[0] === "_" || name[0] === "-") {
      setenable(false);
      setm_name_error(
        "Model Name first character cannot be a special character"
      );
      document.getElementById("project_name").style.borderColor = "#EC547A";
      document.getElementById("project_name").style.boxShadow = "none";
    }
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
        Model Name ({m_name.length}/ 30 Characters)
      </label>
      <Input
        placeholder="Enter Model Name"
        id="project_name"
        className={styles.input_name}
        value={m_name}
        maxLength={30}
        minLength={5}
        onChange={(e) => validate(e)}
      />
      <p
        style={
          m_name_error === null
            ? { display: "none" }
            : { color: "#EC547A", fontSize: "14px", fontFamily: "Lato" }
        }
      >
        *{m_name_error}
      </p>
      <label htmlFor="project_description" className={styles.label}>
        Model Description <span className={styles.span}>(optional)</span>
      </label>
      <TextArea
        id="project_description"
        className={styles.input_desc}
        placeholder="write something about model..."
        autoSize={{ minRows: 7, maxRows: 10 }}
        showCount
        maxLength="300"
        value={m_desc}
        onChange={(e) => setm_desc(e.target.value)}
      ></TextArea>
      <div style={{}}>
        <a
          className={styles.btn_cancel}
          onClick={() => {
            props.history.push({
              pathname: `/automl/projects/${project_id}/models`,
              state: { detail: "I am from Create New Project page" },
            });
          }}
        >
          Cancel
        </a>
        <Button
          type="primary"
          className={styles.btn_create}
          onClick={() => checkvals()}
          disabled={enable === false ? true : false}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
