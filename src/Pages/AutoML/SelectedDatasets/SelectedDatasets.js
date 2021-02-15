import { Button, Col, Row } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import SelectedDataList from "../../../Components/List/SelectedDataList";
import AutoMLSelectedDatasetsTable from "../../../Components/Tables/AutoMLSelectedDatasets/AutoMLSelectedDatasetsTable";
import styles from "./SelectedDatasets.module.scss";

export default function SelectedDatasets() {
  let { project_id, model_id } = useParams();

  return (
    <Row justify="space-between" className={styles.container}>
      <Col span={16} className={styles.column1}>
        <h3 className={styles.titleBold}>
          {project_id} | <span className={styles.subtitle}>{model_id}</span>
        </h3>
        <h3 style={{ textAlign: "left", fontSize: "20px", fontWeight: "bold" }}>
          Selected Dataset
        </h3>
        <hr
          style={{
            width: "100%",
            backgroundColor: "#E1EEFF",
            border: "none",
            height: "1px",
          }}
        />
        <div style={{ flexGrow: "1", overflow: "scroll" }}>
          <AutoMLSelectedDatasetsTable />
        </div>
        <div style={{ textAlign: "left", marginTop: "10px" }}>
          <Button className={styles.linkcolbutton}>Link Columns</Button>
        </div>
      </Col>
      <Col span={7} className={styles.column2}>
        <h3 className={styles.titleBold}>Companies</h3>
        <div
          style={{ flexGrow: "1", overflowY: "scroll", paddingRight: "10px" }}
        >
          <SelectedDataList
            data={[
              "Oil and Gas Refinery",
              "Oil and Gas Refinery",
              "Oil and Gas Refinery",
              "Oil and Gas Refinery",
              "Oil and Gas Refinery",
            ]}
          />
        </div>
        <hr
          style={{
            width: "100%",
            backgroundColor: "#E1EEFF",
            border: "none",
            height: "1px",
          }}
        />
        <div className={styles.info}>
          Minimum Column Table:
          <span style={{ float: "right" }}>
            FFC{" "}
            <span style={{ fontWeight: "500", fontStyle: "italic" }}>
              (2 columns)
            </span>
          </span>
        </div>
        <div className={styles.info}>
          Maximum Column Table:
          <span style={{ float: "right" }}>
            FFC
            <span style={{ fontWeight: "500", fontStyle: "italic" }}>
              (20 columns)
            </span>
          </span>
        </div>
        <div className={styles.info}>
          Min No. of Rows Required:
          <span style={{ float: "right" }}>96</span>
        </div>
        <div className={styles.info}>
          Suggested No. of Rows Required:
          <span style={{ float: "right" }}>255</span>
        </div>
        <div className={styles.info}>
          Optimal No. of Rows Required:
          <span style={{ float: "right" }}>300</span>
        </div>
        <div className={styles.info}>
          Optimal row to column ratio:
          <span style={{ float: "right" }}>25:1</span>
        </div>
      </Col>
    </Row>
  );
}
