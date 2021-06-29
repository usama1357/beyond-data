import { Button, message } from "antd";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Cliploader from "../../../Components/Loader/Cliploader";
import AutoMLCustomisedDatasetTabs from "../../../Components/Tabs/AutoMLCustomisedDatasetTabs/AutoMLCustomisedDatasetTabs";
import "./styles.css";
import InfoIcon from "../../../Components/Icons/AutoML/infopreview.svg";
import targetIcon from "../../../Components/Icons/AutoML/targeticon.svg";
import AutoMLCustomisedDatasetsPreviewTable from "../../../Components/Tables/AutoMLCustomisedDatasetsPreviewTable/AutoMLCustomisedDatasetsPreviewTable";
import DataLakeConfigureMetaTable from "../../../Components/Tables/DataLakeConfigureMetaTable/DataLakeConfigureMetaTable";
import { DataLakeBucketContext } from "../../../Data/Contexts/DataLake/DataLakeBucketContext/DataLakeBucketContext";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";
import { DataLakeDatasetContext } from "../../../Data/Contexts/DataLake/DataLakeDatasetContext/DataLakeDatasetContext";
import axios from "axios";
import { URL } from "../../../Config/config";

export default function DatasetConfigure(props) {
  let { dataset } = useParams();

  const [tab, settab] = useState("meta_data");
  const [target, settarget] = useState({ id: "", name: "" });
  const [data, setdata] = useState([
    {
      name: "Customer ID",
      id: 1,
      data_type: "Integer",
      nullable: "false",
      missing_values: "1.5%",
      invalid_values: "1.2%",
      distinct_values: "1022",
      correlation: "126",
      options: ["Integer", "String"],
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
      options: ["Integer", "String"],
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
      options: ["Integer", "String"],
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
      options: ["Integer", "String"],
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
      options: ["Integer", "String"],
    },
  ]);
  const [loading, setloading] = useState(false);
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
  const [rendertable, setrendertable] = useState(false);
  const [enable, setenable] = useState(false);

  const { Bucket } = useContext(DataLakeBucketContext);
  const { Auth } = useContext(AuthContext);
  const { Dataset } = useContext(DataLakeDatasetContext);

  const [data1, setdata1] = useState(null);

  const loadData = () => {
    setdata1("asdasd");
    console.log(Dataset.dataset);
    if (Dataset.dataset && Dataset.dataset.dataset_metadata.columns) {
      let arr = [];
      Dataset.dataset.dataset_metadata.columns.forEach((element, index) => {
        let opt = [];
        if (Dataset.dataset.dataset_metadata.toggle_dtype[index] === true) {
          if (Dataset.dataset.dataset_metadata.dtypes[index] === "numeric") {
            opt = ["numeric", "categorical"];
          } else if (
            Dataset.dataset.dataset_metadata.dtypes[index] === "categorical"
          ) {
            opt = ["categorical", "numeric"];
          } else if (
            Dataset.dataset.dataset_metadata.dtypes[index] === "timestamp"
          ) {
            opt = ["timestamp", "categorical"];
          }
        }
        let obj = {
          name: element,
          id: index,
          data_type: Dataset.dataset.dataset_metadata.dtypes[index],
          missing_values:
            Dataset.dataset.dataset_metadata.missing_percentage[index].toFixed(
              1
            ),
          invalid_values:
            Dataset.dataset.dataset_metadata.invalid_values_percentage[
              index
            ].toFixed(1),
          distinct_values:
            Dataset.dataset.dataset_metadata.distinct_values_percentage[
              index
            ].toFixed(1),
          options: opt,
          changed: false,
        };
        arr.push(obj);
      });
      setdata(arr);
      let temp = [];
      let keys = Object.keys(Dataset.dataset.dataset_preview);
      temp.push(keys);
      Dataset.dataset.dataset_preview[`${keys[0]}`].forEach(
        (element, index) => {
          let arr = [];
          keys.forEach((element) => {
            arr.push(Dataset.dataset.dataset_preview[`${element}`][index]);
          });
          temp.push(arr);
        }
      );
      setpreviewrows(temp);
    } else {
      setdata(null);
      setpreviewrows(null);
    }
  };

  if (data1 === null) {
    loadData();
  }

  const changeType = (val, index) => {
    setenable(true);
    let temp = [];
    data.forEach((element) => {
      temp.push(element);
    });
    temp[index].data_type = val;
    temp[index].changed = true;
    setdata(temp);
    setrendertable(!rendertable);
  };

  const cancelAction = () => {
    console.log("cancel");
    props.history.push({
      pathname: `/datalake/${Bucket.bucket.name}/datasets/`,
      state: {
        detail: "I am from Databuckets Screen",
        page_name: "Datasets_Screen",
      },
    });
  };
  const saveAction = async () => {
    setloading(true);
    setenable(false);
    let updated = {};
    data.forEach((element, index) => {
      if (element.options.length > 0) {
        if (element.data_type !== element.options[0]) {
          updated[`${element.name}`] = {
            current_dtype: element.options[0],
            updated_dtype: element.options[1],
          };
        }
      }
    });
    let obj = {
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      company_name: Auth.company_name,
      databucket_name: Bucket.bucket.name,
      dataset_name: Dataset.dataset.name,
      update: updated,
    };
    console.log(obj);
    await axios({
      method: "post",
      url: `${URL}/automl/configure_dataset/`,
      data: {
        company_id: Auth.company_id,
        user_id: Auth.user_id,
        company_name: Auth.company_name,
        databucket_name: Bucket.bucket.name,
        dataset_name: Dataset.dataset.name,
        update: updated,
      },
    })
      .then(function (response) {
        setloading(false);
        console.log(response);
      })
      .catch(function (error) {
        setloading(false);
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

  return (
    <div className="DatasetConfigure">
      <Cliploader loading={loading} handleCancel={() => setloading(false)} />
      <h3
        style={{
          textAlign: "left",
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "1px",
        }}
      >
        Configuration
      </h3>
      <h3 className="titleBold">{dataset}</h3>
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
          <ul className="custom_row">
            {data.map((d) => (
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
          <hr
            style={{
              width: "100%",
              backgroundColor: "#E1EEFF",
              border: "none",
              height: "1px",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          />
        </div>
        <div
          style={{
            flexGrow: "1",
            height: "10vh",
            width: "70%",
            marginBottom: "5px",
            overflowY: "scroll",
          }}
        >
          <DataLakeConfigureMetaTable
            data={data}
            render={rendertable}
            changeType={(val, index) => changeType(val, index)}
          />
        </div>
        <div style={{ display: "flex" }}>
          <div className="discard" onClick={() => cancelAction()}>
            Back
          </div>
          <Button
            className={enable ? "generatebutton" : "generatebuttondisabled"}
            disabled={!enable}
            onClick={() => saveAction()}
          >
            Save
          </Button>
        </div>
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
        {/* <Button className="generatebutton">Save</Button> */}
      </div>
    </div>
  );
}
