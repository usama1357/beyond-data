import { Button, message, Skeleton } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import AutoMLNewModelButton from "../../../Components/Button/AutoMLNewModelButton/AutoMLNewModelButton";
import AutoMLModelsDrawer from "../../../Components/Drawers/AutoMLModelsDrawer/AutoMLModelsDrawer";
import AutoMLDeleteModelModal from "../../../Components/Modals/AutoMLDeleteModelModal/AutoMLDeleteModelModal";
import AutoMLExistingModelsTable from "../../../Components/Tables/AutoMLExistingModels/AutoMLExistingModelsTable";
import { URL } from "../../../Config/config";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";
import { ModelContext } from "../../../Data/Contexts/AutoMLModelContext/AutoMLModelContext";
import { ProjectContext } from "../../../Data/Contexts/AutoMLProject/AutoMLProjectContext";
import "./styles.css";
import { serialize } from "object-to-formdata";
import Cliploader from "../../../Components/Loader/Cliploader";
import AutoMLModelShareModal from "../../../Components/Modals/AutoMLShareModelModal/AutoMLShareModelModal";
import searchIcon from "../../../Components/Icons/AutoML/search.svg";
import { PageContext } from "../../../Data/Contexts/AutoMLPageState/AutoMLPageStateContext";

export default function ExistingModels(props) {
  const { project_id } = useParams();
  const [selected_model, setselected_model] = useState(null);
  const [loading, setloading] = useState(false);
  const [drawervisible, setdrawervisible] = useState(false);
  const [selectedModel, setselectedModel] = useState(null);
  const [modalvisible, setmodalvisible] = useState(false);
  const [searchval, setsearchval] = useState("");

  const [deletemodal, setdeletemodal] = useState(false);
  const [rendertable, setrendertable] = useState(true);

  const { Model, removeModel, setModel } = useContext(ModelContext);
  const { Project } = useContext(ProjectContext);
  const { Auth } = useContext(AuthContext);
  const { setPageFalse } = useContext(PageContext);

  useEffect(() => {
    setPageFalse("selectdatasets");
  }, []);

  const createModel = () => {
    props.history.push({
      pathname: `/automl/projects/${project_id}/models/newmodel`,
      state: { detail: "I am from Models page" },
    });
  };

  const showinfo = (row, item) => {
    setselectedModel(item);
    setdrawervisible(true);
  };

  const DeleteModal = (row, data) => {
    setselectedModel(data);
    setdeletemodal(true);
  };

  const DeleteModel = async (pin) => {
    setdeletemodal(false);
    console.log("delete", selectedModel);
    let name = selectedModel.model_name;
    console.log(Project.type);
    let space = null;
    if (Project.type === "my_projects") {
      space = "my_projects";
    } else if (Project.type === "downloaded_projects") {
      space = "downloaded_projects";
    } else if (Project.type === "global_projects") {
      space = "shared_projects";
    }
    const myData = {
      company_name: Auth.company_name,
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      project_name: Project.name,
      model_space: space,
      model_name: selectedModel.model_name,
    };
    const formData = serialize(myData);
    setloading(true);
    await axios({
      method: "post",
      url: `${URL}/automl/delete/model/`,
      data: formData,
      headers: {
        "content-type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    })
      .then(function (response) {
        setloading(false);
        if (response.data === "Deleted") {
          removeModel(name);
          message.success("Deleted Successfully");
          setrendertable(!rendertable);
        }
        console.log(response);
      })
      .catch(function (error) {
        setloading(false);
        console.log(error);
      });
  };

  const ShareModel = async () => {
    const myData = {
      company_name: Auth.company_name,
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      project_name: Project.name,
      model_name: selectedModel.model_name,
    };
    console.log(myData);
    const formData = serialize(myData);
    setmodalvisible(false);
    setdeletemodal(false);
    setloading(true);
    await axios({
      method: "post",
      url: `${URL}/automl/share/model/`,
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
  };

  const handleModalCancel = () => {
    setdeletemodal(false);
    setmodalvisible(false);
  };

  const ShowModal = (key, item) => {
    console.log(item);
    console.log(selectedModel);
    setmodalvisible(true);
  };

  const modifyModel = () => {
    setModel({
      name: Model.allmodels[selected_model].model_name,
      desc: Model.allmodels[selected_model].model_desc,
    });
    props.history.push({
      pathname: `/automl/projects/${project_id}/models/${Model.allmodels[selected_model].model_name}/modify_model/feature_selection/`,
      state: { detail: "I am from Models page" },
    });
  };

  const retrainModel = () => {
    setModel({
      name: Model.allmodels[selected_model].model_name,
      desc: Model.allmodels[selected_model].model_desc,
    });
    props.history.push({
      pathname: `/automl/projects/${project_id}/models/${Model.allmodels[selected_model].model_name}/retrain_model/upload_dataset/`,
      state: { detail: "I am from Models page" },
    });
  };

  const predictModel = () => {
    setModel({
      name: Model.allmodels[selected_model].model_name,
      desc: Model.allmodels[selected_model].model_desc,
    });
    props.history.push({
      pathname: `/automl/projects/${project_id}/models/${Model.allmodels[selected_model].model_name}/predict_model/upload_dataset/`,
      state: { detail: "I am from Models page" },
    });
  };

  return (
    <div
      className="ExistingModels"
      style={{
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: "12px",
          lineHeight: "13px",
          color: "#085FAB",
        }}
      >
        {project_id}
      </div>
      <h3 style={{ fontWeight: "700", marginTop: "2px", fontSize: "18px" }}>
        New Model
      </h3>
      <hr
        style={{
          backgroundColor: "#E1EEFF",
          marginTop: "0px",
          marginBottom: "20px",
          border: "none",
          height: "1px",
          width: "100%",
        }}
      />
      <AutoMLNewModelButton createModel={() => createModel()} />
      <div style={{ display: "flex" }}>
        <h3
          style={{
            display: "inline-block",
            fontWeight: "600",
            fontSize: "18px",
            marginTop: "20px",
            // width: "20%",
            flexGrow: "1",
          }}
        >
          Models
        </h3>
        <div className="searchbar">
          <input
            type="text"
            name="search"
            autoComplete="off"
            style={{ backgroundImage: `url(${searchIcon})` }}
            // placeholder="Search.."
            value={searchval}
            onChange={(e) => setsearchval(e.target.value)}
          />
        </div>
      </div>

      <hr
        style={{
          backgroundColor: "#E1EEFF",
          marginTop: "2px",
          border: "none",
          height: "1px",
          marginBottom: "0px",
          width: "100%",
        }}
      />
      <div
        style={{
          flexGrow: "1",
          overflowY: "scroll",
          paddingRight: "10px",
          marginTop: "0px",
        }}
      >
        {loading === true ? (
          <Skeleton active loading={loading} />
        ) : (
          <AutoMLExistingModelsTable
            selected={(id) => setselected_model(id)}
            showinfo={showinfo}
            showmodal={ShowModal}
            showdelete={DeleteModal}
            render={rendertable}
            value={searchval}
          />
        )}
      </div>
      <AutoMLDeleteModelModal
        deletemodal={deletemodal}
        Delete={(pin) => DeleteModel(pin)}
        handleCancel={() => handleModalCancel()}
      />
      <AutoMLModelShareModal
        isModalVisible={modalvisible}
        handleOK={() => ShareModel()}
        handleCancel={() => handleModalCancel()}
      />
      <AutoMLModelsDrawer
        onClose={() => setdrawervisible(false)}
        drawervisible={drawervisible}
        type={Model.type}
        data={selectedModel}
      />

      <hr
        style={{
          backgroundColor: "#E1EEFF",
          border: "none",
          height: "1px",
          marginTop: "0px",
        }}
      />
      {loading === true ? null : (
        <div
          className="ExistingModelsButtons"
          style={selected_model === null ? { display: "none" } : null}
        >
          <Button
            style={{
              borderRadius: "64px",
              marginRight: "10px",
              width: "161px",
              height: "40px",
              // color: selected_model === null ? "grey" : "#085FAB",
              borderColor: selected_model === null ? "grey" : "#085FAB",
              fontWeight: "bold",
              fontSize: "16px",
            }}
            disabled={selected_model === null ? true : false}
            onClick={() => {
              predictModel();
            }}
          >
            Predict
          </Button>
          <Button
            style={{
              borderRadius: "64px",
              marginRight: "10px",
              width: "161px",
              height: "40px",
              // color: selected_model === null ? "grey" : "#085FAB",
              borderColor: selected_model === null ? "grey" : "#085FAB",
              fontWeight: "bold",
              fontSize: "16px",
            }}
            disabled={selected_model === null ? true : false}
            onClick={() => retrainModel()}
          >
            Retrain Model
          </Button>
          <Button
            style={{
              borderRadius: "64px",
              marginRight: "10px",
              width: "161px",
              height: "40px",
              // color: selected_model === null ? "grey" : "#085FAB",
              borderColor: selected_model === null ? "grey" : "#085FAB",
              fontWeight: "bold",
              fontSize: "16px",
            }}
            disabled={selected_model === null ? true : false}
            onClick={() => modifyModel()}
          >
            Modify Model
          </Button>
        </div>
      )}
      <Cliploader loading={loading} />
    </div>
  );
}
