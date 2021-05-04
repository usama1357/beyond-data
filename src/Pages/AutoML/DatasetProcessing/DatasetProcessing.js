import { Button, Col, Row, Skeleton } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import ColumnsGroup from "../../../Components/Containers/ColumnsGroup/ColumnsGroup";
import AutoMLDatasetProcessingList from "../../../Components/List/AutoMLDatasetProcessingList/AutoMLDatasetProcessingList";
import AutoMLSelectedDatasetsPreviewRowsTable from "../../../Components/Tables/AutoMLSelectedDataPopupTables/AutoMLSelectedDatasetsPreviewRowsTable";
import AutoMLSelectedDatasetsMetaTable from "../../../Components/Tables/AutoMLSelectedDatasetsMetaTable/AutoMLSelectedDatasetsMetaTable";
import { PageContext } from "../../../Data/Contexts/AutoMLPageState/AutoMLPageStateContext";
import { SelectedDatasetsContext } from "../../../Data/Contexts/AutoMLSelectedDatasetsCart/AutoMLSelectedDatasetsCart";
import styles from "./DatasetProcessing.module.scss";
import "./styles.css";

export default function DatasetProcessing(props) {
  let { project_id, model_id } = useParams();
  const [loading, setloading] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [dummy, setdummy] = useState(false);
  const [columns, setcolumns] = useState(null);
  const [Selected, setSelected] = useState(null);
  const [selectedcolumns, setselectedcolumns] = useState(null);
  const [rendercolumns, setrendercolumns] = useState(false);
  const [name, setname] = useState(null);
  const [rows1, setrows1] = useState(null);
  const [meta1, setmeta1] = useState(null);

  const { setCurrentPage } = useContext(PageContext);
  const { SelectedDatasets, updatecolumns } = useContext(
    SelectedDatasetsContext
  );

  const [meta, setmeta] = useState(null);

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

  if (meta === null) {
    let datasets = SelectedDatasets;
    let temp = [];
    datasets.datasets.forEach((item) => {
      temp.push(item);
    });
    setmeta(temp);
    console.log(temp);
  }

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
    setSelected(id);
    if (meta[Selected]) {
      //Rows
      let rows11 = [];
      rows11.push(meta[Selected].showncolumns);
      meta[Selected].preview.forEach((element) => {
        let temp = [];
        for (const [key, value] of Object.entries(element)) {
          if (meta[Selected].showncolumns.includes(key)) {
            temp.push(value);
          }
        }
        rows11.push(temp);
        setrows1(rows11);
      });
      //Meta
      let meta11 = [];
      let indexes = [];
      meta11.push(meta[Selected].showncolumns);
      meta[Selected].showncolumns.forEach((item) => {
        indexes.push(meta[Selected].columns.indexOf(item));
      });
      let datatypes = [];
      indexes.forEach((item) => {
        datatypes.push(meta[Selected].dtypes[item]);
      });
      meta11.push(datatypes);
      let empty = [];
      for (let index = 0; index < meta[Selected].showncolumns.length; index++) {
        empty.push("-");
      }
      meta11.push(empty);
      meta11.push(empty);
      setmeta1(meta11);
    }
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

  const setselected = (id) => {
    setSelected(id);
    setcolumns(meta[id].columns);
    setselectedcolumns(meta[id].selectedcolumns);
    setrendercolumns(!rendercolumns);
    setname(meta[id].name);
  };

  const removeselected = (val) => {
    let temp = selectedcolumns;
    let arr = [];
    temp.forEach((element) => {
      if (element !== val) {
        arr.push(element);
      }
    });
    // let index = temp.indexOf(val);
    // temp.splice(index, 1);
    meta[Selected].selectedcolumns = arr;
    setselectedcolumns(arr);
    setrendercolumns(!rendercolumns);
  };

  const addselected = (val) => {
    let temp = selectedcolumns;
    let arr = [];
    temp.push(val);
    meta[Selected].columns.forEach((element, index) => {
      if (temp.includes(element)) {
        arr.push(element);
      }
    });
    meta[Selected].selectedcolumns = arr;
    setselectedcolumns(arr);
    // temp.push(val);
    setrendercolumns(!rendercolumns);
    console.log(meta[Selected].showncolumns);
  };

  const updateColumnsFront = () => {
    console.log(meta[Selected]);
    meta[Selected].showncolumns = selectedcolumns;
    updatecolumns(meta[Selected], meta[Selected].type);
    setrendercolumns(!rendercolumns);
  };

  return (
    <Row
      justify="space-between"
      className={styles.DatasetProcessing}
      id="Datasetprocessing"
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
          Data Filtering
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
              selected={(id) => setselected(id)}
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
        <h3 className={styles.titleBold}>{name}</h3>
        <div
          style={{ flexGrow: "1", overflowY: "scroll", paddingRight: "10px" }}
        >
          {loading === true ? (
            <Skeleton active loading={loading} />
          ) : (
            <ColumnsGroup
              data={columns}
              selected={selectedcolumns}
              removeselected={(val) => removeselected(val)}
              addselected={(val) => addselected(val)}
              render={rendercolumns}
            />
          )}
        </div>
        <Button
          onClick={() => updateColumnsFront()}
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
      {Selected !== null && rows1 && meta1 ? (
        <Modal
          title={meta[Selected].name}
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
          <p className="desc">{meta[Selected].description}</p>
          <div
            style={{
              width: "inherit",
              overflowX: "scroll",
              paddingBottom: "10px",
            }}
          >
            <AutoMLSelectedDatasetsPreviewRowsTable rows={rows1} />
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
            <AutoMLSelectedDatasetsMetaTable rows={meta1} />
          </div>
        </Modal>
      ) : null}
    </Row>
  );
}
