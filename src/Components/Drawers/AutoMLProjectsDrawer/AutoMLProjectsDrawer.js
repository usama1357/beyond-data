/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { Button, Drawer } from "antd";
import React, { useContext, useState } from "react";
import "./AutoMLProjectsDrawer.css";
import { Input } from "antd";
import AutoMLProjectsModelsList from "../../List/AutoMLProjectsModelsList/AutoMLProjectsModelsList";
import editIcon from "../../Icons/AutoML/edit.svg";
import saveIcon from "../../Icons/AutoML/save.svg";
import { ProjectContext } from "../../../Data/Contexts/AutoMLProject/AutoMLProjectContext";
import { PageContext } from "../../../Data/Contexts/AutoMLPageState/AutoMLPageStateContext";
import { ModelContext } from "../../../Data/Contexts/AutoMLModelContext/AutoMLModelContext";
import { useHistory } from "react-router-dom";
import { URL } from "../../../Config/config";
import axios from "axios";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";

export default function AutoMLProjectsDrawer(props) {
  const { TextArea } = Input;

  const [description, setdescription] = useState(null);
  const [title, settitle] = useState(null);
  const [editabledescription, seteditabledescription] = useState(null);
  const [editabletitle, seteditabletitle] = useState(null);

  const [editable, seteditable] = useState(false);

  let history = useHistory();
  const { setProject } = useContext(ProjectContext);
  const { pages, setCurrentPage } = useContext(PageContext);
  const { setModelList, setModelsType } = useContext(ModelContext);
  const { Auth } = useContext(AuthContext);

  if (props.drawervisible === true && title === null) {
    settitle(props.data.project_name);
    setdescription(props.data.project_desc);
    seteditabletitle(props.data.project_name);
    seteditabledescription(props.data.project_desc);
  }

  const proceedNext = () => {
    setProject({
      name: props.data.project_name,
      type: props.type,
      desc: props.data.project_desc,
      user: props.data.user_name,
    });
    setCurrentPage("models");
    setModelList(props.data.model_info);
    setModelsType(props.type);
    history.push({
      pathname: `/automl/projects/${props.data.project_name}/models`,
      state: {
        detail: `I am ${props.data.project_name}`,
        page_name: "automl_models",
      },
    });
  };

  const renameproject = async () => {
    if (editable) {
      if (title !== editabletitle || description !== editabledescription) {
        await axios
          .post(`${URL}/automl/edit_project/`, {
            company_name: Auth.company_name,
            company_id: Auth.company_id,
            user_id: Auth.user_id,
            project_name: title,
            update: { project_desc: editabledescription },
          })
          .then(function (response) {
            console.log(response);
            setdescription(editabledescription);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  return props.data ? (
    <div
      id="AutoMLProjectsDrawer"
      // style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <Drawer
        className="drawer"
        placement="right"
        closable={false}
        width={"39%"}
        onClose={() => {
          settitle(null);
          setdescription(null);
          seteditable(false);
          props.onClose();
        }}
        visible={props.drawervisible}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontFamily: "Lato",
            marginTop: "30px",
            height: "30px",
          }}
        >
          {editable === false ? (
            <h2
              style={{
                flexGrow: "1",
                fontSize: "20px",
                fontWeight: "bold",
                lineHeight: "24px",
                fontFamily: "Lato",
              }}
            >
              {title}
            </h2>
          ) : (
            <div style={{ flexGrow: "1" }}>
              <Input
                value={editabletitle}
                style={{
                  height: "30px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  lineHeight: "24px",
                  fontFamily: "Lato",
                  width: "50%",
                  // borderRadius: "10px",
                  // padding: "10px",
                }}
                onChange={(e) => seteditabletitle(e.target.value)}
              />
            </div>
          )}
          <a
            style={
              editable === true
                ? {
                    textDecoration: "none",
                    color: "#6d6d6d",
                    marginRight: "23px",
                    fontSize: "14px",
                  }
                : { display: "none" }
            }
            onClick={() => {
              seteditabletitle(title);
              seteditabledescription(description);
              seteditable(!editable);
            }}
          >
            Discard
          </a>
          <div
            style={
              props.type === "my_projects"
                ? { cursor: "pointer" }
                : { display: "none" }
            }
            onClick={() => {
              renameproject();
              seteditable(!editable);
            }}
          >
            <img
              src={editable === true ? saveIcon : editIcon}
              alt="edit icon"
              style={{ width: "16px", marginBottom: "2px" }}
            ></img>
            <span
              style={{
                fontWeight: "700",
                fontSize: "14px",
                marginLeft: "4px",
                color: "#6D6D6D",
                fontFamily: "Lato",
              }}
            >
              {editable === true ? "Save" : " Edit"}
            </span>
          </div>
        </div>
        <div style={{ fontFamily: "Lato", fontSize: "12px", color: "#6D6D6D" }}>
          Created by:{" "}
          <span style={{ color: "#085FAB", fontWeight: "700" }}>
            -{props.data.user_name}-
          </span>
        </div>
        <div
          style={{
            fontWeight: "700",
            fontFamily: "Lato",
            fontSize: "14px",
            marginTop: "30px",
          }}
        >
          Project Description
        </div>
        <div style={{ marginTop: "15px", height: "100px" }}>
          <p
            style={
              editable === false
                ? { fontFamily: "Lato", fontSize: "14px", color: "#6D6D6D" }
                : { display: "none" }
            }
          >
            {description}
          </p>
          <TextArea
            style={
              editable === true
                ? { fontFamily: "Lato", fontSize: "14px", color: "#6D6D6D" }
                : { display: "none" }
            }
            value={editabledescription}
            onChange={(e) => seteditabledescription(e.target.value)}
            placeholder="Controlled autosize"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
        <div>
          <div
            style={{
              fontWeight: "700",
              fontFamily: "Lato",
              fontSize: "14px",
              marginTop: "30px",
            }}
          >
            Models
          </div>
          <div style={{ height: "40vh", overflowY: "scroll" }}>
            <AutoMLProjectsModelsList data={props.data.model_info} />
          </div>
        </div>
        <Button
          style={{
            width: "140px",
            height: "40px",
            background: "#085FAB",
            borderRadius: "64px",
            fontFamily: "Lato",
            fontSize: "16px",
            fontWeight: "700",
            color: "white",
            letterSpacing: "0.5px",
            marginTop: "20px",
            border: "none",
            paddingBottom: "5px",
          }}
          onClick={() => proceedNext()}
        >
          Proceed
        </Button>
      </Drawer>
    </div>
  ) : null;
}
