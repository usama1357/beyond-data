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

export default function AutoMLProjectsDrawer(props) {
  const { TextArea } = Input;
  const [description, setdescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut l abore."
  );
  const [title, settitle] = useState(null);
  const [editable, seteditable] = useState(false);

  let history = useHistory();
  const { setProject } = useContext(ProjectContext);
  const { pages, setCurrentPage } = useContext(PageContext);
  const { setModelList, setModelsType } = useContext(ModelContext);

  if (props.drawervisible === true && title === null) {
    settitle(props.data.project_name);
    setdescription(props.data.project_desc);
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
                value={title}
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
            onClick={() => seteditable(!editable)}
          >
            Discard
          </a>
          <div
            style={
              props.type === "my_projects"
                ? { cursor: "pointer" }
                : { display: "none" }
            }
            onClick={() => seteditable(!editable)}
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
            value={description}
            onChange={(e) => setdescription(e.target.value)}
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
