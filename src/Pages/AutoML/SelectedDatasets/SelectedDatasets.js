/* eslint-disable no-unused-vars */
import { Button, Col, Row, Skeleton } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import SelectedDataList from "../../../Components/List/SelectedDataList";
import AutoMLSelectedDatasetsPreviewRowsTable from "../../../Components/Tables/AutoMLSelectedDataPopupTables/AutoMLSelectedDatasetsPreviewRowsTable";
import AutoMLSelectedDatasetsTable from "../../../Components/Tables/AutoMLSelectedDatasets/AutoMLSelectedDatasetsTable";
import AutoMLSelectedDatasetsMetaTable from "../../../Components/Tables/AutoMLSelectedDatasetsMetaTable/AutoMLSelectedDatasetsMetaTable";
import { PageContext } from "../../../Data/Contexts/AutoMLPageState/AutoMLPageStateContext";
import { SelectedDatasetsContext } from "../../../Data/Contexts/AutoMLSelectedDatasetsCart/AutoMLSelectedDatasetsCart";
import styles from "./SelectedDatasets.module.scss";
import "./styles.css";

export default function SelectedDatasets(props) {
  let { project_id, model_id } = useParams();
  const [loading, setloading] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [data, setdata] = useState(null);
  const [renderlist, setrenderlist] = useState(false);
  const [preview, setpreview] = useState(null);
  const [rows, setrows] = useState(null);
  const [meta, setmeta] = useState(null);

  const { setCurrentPage } = useContext(PageContext);
  const { SelectedDatasets, deletedataset } = useContext(
    SelectedDatasetsContext
  );

  if (data === null && SelectedDatasets) {
    let datasets = SelectedDatasets;
    let temp = [];
    datasets.datasets.forEach((item) => {
      let obj = { type: item.type, data: item };
      temp.push(obj);
    });
    setdata(temp);
    setrenderlist(!renderlist);
  }

  let rows11 = [
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
  let meta1 = [
    ["Product ID", "Dept Name", "Quantity", "Lorem Ipsum", "Price"],
    ["Integer", "String", "Integer", "String", "Integer"],
    ["-", "-", "In Hundreds", "Percentage", "In Millions"],
    ["-", "-", "-", "(a+b)/2", "-"],
  ];

  const nextPage = () => {
    setCurrentPage("datasetprocessing");
    props.history.push({
      pathname: `/automl/projects/${project_id}/models/${model_id}/dataset_processing/`,
      state: {
        detail: "I am from Selected page",
        page_name: "automl_link_Column",
      },
    });
  };
  const previewDataset = (id) => {
    console.log(data[id]);
    let rows1 = [];
    rows1.push(data[id].data.columns);
    data[id].data.preview.forEach((element) => {
      rows1.push(Object.values(element));
    });
    setrows(rows1);
    let meta1 = [];
    meta1.push(data[id].data.columns);
    meta1.push(data[id].data.dtypes);
    let temp = [];
    for (let index = 0; index < data[id].data.columns.length; index++) {
      temp.push("-");
    }
    meta1.push(temp);
    meta1.push(temp);
    setmeta(meta1);

    setpreview(data[id]);
    setshowpopup(true);
  };

  const deleteitem = (item) => {
    let dataset = item.data;
    let type = item.type;
    deletedataset(dataset, type);
    setdata(null);
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
          Data Cart
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
          style={{ flexGrow: "1", overflow: "scroll", paddingRight: "10px" }}
        >
          {loading === true ? (
            <Skeleton active loading={loading} />
          ) : (
            <AutoMLSelectedDatasetsTable
              data={data}
              previewDataset={(id) => previewDataset(id)}
            />
          )}
        </div>
        <div style={{ textAlign: "left", marginTop: "10px" }}>
          <Button
            className={styles.linkcolbutton}
            onClick={() => nextPage()}
            disabled={SelectedDatasets.datasets.length === 0 ? true : false}
          >
            Continue
          </Button>
        </div>
      </Col>
      <Col span={7} className={styles.column2}>
        <h3 className={styles.titleBold}>Datasets</h3>
        <div
          style={{ flexGrow: "1", overflowY: "scroll", paddingRight: "0px" }}
        >
          {loading === true ? (
            <Skeleton active loading={loading} />
          ) : (
            <SelectedDataList
              data={data}
              delete={(item) => deleteitem(item)}
              render={renderlist}
            />
          )}
        </div>
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
      {preview ? (
        <Modal
          title={preview.data.name}
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
          <p className="desc">{preview.data.description} </p>
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
            <AutoMLSelectedDatasetsMetaTable rows={meta} />
          </div>
        </Modal>
      ) : null}
    </Row>
  );
}
