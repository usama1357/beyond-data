import { Button, Col, DatePicker, Row } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./SelectDatasets.module.scss";
import { Tabs } from "antd";
import "./tabstyles.scss";
import AutoMLExistingDatasetsTable from "../../../Components/Tables/AutoMLExistingDatasets/AutoMLExistingDatasetsTable";
import CompaniesGroup from "../../../Components/Containers/CompaniesGroup/CompaniesGroup";
import AutoMLSelectDatasetsDropdown from "../../../Components/Dropdowns/AutoMLSelectDatasetsDropdown/AutoMLSelectDatasetsDropdown";

export default function SelectDatasets(props) {
  const { TabPane } = Tabs;
  let { project_id, model_id } = useParams();
  const [selectedrow, setselectedrow] = useState(null);
  const [Sector, setSector] = useState(null);

  function callback(key) {}

  const nextPage = () => {
    console.log("Save Data in Cart and Next page");
    props.history.push({
      pathname: `/automl/projects/${project_id}/models/${model_id}/selected_datasets/`,
      state: { detail: "I am from Select Datasets page" },
    });
  };

  return (
    <Row justify="space-between" className={styles.container}>
      <Col span={16} className={styles.column1}>
        <h3 className={styles.titleBold}>
          {project_id} | <span className={styles.subtitle}>{model_id}</span>
        </h3>
        <h3 style={{ textAlign: "left", fontSize: "20px", fontWeight: "bold" }}>
          Dataset Collection
        </h3>
        <hr
          style={{
            width: "100%",
            backgroundColor: "#E1EEFF",
            border: "none",
            height: "1px",
            marginBottom: "25px",
          }}
        />
        <Tabs
          defaultActiveKey="1"
          onChange={callback}
          size="small"
          style={{ paddingBottom: "20px" }}
        >
          <TabPane tab="Financial Data" key="1"></TabPane>
          <TabPane tab="Trading Data" key="2"></TabPane>
          <TabPane tab="Economical Data" key="3"></TabPane>
          <TabPane tab="Industrial Data" key="4"></TabPane>
          <TabPane tab="My Datasets" key="5"></TabPane>
        </Tabs>
        <Button className={styles.importbutton}>Import </Button>
        <div style={{ flexGrow: "1", overflow: "scroll", marginTop: "10px" }}>
          <div style={{ textAlign: "left" }}>
            <AutoMLSelectDatasetsDropdown
              data={["Oil and Gas", "Banks"]}
              selected={(sector) => setSector(sector)}
              type="Sector"
            />
          </div>
          <AutoMLExistingDatasetsTable
            selected={(id) => {
              setselectedrow(id);
            }}
          />
        </div>
        <div style={{ textAlign: "left", marginTop: "10px" }}>
          <Button
            className={styles.continuebutton}
            onClick={() => {
              nextPage();
            }}
          >
            Continue
          </Button>
        </div>
      </Col>
      <Col span={7} className={styles.column2}>
        <h3 className={styles.titleBold}>Companies</h3>
        <div style={{ height: "15vh", overflowY: "scroll" }}>
          <CompaniesGroup
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
        </div>
        <hr
          style={{
            width: "100%",
            backgroundColor: "#E1EEFF",
            marginTop: "20px",
            border: "none",
            marginBottom: "42px",
            height: "1px",
          }}
        />
        <h3 className={styles.titleBold}>Date Range</h3>
        <div style={{ flexGrow: "1" }}>
          <p className={styles.datetitle}>Starting Date</p>
          <DatePicker picker="year" className={styles.dateinput} />
          <p className={styles.datetitle}>Ending Date</p>
          <DatePicker picker="year" className={styles.dateinput} />
        </div>
        <Button
          onClick={() => {
            console.log("Add Selected Dataset in Cart");
          }}
          className={styles.addcartbutton}
        >
          Add to Data Cart
        </Button>
      </Col>
    </Row>
  );
}
