import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import AutoMLCustomisedDatasetTabs from "../../../Components/Tabs/AutoMLCustomisedDatasetTabs/AutoMLCustomisedDatasetTabs";
import "./styles.css";
import InfoIcon from "../../../Components/Icons/AutoML/infopreview.svg";
import targetIcon from "../../../Components/Icons/AutoML/targeticon.svg";
import AutoMLCustomisedDatasetDropdown from "../../../Components/Dropdowns/AutoMLCustomisedDatasetDropdown/AutoMLCustomisedDatasetDropdown";
import { Button, message } from "antd";
import AutoMLCustomisedDatasetsMetaTable from "../../../Components/Tables/AutoMLCustomisedDatasetsMetaTable/AutoMLCustomisedDatasetsMetaTable";
import AutoMLCustomisedDatasetsPreviewTable from "../../../Components/Tables/AutoMLCustomisedDatasetsPreviewTable/AutoMLCustomisedDatasetsPreviewTable";
import { PageContext } from "../../../Data/Contexts/AutoMLPageState/AutoMLPageStateContext";
import { CustomTableContext } from "../../../Data/Contexts/AutoMLCustomTable/AutoMLCustomTableContext";
import axios from "axios";
import { URL } from "../../../Config/config";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";
import Cliploader from "../../../Components/Loader/Cliploader";

export default function CustomisedDataset() {
  let { project_id, model_id } = useParams();
  let history = useHistory();

  const { setCurrentPage } = useContext(PageContext);
  const { CustomTable, setCustomTable } = useContext(CustomTableContext);
  const { Auth } = useContext(AuthContext);

  const [rendertable, setrendertable] = useState(true);
  const [created, setcreated] = useState(false);
  const [loading, setloading] = useState(false);
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

  if (created === false) {
    setcreated(true);
    let temp = [];
    let i = [];
    for (const [key, value] of Object.entries(
      CustomTable.customtable.data[0]
    )) {
      i.push(key);
    }
    temp.push(i);
    CustomTable.customtable.data.map((item, index) => {
      let arr = [];
      for (const [key, value] of Object.entries(item)) {
        arr.push(value);
      }
      temp.push(arr);
    });
    setpreviewrows(temp);
    let temp_array = [];
    //  {
    //   name: "Customer ID",
    //   id: 1,
    // data_type: "Integer",
    // nullable: "false",
    // missing_values: "1.5%",
    // invalid_values: "1.2%",
    // distinct_values: "1022",
    // correlation: "126",
    // },
    CustomTable.customtable.meta.forEach((element, index) => {
      temp_array.push({
        name: element.columns,
        id: index,
        data_type: element.dtypes,
        nullable:
          element.nullable === "True"
            ? "true"
            : element.nullable === "False"
            ? "false"
            : null,
        missing_values: element.missing_percentage,
        invalid_values: element.invalid_values_percentage,
        distinct_values: element.distinct_values_percentage,
        correlation: "-",
        disabled: false,
      });
    });
    setdataset(temp_array);
  }

  const setvalues = async (target) => {
    setloading(true);
    let FinalObject = {
      company_name: Auth.company_name,
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      target_column: target,
      databucket_name: CustomTable.customtable.bucket.databucket_name,
      dataset_name: CustomTable.customtable.bucket.dataset_name,
    };
    console.log(FinalObject);
    await axios
      .post(`${URL}/automl/find_correlations/`, FinalObject)
      .then(function (response) {
        dataset.forEach((element, index) => {
          if (element.name === target) {
            element.disabled = true;
          } else {
            element.disabled = false;
          }
        });
        dataset.forEach((element) => {
          response.data.forEach((item) => {
            if (item.column === element.name) {
              element.correlation = item.correlation;
            }
          });
        });
        setrendertable(!rendertable);

        setloading(false);
      })
      .catch(function (error) {
        setloading(false);
        console.log(error);
        message.error("Server Error");
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          message.error(error.response.data);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
        }
      });
  };

  const confirm = () => {
    setCustomTable({
      data: CustomTable.customtable.data,
      meta: CustomTable.customtable.meta,
      bucket: {
        databucket_name: CustomTable.customtable.bucket.databucket_name,
        dataset_name: CustomTable.customtable.bucket.dataset_name,
      },
      target: target.name,
      filtered: dataset,
      l: CustomTable.customtable.l,
    });
    setCurrentPage("correlation");
    history.push({
      pathname: `/automl/projects/${project_id}/models/${model_id}/correlation/`,
      state: {
        detail: "I am from New link page",
        page_name: "automl_customised_datasets",
      },
    });
  };

  const setnullable = async (item) => {
    await dataset.forEach((element) => {
      if (element.name === item.name) {
        if (element.nullable === "true") {
          element.nullable = "false";
        } else {
          element.nullable = "true";
        }
      }
    });
    setrendertable(!rendertable);
  };

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
          marginBottom: "2px",
        }}
      >
        Target Selection
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
          <h3 className="rowtitle">Custom Dataset</h3>
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
          <div style={{ marginBottom: "20px" }}>
            <AutoMLCustomisedDatasetDropdown
              data={dataset}
              selected={(target) => {
                settarget({ id: "id", name: target });
                setvalues(target);
              }}
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
          <AutoMLCustomisedDatasetsMetaTable
            data={dataset}
            setnullable={(item) => setnullable(item)}
            render={rendertable}
          />
        </div>
        <Button className="generatebutton" onClick={() => confirm()}>
          Generate Correlation
        </Button>
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
          <p style={{ textAlign: "left", color: "#6d6d6d", fontSize: "13px" }}>
            <img src={InfoIcon} alt="info" width={12} /> Showing data for first
            50 rows only
          </p>
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
      <Cliploader loading={loading} />
    </div>
  );
}
