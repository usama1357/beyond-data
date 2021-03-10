import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AutoMLCustomisedDatasetTabs from "../../../Components/Tabs/AutoMLCustomisedDatasetTabs/AutoMLCustomisedDatasetTabs";
import "./styles.css";
import targetIcon from "../../../Components/Icons/AutoML/targeticon.svg";
import AutoMLCustomisedDatasetDropdown from "../../../Components/Dropdowns/AutoMLCustomisedDatasetDropdown/AutoMLCustomisedDatasetDropdown";
import { Button } from "antd";
import AutoMLCustomisedDatasetsMetaTable from "../../../Components/Tables/AutoMLCustomisedDatasetsMetaTable/AutoMLCustomisedDatasetsMetaTable";
import AutoMLCustomisedDatasetsPreviewTable from "../../../Components/Tables/AutoMLCustomisedDatasetsPreviewTable/AutoMLCustomisedDatasetsPreviewTable";

export default function CustomisedDataset() {
  let { project_id, model_id } = useParams();
  const [tab, settab] = useState("meta_data");
  const [target, settarget] = useState({ id: "", name: "" });
  const [dataset, setdataset] = useState([
    {
      name: "Customer ID",
      id: 1,
      data_type: "Integer",
      nullable: "false",
      missing_values: "1.5%",
      invalid_values: "1.2%",
      distinct_values: "1022",
      correlation: "126",
    },
    {
      name: "Customer Name",
      id: 2,
      data_type: "String",
      nullable: "true",
      missing_values: "2.5%",
      invalid_values: "1.4%",
      distinct_values: "1452",
      correlation: "056",
    },
    {
      name: "Customer Address",
      id: 3,
      data_type: "String",
      nullable: "false",
      missing_values: "1.2%",
      invalid_values: "2.5%",
      distinct_values: "1342",
      correlation: "157",
    },
    {
      name: "Date of Purchase",
      id: 4,
      data_type: "String",
      nullable: "true",
      missing_values: "2.4%",
      invalid_values: "3.1%",
      distinct_values: "1410",
      correlation: "202",
    },
    {
      name: "Quantity",
      id: 5,
      data_type: "Integer",
      nullable: "true",
      missing_values: "2.2%",
      invalid_values: "0%",
      distinct_values: "1502",
      correlation: "111",
    },
  ]);
  const [previewrows, setpreviewrows] = useState([
    [
      "Customer ID",
      "Product ID",
      "Dept Name",
      "Quantity",
      "Lorem ipsum",
      "Price",
    ],
    ["1234", "AB567", "QIB768", "Lorem Ipsum", "Oil Barrel", "1500"],
    ["1234", "AB567", "QIB768", "Lorem Ipsum", "Oil Barrel", "1500"],
    ["1234", "AB567", "QIB768", "Lorem Ipsum", "Oil Barrel", "1500"],
    ["1234", "AB567", "QIB768", "Lorem Ipsum", "Oil Barrel", "1500"],
    ["1234", "AB567", "QIB768", "Lorem Ipsum", "Oil Barrel", "1500"],
    ["1234", "AB567", "QIB768", "Lorem Ipsum", "Oil Barrel", "1500"],
    ["1234", "AB567", "QIB768", "Lorem Ipsum", "Oil Barrel", "1500"],
    ["1234", "AB567", "QIB768", "Lorem Ipsum", "Oil Barrel", "1500"],
    ["1234", "AB567", "QIB768", "Lorem Ipsum", "Oil Barrel", "1500"],
    ["1234", "AB567", "QIB768", "Lorem Ipsum", "Oil Barrel", "1500"],
  ]);

  return (
    <div className="CustomisedDataset">
      <h3 className="titleBold">
        {project_id} | <span className="subtitle">{model_id}</span>
      </h3>
      <h3
        style={{
          textAlign: "left",
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "0px",
        }}
      >
        Customised Dataset
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
      <div>
        <AutoMLCustomisedDatasetTabs setTab={(val) => settab(val)} />
      </div>
      <div
        className="box1"
        style={
          tab === "meta_data"
            ? { display: "flex", flexDirection: "column", height: "inherit" }
            : { display: "none" }
        }
      >
        <div style={{ textAlign: "left" }}>
          <h3 className="rowtitle">Fatima Fertilizer</h3>
          <ul className="custom_row">
            {dataset.map((d) => (
              <li
                key={d.name}
                className={target.name === d.name ? "highlighted" : "listitem"}
                style={{ display: "inline-block" }}
              >
                <img
                  src={targetIcon}
                  alt="targetIcon"
                  width={13}
                  style={
                    target.name === d.name
                      ? { marginRight: "5px", paddingBottom: "1px" }
                      : { display: "none" }
                  }
                />
                {d.name}
              </li>
            ))}
          </ul>
          <h3 className="featuretitle">Feature Target</h3>
          <div style={{ marginBottom: "30px" }}>
            <AutoMLCustomisedDatasetDropdown
              data={dataset}
              selected={(target) => settarget({ id: "id", name: target })}
              type="target"
            />
          </div>
          {/* <hr
            style={{
              width: "100%",
              backgroundColor: "#E1EEFF",
              border: "none",
              height: "1px",
              marginBottom: "0px",
            }}
          /> */}
        </div>
        <div
          style={{
            flexGrow: "1",
            height: "10vh",
            marginBottom: "5px",
            overflowY: "scroll",
          }}
        >
          <AutoMLCustomisedDatasetsMetaTable data={dataset} />
        </div>
        <Button className="generatebutton">Generate Correlation</Button>
      </div>
      <div
        className="box2"
        style={
          tab === "meta_data"
            ? { display: "none" }
            : { display: "flex", flexDirection: "column", height: "inherit" }
        }
      >
        <div style={{ flexGrow: "1", overflowY: "scroll", height: "10vh" }}>
          <AutoMLCustomisedDatasetsPreviewTable
            rows={previewrows}
            target={target.name}
          />
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
        <Button className="generatebutton">Generate Correlation</Button>
      </div>
    </div>
  );
}
