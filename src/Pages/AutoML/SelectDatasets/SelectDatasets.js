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
import axios from "axios";
import { URL } from "../../../Config/config";
import { serialize } from "object-to-formdata";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";
import { SelectedDatasetsContext } from "../../../Data/Contexts/AutoMLSelectedDatasetsCart/AutoMLSelectedDatasetsCart";
import Cliploader from "../../../Components/Loader/Cliploader";

export default function SelectDatasets(props) {
  const { TabPane } = Tabs;

  let { project_id, model_id } = useParams();

  const [selectedrow, setselectedrow] = useState(null);
  const [Sector, setSector] = useState(null);
  const [Sectors, setSectors] = useState(null);
  const [loading, setloading] = useState(false);
  const [Tab, setTab] = useState("financial_datasets");
  const [data, setdata] = useState(null);
  const [companies, setcompanies] = useState(null);
  const [selectedcompanies, setselectedcompanies] = useState(null);
  const [rendercompanies, setrendercompanies] = useState(false);
  const [rendertables, setrendertables] = useState(true);
  const [myDatasets, setmyDatasets] = useState(null);
  const [Created, setCreated] = useState(false);

  const { setCurrentPage } = useContext(PageContext);
  const { Auth } = useContext(AuthContext);
  const {
    SelectedDatasets,
    setSelectedDatasets,
    clearcart,
    updatecompanies,
  } = useContext(SelectedDatasetsContext);

  function callback(key) {}

  const nextPage = () => {
    setCurrentPage("selecteddatasets");

    console.log("Save Data in Cart and Next page");
    props.history.push({
      pathname: `/automl/projects/${project_id}/models/${model_id}/selected_datasets/`,
      state: { detail: "I am from Select Datasets page" },
    });
  };

  const getsectors = async () => {
    setCreated(true);
    let temp = {};
    setloading(true);
    await axios
      .get(`${URL}/data_extraction?input_type=Sector`)
      .then(function (response) {
        setloading(false);
        console.log(response);
        temp = response.data.options;
      })
      .then(function (error) {
        setloading(false);
        // console.log(error);
      });
    setSectors(temp);
  };

  if (Created === false) {
    getsectors();
  }

  const changeTab = async (tab) => {
    setdata(null);
    setcompanies(null);
    setselectedcompanies(null);
    setrendercompanies(!rendercompanies);
    if (tab === "my_datasets") {
      setTab(tab);
      setSectors(null);
      const myData = {
        company_id: Auth.company_id,
        user_id: Auth.user_id,
        data_type: tab,
      };
      console.log(myData);
      const formData = serialize(myData);
      setloading(true);
      await axios({
        method: "post",
        url: `${URL}/automl/load_datasets/`,
        data: formData,
        headers: {
          "content-type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      })
        .then(function (response) {
          setloading(false);
          let keys = Object.keys(response.data);
          setmyDatasets(response.data);
          setSectors(keys);
        })
        .catch(function (error) {
          console.log(error);
          setloading(false);
        });
    } else {
      setTab(tab);
      setSector(null);
      setSectors(null);
      if (tab === "financial_datasets") {
        let temp = {};
        await axios
          .get(`${URL}/data_extraction?input_type=Sector`)
          .then(function (response) {
            console.log(response);
            temp = response.data.options;
          })
          .then(function (error) {
            // console.log(error);
          });
        setSectors(temp);
      }
    }
  };

  const fetchdata = async (sector) => {
    if (Tab === "my_datasets") {
      let temp = [];
      let keys = Object.keys(myDatasets[`${sector}`]);
      keys.forEach((element, index) => {
        let obj = {
          key: index,
          final_name: element.split(".")[0],
          name: element.split(".")[0] + "__" + sector,
          rows: myDatasets[sector][`${element}`][`${"total_rows"}`],
          cols: myDatasets[sector][`${element}`][`${"total_columns"}`],
          columns: myDatasets[sector][`${element}`].columns,
          selectedcolumns: myDatasets[sector][`${element}`].columns,
          showncolumns: myDatasets[sector][`${element}`].columns,
          dtypes: myDatasets[sector][`${element}`].dtypes,
          preview: myDatasets[sector][`${element}`].preview,
          type: Tab,
          companies: myDatasets[sector][`${element}`].companies,
          selectedcompanies: myDatasets[sector][`${element}`].companies,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
          selected: "",
          sector: sector,
        };
        temp.push(obj);
      });
      let cart = SelectedDatasets.datasets;
      if (cart.length !== 0) {
        cart.forEach((element, index) => {
          temp.forEach((item) => {
            if (item.name === element.name && item.type === Tab) {
              item.selected = "yes";
              item.selectedcompanies = element.selectedcompanies;
            }
          });
        });
      }
      console.log(temp);
      setdata(temp);
      //My Datasets ^^
    } else {
      let temp = [];
      const myData = {
        company_id: Auth.company_id,
        user_id: Auth.user_id,
        data_type: Tab,
        sector: sector,
      };
      const formData = serialize(myData);
      setloading(true);
      await axios({
        method: "post",
        url: `${URL}/automl/load_datasets/`,
        data: formData,
        headers: {
          "content-type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      })
        .then(function (response) {
          setloading(false);
          let keys = Object.keys(response.data);
          console.log(response);
          keys.forEach((element, index) => {
            let obj = {
              key: index,
              final_name: element,
              name: element + "__" + sector,
              rows: response.data[`${element}`][`${"total rows"}`],
              cols: response.data[`${element}`][`${"total columns"}`],
              columns: response.data[`${element}`].columns,
              selectedcolumns: response.data[`${element}`].columns,
              showncolumns: response.data[`${element}`].columns,
              dtypes: response.data[`${element}`].dtypes,
              preview: response.data[`${element}`].preview,
              type: Tab,
              companies: response.data[`${element}`].companies,
              selectedcompanies: response.data[`${element}`].companies,
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
              selected: "",
              sector: sector,
            };
            temp.push(obj);
          });
        })
        .catch(function (error) {
          setloading(false);
          console.log(error);
        });
      let cart = SelectedDatasets.datasets;
      if (cart.length !== 0) {
        cart.forEach((element, index) => {
          temp.forEach((item) => {
            if (item.name === element.name && item.type === Tab) {
              item.selected = "yes";
              item.selectedcompanies = element.selectedcompanies;
            }
          });
        });
      }
      setdata(temp);
    }
  };

  const showcompanies = (id) => {
    setselectedrow(id);
    setcompanies(data[id].companies);
    setselectedcompanies(data[id].selectedcompanies);
    // setcompanies(["A", "B", "C", "D"]);
    setrendercompanies(!rendercompanies);
  };

  const removeselected = (val) => {
    let temp = [];
    if (selectedcompanies.length !== 0) {
      selectedcompanies.forEach((element) => {
        temp.push(element);
      });
    }
    let index = temp.indexOf(val);
    temp.splice(index, 1);
    console.log(temp);
    console.log(companies);
    setselectedcompanies(temp);
    setrendercompanies(!rendercompanies);
  };

  const addselected = (val) => {
    let temp = selectedcompanies;
    temp.push(val);
    setrendercompanies(!rendercompanies);
  };

  const addtoCart = () => {
    if (data[selectedrow].selected === "yes") {
      console.log("item already in cart");
      data[selectedrow].selectedcompanies = selectedcompanies;
      updatecompanies(data[selectedrow], Tab);
    } else {
      data[selectedrow].selectedcompanies = selectedcompanies;
      data[selectedrow].selected = "yes";
      setSelectedDatasets(data[selectedrow], Tab);
      setrendertables(!rendertables);
    }
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
          Data Selection
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
          <div style={{ width: "100%", marginRight: "0px" }}>
            <AutoMLSelectDatasetsTabs
              setTab={(val) => {
                changeTab(val);
              }}
            />
          </div>
          {/* <Button
            className={styles.importbutton}
            style={loading === true ? { display: "none" } : null}
          >
            Import{" "}
          </Button> */}
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
              data={Sectors}
              selected={(sector) => {
                setSector(sector);
                fetchdata(sector);
              }}
              value={Sector}
              type={Tab === "my_datasets" ? "Data Bucket" : "Sector"}
            />
          </div>
          {loading === true ? (
            <Skeleton active loading={loading} />
          ) : (
            <AutoMLExistingDatasetsTable
              selected={(id) => {
                showcompanies(id);
              }}
              data={data}
              render={rendertables}
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
            disabled={SelectedDatasets.datasets.length === 0 ? true : false}
          >
            Continue
          </Button>
        </div>
      </Col>
      <Col span={7} className={styles.column2} id="Column2">
        <h3 className={styles.titleBold}>Companies</h3>
        <div style={{ minHeight: "15vh", overflowY: "scroll", flexGrow: "1" }}>
          <CompaniesGroup
            data={companies}
            selected={selectedcompanies}
            removeselected={(val) => removeselected(val)}
            addselected={(val) => addselected(val)}
            render={rendercompanies}
            removesingle={(val) => {
              setselectedcompanies(null);
              setrendercompanies(!rendercompanies);
            }}
            addsingle={(val) => {
              setselectedcompanies([val]);
              setrendercompanies(!rendercompanies);
            }}
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
            disabled={
              Tab === "financial_data" || Tab === "financial_datasets"
                ? true
                : false
            }
            picker="day"
            placeholder="Starting Date"
            className={styles.dateinput}
          />
          {/* <p className={styles.datetitle}>Ending Date</p> */}
          <DatePicker
            disabled={
              Tab === "financial_data" || Tab === "financial_datasets"
                ? true
                : false
            }
            picker="day"
            placeholder="Ending Date"
            className={styles.dateinput}
          />
        </div>
        <Button onClick={() => addtoCart()} className={styles.addcartbutton}>
          Add to Data Cart
        </Button>
        {/* <Button onClick={() => clearcart()}>Clear Cart (TESTING)</Button> */}
      </Col>
      <Cliploader loading={loading} />
    </Row>
  );
}
