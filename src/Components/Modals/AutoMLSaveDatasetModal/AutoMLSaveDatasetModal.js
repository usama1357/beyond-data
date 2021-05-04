/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Row, Col, message } from "antd";
import ShareAvatar from "../../Images/AutoML/shareAvatar.svg";
import "./styles.css";
import closeIcon from "../../Icons/AutoML/closeicon.svg";
import AutoMLExistingDatabucketCard from "../../Cards/AutoMLExistingDatabucketCard/AutoMLExistingDatabucketCard";
import fileIcon from "../../Icons/AutoML/SaveDatabucket/fileicon.svg";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import dataBucket from "../../Icons/AutoML/SaveDatabucket/databucket.svg";
import { PageContext } from "../../../Data/Contexts/AutoMLPageState/AutoMLPageStateContext";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";
import { SelectedDatasetsContext } from "../../../Data/Contexts/AutoMLSelectedDatasetsCart/AutoMLSelectedDatasetsCart";
import axios from "axios";
import { serialize } from "object-to-formdata";
import { URL } from "../../../Config/config";
import { ModelContext } from "../../../Data/Contexts/AutoMLModelContext/AutoMLModelContext";
import { ProjectContext } from "../../../Data/Contexts/AutoMLProject/AutoMLProjectContext";
import Cliploader from "../../Loader/Cliploader";
import { CustomTableContext } from "../../../Data/Contexts/AutoMLCustomTable/AutoMLCustomTableContext";
import AutoMLGeneratingDatasetLoader from "../../Loader/AutoMLGeneratingDatasetLoader/AutoMLGeneratingDatasetLoader";

export default function AutoMLSaveDatasetModal(props) {
  const [selected, setselected] = useState(null);
  let { project_id, model_id } = useParams();

  const [newdatabucket, setnewdatabucket] = useState(false);
  const [newdatabucketname, setnewdatabucketname] = useState("");
  const [datasetname, setdatasetname] = useState("");
  const [datasetdesc, setdatasetdesc] = useState("");
  const [dataset_name_error, setdataset_name_error] = useState(null);
  const [enable, setenable] = useState(false);
  const [loading, setloading] = useState(false);
  const [showloading, setshowloading] = useState(false);

  //Final Object
  const [Sectors, setSectors] = useState({});
  const [DeletedColumns, setDeletedColumns] = useState({});

  const [created, setcreated] = useState(false);
  const [renderlist, setrenderlist] = useState(true);

  let history = useHistory();
  const { setCurrentPage } = useContext(PageContext);
  const { Auth } = useContext(AuthContext);
  const { SelectedDatasets } = useContext(SelectedDatasetsContext);
  const { Model } = useContext(ModelContext);
  const { Project } = useContext(ProjectContext);
  const { setCustomTable } = useContext(CustomTableContext);

  useEffect(() => {
    if (props.isModalVisible === true) {
      //Call Loaddatabuckets api
      async function fetchData() {
        let temp = [];
        const myData = {
          company_name: Auth.company_name,
          company_id: Auth.company_id,
          user_id: Auth.user_id,
        };
        const formData = serialize(myData);
        setloading(true);
        await axios({
          method: "post",
          url: `${URL}/automl/load_databuckets/`,
          data: formData,
          headers: {
            "content-type": `multipart/form-data; boundary=${formData._boundary}`,
          },
        })
          .then(function (response) {
            setloading(false);
            console.log(response);
            for (const [key, value] of Object.entries(response.data)) {
              let obj = { name: key, datasets: value };
              temp.push(obj);
            }
          })
          .catch(function (error) {
            setloading(false);
            console.log(error);
          });
        setdatabuckets(temp);
      }
      fetchData();

      //Set Sectors Object
      let tempsectors = {};
      SelectedDatasets.datasets.forEach((element) => {
        if (tempsectors[`${element.type}`] === undefined) {
          tempsectors[`${element.type}`] = {};
          tempsectors[`${element.type}`][`${element.sector}`] = [
            element.final_name,
          ];
        } else {
          if (
            tempsectors[`${element.type}`][`${element.sector}`] === undefined
          ) {
            tempsectors[`${element.type}`][`${element.sector}`] = [
              element.final_name,
            ];
          } else {
            tempsectors[`${element.type}`][`${element.sector}`].push(
              element.final_name
            );
          }
        }
      });
      setSectors(tempsectors);

      //Set DeletedColumns Array
      let deletedcols = {};
      SelectedDatasets.datasets.forEach((item) => {
        let deleted = [];
        item.columns.forEach((element) => {
          if (!item.selectedcolumns.includes(element)) {
            deleted.push(element);
          }
        });
        deletedcols[`${item.name}`] = deleted;
      });
      setDeletedColumns(deletedcols);
    } else {
      setcreated(false);
      setselected(null);
      setnewdatabucketname("");
      setnewdatabucket(false);
    }
  }, [props.isModalVisible]);

  const savedataset = async () => {
    let type = "";
    if (
      databuckets[selected].name === databuckets[databuckets.length - 1].name
    ) {
      type = "new";
    } else {
      type = "old";
    }
    let FinalObject = {
      company_name: Auth.company_name,
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      project: Project.name,
      model: Model.model.name,
      datasets: Sectors,
      del_cols: DeletedColumns,
      link_tables: props.links,
      databucket_name: databuckets[selected].name,
      databucket_type: type,
      dataset_name: datasetname,
      dataset_description: datasetdesc,
      databucket_space: "p",
    };
    console.log(FinalObject);
    const formData = serialize(FinalObject);
    setshowloading(true);
    await axios
      .post(`${URL}/automl/generate_dataset/`, FinalObject)
      .then(function (response) {
        console.log(response);
        setshowloading(false);
        setCurrentPage("metascreen");
        let temp = [];
        let l = response.data.data.length;
        temp = response.data.data.slice(0, 50);
        console.log(temp);
        console.log(response.data.metadata);
        setCustomTable({
          data: temp,
          meta: response.data.metadata,
          bucket: {
            databucket_name: databuckets[selected].name,
            dataset_name: datasetname,
          },
          target: "",
          filtered: null,
          length: l,
        });
        history.push({
          pathname: `/automl/projects/${project_id}/models/${model_id}/customised_dataset/`,
          state: {
            detail: "I am from New link page",
            page_name: "automl_customised_datasets",
          },
        });
      })
      .catch(function (error) {
        setshowloading(false);
        console.log(error);
        message.error("Server Error");
      });
  };

  const savedatasetapi = () => {
    if (newdatabucketname === "") {
      setnewdatabucket(false);
    } else {
      setcreated(true);
      //sendnewdatabucket to api

      //
      setnewdatabucket(false);
      console.log(databuckets);
      let temp = databuckets;
      temp.push({ name: newdatabucketname, datasets: [] });
      setdatabuckets(temp);
      setnewdatabucketname("");
      setnewdatabucket(false);
    }
  };

  const validatekey = (e) => {
    if (e.key === "Enter") {
      savedatasetapi();
    }
  };

  //Handling Response
  let response = {
    oilandgas: [
      "Oil and Gas Refinery",
      "Oil and Gas Exploration",
      "Oil and Gas Exploration",
    ],
    cement: ["Cement Refinery", "Cement Exploration", "Cement Exploration"],
    banks: ["HBL", "AL-Falah", "Habib Bank", "Summit Bank", "UBL"],
  };
  let temp = [];
  for (const [key, value] of Object.entries(response)) {
    let obj = { name: key, datasets: value };
    temp.push(obj);
  }

  const [databuckets, setdatabuckets] = useState([]);

  const validatename = async (e) => {
    setenable(true);
    setdataset_name_error(null);
    document.getElementById("dname").style.borderColor = "#40a9ff";
    await setdatasetname(e.target.value);
    var format = /[!@#$%^&*()+\=\[\]{};':"\\|,<>\/?]+/;
    if (format.test(e.target.value) || format.test(e.target.value)) {
      // let textfield = document.getElementById("dname");
      // textfield.style.backgroundColor = "red";
      setenable(false);
      setdataset_name_error("Model Name contains special characters");
      document.getElementById("dname").style.borderColor = "#EC547A";
      document.getElementById("dname").style.boxShadow = "none";
    } else {
      setenable(true);
      document.getElementById("dname").style.borderColor = "#40a9ff";
    }
    let name = "";
    if (e.target.value.length === 0) {
      name = e.target.value;
    } else {
      name = e.target.value;
    }
    if (e.target.value.length < 3) {
      setenable(false);
      setdataset_name_error("Dataset Name should be 3 Characters Minimum");
      document.getElementById("dname").style.borderColor = "#EC547A";
      document.getElementById("dname").style.boxShadow = "none";
    }
    if (name[0] === " " || name[0] === "_" || name[0] === "-") {
      setenable(false);
      setdataset_name_error(
        "Dataset Name first character cannot be a special character"
      );
      document.getElementById("dname").style.borderColor = "#EC547A";
      document.getElementById("dname").style.boxShadow = "none";
    }
  };

  const removecreated = () => {
    setselected(null);
    setcreated(false);
    setnewdatabucket(false);
    setnewdatabucketname("");
    let temp = databuckets;
    temp.pop();
    setdatabuckets(temp);
  };

  return (
    <div className="AutoMLSaveDatasetModal">
      <Modal
        width={"80%"}
        style={{ top: 20 }}
        wrapClassName="DatasetsModal"
        visible={props.isModalVisible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={false}
        closable={false}
        destroyOnClose
        bodyStyle={{ borderRadius: "20px" }}
      >
        <AutoMLGeneratingDatasetLoader
          isModalVisible={showloading}
          handleCancel={() => setshowloading(false)}
        />
        <Cliploader loading={loading} />
        <div
          style={{
            height: "50px",
            background: "white",
            borderRadius: "20px 20px 0px 0px",
          }}
        >
          <div style={{ display: "flex", padding: "12px", marginLeft: "0px" }}>
            <h2
              style={{
                flexGrow: "1",
                fontWeight: "bold",
                color: "black",
                fontSize: "18px",
              }}
            >
              Save Dataset
            </h2>
            <img
              onClick={props.handleCancel}
              src={closeIcon}
              style={{
                paddingBottom: "10px",
                paddingRight: "15px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: "100%",
            marginTop: "30px",
            flexDirection: "column",
            textAlign: "left",
            paddingBottom: "19px",
          }}
        >
          <Row
            justify="space-between"
            style={{
              flexGrow: "1",
              marginBottom: "20px",
              height: "40vh",
              overflow: "scroll",
            }}
          >
            <Col
              style={{
                backgroundColor: "#F5FAFF",
                padding: "20px",
                borderRadius: "18px",
                width: "49%",
              }}
            >
              <h3 className="ModalHeading">Data Buckets</h3>

              {databuckets
                ? databuckets.map((item, index) => (
                    <AutoMLExistingDatabucketCard
                      key={index}
                      name={item.name}
                      id={index}
                      highlight={selected}
                      selected={(id) => {
                        console.log(id);
                        setselected(id);
                      }}
                      length={databuckets.length}
                      created={created}
                      remove={() => removecreated()}
                    />
                  ))
                : null}
              <div
                className="newdatasetbutton"
                style={
                  created
                    ? { display: "none" }
                    : {
                        display: "inline-block",
                        marginRight: "10px",
                        marginBottom: "10px",
                        marginTop: "-10px",
                      }
                }
              >
                {newdatabucket === false ? (
                  <Button
                    style={{
                      width: "100px",
                      height: "60px",
                      top: "10px",
                      borderColor: "#085FAB",
                      borderRadius: "10px",
                      backgroundColor: "inherit",
                    }}
                    onClick={() => setnewdatabucket(true)}
                    type="dashed"
                    icon={
                      <PlusOutlined
                        style={{
                          fontSize: "30px",
                          fontWeight: "700",
                          color: "#085FAB",
                          paddingTop: "5px",
                        }}
                      />
                    }
                  ></Button>
                ) : (
                  <div className="newdatabucket">
                    <div
                      className="box"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                        borderRadius: "10px",
                        height: "60px",
                        width: "100px",
                        border: "1px solid #085fab",
                        boxSizing: "border-box",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={dataBucket}
                        alt={"Data-bucket"}
                        style={{
                          width: "20px",
                          display: "block",
                          margin: "auto",
                        }}
                      />
                      <input
                        style={{
                          height: "15px",
                          padding: "0px",
                          margin: "4px",
                          paddingLeft: "10px",
                          fontSize: "11px",
                        }}
                        maxLength={30}
                        // onBlur={() => savedatasetapi()}
                        onKeyDown={(e) => validatekey(e)}
                        value={newdatabucketname}
                        onChange={(e) => setnewdatabucketname(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>
                )}
              </div>
            </Col>
            <Col
              style={{
                backgroundColor: "#F5FAFF",
                padding: "20px",
                borderRadius: "18px",
                width: "49%",
              }}
            >
              <h3 className="ModalHeading" style={{ marginBottom: "10px" }}>
                {selected !== null ? databuckets[selected].name : "Datasets"}
              </h3>
              {selected !== null
                ? databuckets[selected].datasets.map((item, index) => (
                    <div style={{ marginBottom: "12px" }} key={index}>
                      <img
                        src={fileIcon}
                        alt="FileIcon"
                        style={{ marginRight: "10px", width: "18px" }}
                      />
                      <div
                        style={{
                          fontWeight: "normal",
                          display: "inline-block",
                        }}
                      >
                        {item}
                      </div>
                    </div>
                  ))
                : null}
              <div></div>
            </Col>
          </Row>
          <label htmlFor="dname">Dataset Name</label>
          <input
            type="text"
            id="dname"
            autoComplete="off"
            name="dname"
            maxLength={30}
            value={datasetname}
            onChange={(e) => validatename(e)}
            placeholder="Enter dataset name..."
          ></input>
          <p
            style={
              dataset_name_error === null
                ? { display: "none" }
                : { color: "#EC547A", fontSize: "14px", fontFamily: "Lato" }
            }
          >
            *{dataset_name_error}
          </p>
          <label htmlFor="ddesc">
            Dataset Description
            <span
              style={{
                fontSize: "14px",
                fontWeight: "normal",
                color: "#90A8BE",
                fontStyle: "italic",
              }}
            >
              {" "}
              (optional)
            </span>{" "}
          </label>
          <input
            type="text"
            id="ddesc"
            name="ddesc"
            autoComplete="off"
            placeholder="Enter dataset description..."
          ></input>
          <br />
          <div style={{ marginBottom: "5px" }}>
            <Button
              style={
                selected !== null && enable
                  ? {
                      width: "130px",
                      height: "40px",
                      backgroundColor: "#085FAB",
                      fontFamily: "Lato",
                      fontSize: "16px",
                      fontWeight: "bold",
                      letterSpacing: "1.5px",
                      color: "white",
                      border: "none",
                      borderRadius: "65px",
                      borderColor: "none",
                    }
                  : {
                      opacity: "0.3",
                      width: "130px",
                      height: "40px",
                      backgroundColor: "#085FAB",
                      fontFamily: "Lato",
                      fontSize: "16px",
                      fontWeight: "bold",
                      letterSpacing: "1.5px",
                      color: "white",
                      border: "none",
                      borderRadius: "65px",
                      borderColor: "none",
                    }
              }
              disabled={enable && selected !== null ? false : true}
              onClick={() => savedataset()}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
