import { Button, Col, DatePicker, Row, Skeleton } from "antd";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./SelectDatasets.module.scss";
import { Tabs } from "antd";
import "./tabstyles.css";
import AutoMLExistingDatasetsTable from "../../../Components/Tables/AutoMLExistingDatasets/AutoMLExistingDatasetsTable";
import CompaniesGroup from "../../../Components/Containers/CompaniesGroup/CompaniesGroup";
import AutoMLSelectDatasetsDropdown from "../../../Components/Dropdowns/AutoMLSelectDatasetsDropdown/AutoMLSelectDatasetsDropdown";
import AutoMLSelectDatasetsTabs from "../../../Components/Tabs/AutoMLSelectDatasetsTabs/AutoMLSelectDatasetsTabs";
import { PageContext } from "../../../Data/Contexts/AutoMLPageState/AutoMLPageStateContext";

export default function SelectDatasets(props) {
  const { TabPane } = Tabs;

  let { project_id, model_id } = useParams();

  const [selectedrow, setselectedrow] = useState(null);
  const [Sector, setSector] = useState(null);
  const [loading, setloading] = useState(false);
  const [Tab, setTab] = useState(false);

  const { setCurrentPage } = useContext(PageContext);

  function callback(key) {}

  const nextPage = () => {
    setCurrentPage("selecteddatasets");

    console.log("Save Data in Cart and Next page");
    props.history.push({
      pathname: `/automl/projects/${project_id}/models/${model_id}/selected_datasets/`,
      state: { detail: "I am from Select Datasets page" },
    });
  };

  return (
    <Row justify="space-between" className={styles.container}>
      <Col span={17} className={styles.column1} id="Column1">
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
          Dataset Collection
        </h3>
        <hr
          style={{
            width: "100%",
            backgroundColor: "#E1EEFF",
            border: "none",
            height: "1px",
            marginBottom: "10px",
          }}
        />
        <div style={{ display: "flex", flexDirection: "row" }} className="tabs">
          {/* <Tabs
            defaultActiveKey="1"
            onChange={callback}
            size="small"
            style={{ flexGrow: "1" }}
          >
            <TabPane tab="Financial Data" key="1"></TabPane>
            <TabPane tab="Trading Data" key="2"></TabPane>
            <TabPane tab="Economical Data" key="3"></TabPane>
            <TabPane tab="Industrial Data" key="4"></TabPane>
            <TabPane tab="My Datasets" key="5"></TabPane>
          </Tabs> */}
          <div style={{ width: "85%", marginRight: "25px" }}>
            <AutoMLSelectDatasetsTabs setTab={(val) => setTab(val)} />
          </div>
          <Button
            className={styles.importbutton}
            style={loading === true ? { display: "none" } : null}
          >
            Import{" "}
          </Button>
        </div>
        <div
          style={{
            flexGrow: "1",
            overflowY: "scroll",
            marginTop: "10px",
            paddingRight: "10px",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <AutoMLSelectDatasetsDropdown
              data={["Oil and Gas", "Banks"]}
              selected={(sector) => setSector(sector)}
              type="Sector"
            />
          </div>
          {loading === true ? (
            <Skeleton active loading={loading} />
          ) : (
            <AutoMLExistingDatasetsTable
              selected={(id) => {
                setselectedrow(id);
              }}
            />
          )}
        </div>
        <div
          style={
            loading === true
              ? { display: "none" }
              : { textAlign: "left", marginTop: "10px" }
          }
        >
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
      <Col span={7} className={styles.column2} id="Column2">
        <h3 className={styles.titleBold}>Companies</h3>
        <div style={{ minHeight: "15vh", overflowY: "scroll", flexGrow: "1" }}>
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
            marginBottom: "10px",
            height: "1px",
          }}
        />
        <h3 className={styles.titleBold}>Date Range</h3>
        <div style={{ marginBottom: "40px" }}>
          {/* <p className={styles.datetitle}>Starting Date</p> */}
          <DatePicker
            picker="year"
            placeholder="Starting Date"
            className={styles.dateinput}
          />
          {/* <p className={styles.datetitle}>Ending Date</p> */}
          <DatePicker
            picker="year"
            placeholder="Ending Date"
            className={styles.dateinput}
          />
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
