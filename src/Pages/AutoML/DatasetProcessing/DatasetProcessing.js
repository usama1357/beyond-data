import { Button, Col, Row, Skeleton } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import ColumnsGroup from "../../../Components/Containers/ColumnsGroup/ColumnsGroup";
import AutoMLDatasetProcessingList from "../../../Components/List/AutoMLDatasetProcessingList/AutoMLDatasetProcessingList";
import AutoMLSelectedDatasetsPreviewRowsTable from "../../../Components/Tables/AutoMLSelectedDataPopupTables/AutoMLSelectedDatasetsPreviewRowsTable";
import AutoMLSelectedDatasetsMetaTable from "../../../Components/Tables/AutoMLSelectedDatasetsMetaTable/AutoMLSelectedDatasetsMetaTable";
import { PageContext } from "../../../Data/Contexts/AutoMLPageState/AutoMLPageStateContext";
import styles from "./DatasetProcessing.module.scss";
import "./styles.css";

export default function DatasetProcessing(props) {
  let { project_id, model_id } = useParams();
  const [loading, setloading] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [dummy, setdummy] = useState(false);

  const { setCurrentPage } = useContext(PageContext);

  const [meta, setmeta] = useState([
    {
      key: "1",
      name: "FFC Report",
      cols: ["ID", "Name", "Department", "Lorem Ipsum", "Dolar Sit"],
    },
    {
      key: "2",
      name: "FFC",
      cols: [
        "ID",
        "Name",
        "Department",
        "Lorem Ipsum",
        "Dolar Sit",
        "etc",
        "etc1",
      ],
    },
    {
      key: "3",
      name: "OIL and Gas",
      cols: ["ID", "Name", "Department", "Lorem Ipsum", "Dolar Sit"],
    },
    {
      key: "4",
      name: "Fertilizer",
      cols: ["ID", "Name", "Department", "Lorem Ipsum", "Dolar Sit"],
    },
  ]);
  let rows = [
    [
      "Customer ID",
      "Product ID",
      "Dept Name",
      "Quantity",
      "Lorem Ipsum",
      "Price",
    ],
    ["1234", "AB567", "QIB231", "Lorem Ipsum", "Oil Barrel", "131"],
    ["1234", "AB567", "QIB231", "Lorem Ipsum", "Oil Barrel", "131"],
    ["1234", "AB567", "QIB231", "Lorem Ipsum", "Oil Barrel", "131"],
  ];
  let metaData = [
    ["Product ID", "Dept Name", "Quantity", "Lorem Ipsum", "Price"],
    ["Integer", "String", "Integer", "String", "Integer"],
    ["-", "-", "In Hundreds", "Percentage", "In Millions"],
    ["-", "-", "-", "(a+b)/2", "-"],
  ];

  const nextPage = () => {
    setCurrentPage("linking");
    props.history.push({
      pathname: `/automl/projects/${project_id}/models/${model_id}/link_columns/`,
      state: {
        detail: "I am from Selected page",
        page_name: "automl_link_Column",
      },
    });
  };

  const previewDataset = (id) => {
    console.log(id);
    setshowpopup(true);
  };

  function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  }

  const moveup = (id) => {
    let temp = meta;
    if (id !== 0) {
      array_move(temp, id, id - 1);
      setmeta(temp);
      setdummy(!dummy);
    }
  };
  const movedown = (id) => {
    let temp = meta;
    if (id !== meta.length - 1) {
      array_move(temp, id, id + 1);
      setmeta(temp);
      setdummy(!dummy);
    }
  };

  return (
    <Row
      justify="space-between"
      className={styles.container}
      id="SelectedDatasets"
    >
      <Col span={17} className={styles.column1}>
        <h3 className={styles.titleBold}>
          {project_id} | <span className={styles.subtitle}>{model_id}</span>
        </h3>
        <h3
          style={{
            textAlign: "left",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "0px",
          }}
        >
          Dataset Processing
        </h3>
        <hr
          style={{
            width: "100%",
            backgroundColor: "#E1EEFF",
            border: "none",
            height: "1px",
            marginBottom: "0px",
          }}
        />
        <div
          style={{
            flexGrow: "1",
            overflow: "scroll",
            paddingRight: "10px",
          }}
        >
          {loading === true ? (
            <Skeleton active loading={loading} />
          ) : (
            <AutoMLDatasetProcessingList
              data={meta}
              moveup={(id) => moveup(id)}
              movedown={(id) => movedown(id)}
              dummy={dummy}
              preview={(id) => previewDataset(id)}
            />
          )}
        </div>
        <div style={{ textAlign: "left", marginTop: "10px" }}>
          <Button className={styles.linkcolbutton} onClick={() => nextPage()}>
            Continue
          </Button>
        </div>
      </Col>
      <Col span={7} className={styles.column2}>
        <h3 className={styles.titleBold}>/Dataset Name/</h3>
        <div
          style={{ flexGrow: "1", overflowY: "scroll", paddingRight: "10px" }}
        >
          {loading === true ? (
            <Skeleton active loading={loading} />
          ) : (
            <ColumnsGroup
              data={[
                "Abc",
                "defedededde",
                "eyg",
                "AbcD",
                "defD",
                "eygD",
                "AbcE",
                "defE",
                "eygE",
              ]}
            />
          )}
        </div>
        <Button
          onClick={() => {
            console.log("Update Columns");
          }}
          className={styles.addcartbutton}
        >
          Update Columns
        </Button>
        <hr
          style={{
            width: "100%",
            backgroundColor: "#E1EEFF",
            border: "none",
            height: "1px",
            marginBottom: "20px",
          }}
        />
        <h3 className={styles.titleBold}>Required Training Parameters</h3>
        <div className={styles.info}>
          Required No. of Rows:
          <span style={{ float: "right" }}>96</span>
        </div>
        <div className={styles.info}>
          Suggested No. of Rows:
          <span style={{ float: "right" }}>255</span>
        </div>
        <div className={styles.info}>
          Required Col to Row Ratio:
          <span style={{ float: "right" }}>300</span>
        </div>
        <div className={styles.info}>
          Suggested Col to Row Ratio:
          <span style={{ float: "right" }}>25:1</span>
        </div>
      </Col>
      <Modal
        title={"Selected Dataset Name..."}
        visible={showpopup}
        footer={false}
        centered
        onCancel={() => setshowpopup(false)}
        wrapClassName="PreviewPopup"
        width={"80%"}
      >
        <p className="sublink">default dataset</p>
        <p className="subtitle" style={{ marginBottom: "7px" }}>
          Dataset Description
        </p>
        <p className="desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut l abore.
        </p>
        <div
          style={{
            width: "inherit",
            overflowX: "scroll",
            paddingBottom: "10px",
          }}
        >
          <AutoMLSelectedDatasetsPreviewRowsTable rows={rows} />
        </div>
        <p className="subtitle" style={{ marginTop: "10px" }}>
          Meta Data
        </p>
        <div
          style={{
            width: "inherit",
            overflowX: "scroll",
            paddingBottom: "10px",
          }}
        >
          <AutoMLSelectedDatasetsMetaTable rows={metaData} />
        </div>
      </Modal>
    </Row>
  );
}
