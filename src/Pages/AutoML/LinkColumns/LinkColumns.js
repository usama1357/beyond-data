import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AutoMLSaveDatasetModal from "../../../Components/Modals/AutoMLSaveDatasetModal/AutoMLSaveDatasetModal";
import LinkColumnsReactFlow from "../../../Components/ReactFlow/LinkColumnsReactFlow/LinkColumnsReactFlow";
import "./styles.css";
import editicon from "../../../Components/Icons/AutoML/edit.svg";
import DeleteIcon from "../../../Components/Icons/AutoML/deleteDatasetIcon.svg";

export default function LinkColumns(props) {
  let { project_id, model_id } = useParams();
  const [showresultantmodal, setshowresultantmodal] = useState(false);
  const [saveDataset, setsaveDataset] = useState(false);
  const [editable, seteditable] = useState(false);

  const [customtable, setcustomtable] = useState([
    {
      name: "Customer ID",
      id: 1,
      data_type: "Integer",
    },
    {
      name: "Customer Name",
      id: 2,
      data_type: "String",
    },
    {
      name: "Customer Address",
      id: 3,
      data_type: "String",
    },
    {
      name: "Date of Purchase",
      id: 4,
      data_type: "String",
    },
    {
      name: "Quantity",
      id: 5,
      data_type: "Integer",
    },
  ]);

  const generateTable = () => {
    props.history.push({
      pathname: `/automl/projects/${project_id}/models/${model_id}/customised_dataset/`,
      state: {
        detail: "I am from New link page",
        page_name: "automl_customised_datasets",
      },
    });
  };

  const handleCancel = () => {
    setshowresultantmodal(false);
    seteditable(false);
  };

  return (
    <div className="LinkColumns">
      <h3 className={"titleBold"}>
        {project_id} | <span className={"subtitle"}>{model_id}</span>
      </h3>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h3
          style={{
            textAlign: "left",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "0px",
            flexGrow: "1",
          }}
        >
          Dataset Processing
        </h3>
        <Button>Reset</Button>
      </div>
      <hr
        style={{
          width: "100%",
          backgroundColor: "#E1EEFF",
          border: "none",
          height: "1px",
          marginBottom: "0px",
        }}
      />
      <div style={{ flexGrow: "1", height: "100%" }}>
        <LinkColumnsReactFlow
          showresulttable={() => setshowresultantmodal(true)}
          generateTable={() => setsaveDataset(true)}
        />
      </div>
      <Modal
        title="Custom Table"
        visible={showresultantmodal}
        onCancel={handleCancel}
        footer={false}
        wrapClassName="resultantpopup"
        width={"80%"}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3
            style={{
              textAlign: "left",
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "0px",
            }}
          >
            Custom Table
          </h3>
          {editable === false ? (
            <h3
              className={"titleBold"}
              style={{ cursor: "pointer" }}
              onClick={() => seteditable(true)}
            >
              <img src={editicon} alt="edit icon" /> Edit Column Names
            </h3>
          ) : (
            <h3
              className={"titleBold"}
              style={{ cursor: "pointer" }}
              onClick={() => seteditable(false)}
            >
              Discard
            </h3>
          )}
          <div>
            <ul className="custom_row" style={{ marginTop: "20px" }}>
              {customtable.map((d, index) => (
                <li key={d.name} style={{ display: "inline-block" }}>
                  {editable ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <input value={d.name} />
                      <img
                        src={DeleteIcon}
                        alt="delete icon"
                        style={{
                          cursor: "pointer",
                          marginTop: "0px",
                          width: "25px",
                          marginLeft: "10px",
                        }}
                      />
                    </div>
                  ) : (
                    d.name
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3
              style={{
                float: "left",
                marginTop: "10px",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "18px",
                lineHeight: "22px",
                marginTop: "18px",
                marginRight: "20px",
                cursor: "pointer",
              }}
              onClick={() => setshowresultantmodal(false)}
            >
              Cancel
            </h3>
            <Button
              style={{ float: "left", marginTop: "10px", width: "100px" }}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
      <AutoMLSaveDatasetModal
        isModalVisible={saveDataset}
        handleCancel={() => setsaveDataset(false)}
        handleOk={() => setsaveDataset(false)}
      />
      {/* <div> */}
      {/* <div className="row" style={{ display: "flex", flexDirection: "row" }}> */}
      {/* <div className="box2" style={{ flexGrow: "1" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3
                style={{
                  textAlign: "left",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "0px",
                }}
              >
                Custom Table
              </h3>
              <h3 className={"titleBold"}>(icon) Edit Column Names</h3>
              <div style={{ flexGrow: "1" }}>Custom table Row</div>
              <Button style={{ float: "left" }} onClick={() => generateTable()}>
                Generate Table
              </Button>
            </div>
          </div> */}
      {/* <div className="box3">
            <h3
              style={{
                textAlign: "left",
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "0px",
                margin: "0px",
              }}
            >
              Required Training Parameters
            </h3>
            <div className={"info"}>
              Required No. of Rows:
              <span style={{ float: "right" }}>96</span>
            </div>
            <div className={"info"}>
              Suggested No. of Rows:
              <span style={{ float: "right" }}>255</span>
            </div>
            <div className={"info"}>
              Required Col to Row Ratio:
              <span style={{ float: "right" }}>300</span>
            </div>
            <div className={"info"}>
              Suggested Col to Row Ratio:
              <span style={{ float: "right" }}>25:1</span>
            </div>
          </div> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}
