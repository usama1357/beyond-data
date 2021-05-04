import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AutoMLSaveDatasetModal from "../../../Components/Modals/AutoMLSaveDatasetModal/AutoMLSaveDatasetModal";
import LinkColumnsReactFlow from "../../../Components/ReactFlow/LinkColumnsReactFlow/LinkColumnsReactFlow";
import "./styles.css";
import editicon from "../../../Components/Icons/AutoML/edit.svg";
import discardIcon from "../../../Components/Icons/AutoML/discardresultant.svg";
import DeleteIcon from "../../../Components/Icons/AutoML/deleteDatasetIcon.svg";
import { SelectedDatasetsContext } from "../../../Data/Contexts/AutoMLSelectedDatasetsCart/AutoMLSelectedDatasetsCart";

export default function LinkColumns(props) {
  let { project_id, model_id } = useParams();
  const [showresultantmodal, setshowresultantmodal] = useState(false);
  const [saveDataset, setsaveDataset] = useState(false);
  const [editable, seteditable] = useState(false);
  const { SelectedDatasets } = useContext(SelectedDatasetsContext);
  const [rendertable, setrendertable] = useState(true);
  const [renderresultant, setrenderresultant] = useState(false);

  const [links, setlinks] = useState([]);

  const [data, setdata] = useState(null);
  const [customtable, setcustomtable] = useState();
  const [renamedcols, setrenamedcols] = useState([]);
  const [deletedcols, setdeletedcols] = useState([]);
  const [tempdeletedcols, settempdeletedcols] = useState([]);

  //For Unmerging
  const [unmergeddata, setunmergeddata] = useState(null);

  if (data === null || unmergeddata === null) {
    let temp = [];
    SelectedDatasets.datasets.forEach((element) => {
      let cols = [];
      let indexes = [];
      element.selectedcolumns.forEach((item) => {
        indexes.push(element.columns.indexOf(item));
      });
      indexes.forEach((i) => {
        cols.push({ name: element.columns[i], type: element.dtypes[i] });
      });
      temp.push({ name: element.name, cols: cols });
    });
    setdata(temp);
    setunmergeddata(temp);
    let cols = [];
    let indexes = [];
    SelectedDatasets.datasets[0].selectedcolumns.forEach((item) => {
      indexes.push(SelectedDatasets.datasets[0].columns.indexOf(item));
    });
    indexes.forEach((i, index) => {
      cols.push({
        id: index,
        name: SelectedDatasets.datasets[0].columns[i],
        data_type: SelectedDatasets.datasets[0].dtypes[i],
      });
    });
    setcustomtable({ name: SelectedDatasets.datasets[0].name, cols: cols });
  }

  const generateTable = () => {
    props.history.push({
      pathname: `/automl/projects/${project_id}/models/${model_id}/customised_dataset/`,
      state: {
        detail: "I am from New link page",
        page_name: "automl_customised_datasets",
      },
    });
  };

  const handleCancel = () => {
    setshowresultantmodal(false);
    seteditable(false);
    setdeletedcols([]);
    resetcustomtable();
    setrendertable(!rendertable);
  };

  const makelink = (cols, link) => {
    setunmergeddata({ links: links, data: data, customtable: customtable });
    let temp = links;
    let arr = [];
    arr.push(link.sourcetable);
    arr.push(link.sourcetable);
    arr.push(link.targettable);
    let sourcecols = [];
    let targetcols = [];
    let selectedtable = null;
    let targettable = null;
    data.forEach((item, index) => {
      if (item.name === link.sourcetable) {
        selectedtable = data[index];
      }
    });
    data.forEach((item, index) => {
      if (item.name === link.targettable) {
        targettable = data[index];
      }
    });
    link.source.forEach((item) => {
      sourcecols.push(selectedtable.cols[item].name);
    });
    link.target.forEach((item) => {
      targetcols.push(targettable.cols[item].name);
    });
    arr.push(sourcecols);
    arr.push(targetcols);
    arr.push({});
    arr.push([]);
    temp.push(arr);
    setlinks(temp);
    let newdata = [];
    let selectedtablecols = selectedtable.cols;

    targettable.cols.forEach((item, index) => {
      if (!link.target.includes(index)) {
        selectedtablecols.push(item);
      }
    });
    let duplicatecols = [];
    selectedtablecols.forEach((item, index) => {
      for (let i = index + 1; i < selectedtablecols.length; i++) {
        if (item.name === selectedtablecols[i].name) {
          selectedtablecols[index].name = `${selectedtablecols[index].name}_1`;
          selectedtablecols[i].name = `${selectedtablecols[i].name}_2`;
        }
      }
    });
    console.log(selectedtablecols);
    newdata.push({ name: link.sourcetable, cols: selectedtablecols });
    data.forEach((item, index) => {
      if (index > 1) {
        newdata.push({ name: item.name, cols: item.cols });
      }
    });
    console.log(newdata);
    console.log(links);
    setdata(newdata);
    setcustomtable({ name: newdata[0].name, cols: newdata[0].cols });
    setrendertable(!rendertable);
    setrenamedcols([]);
    resetcustomtable();
  };

  const changecolname = (val, index) => {
    let temp = renamedcols;
    let selected = links[links.length - 1];
    let cols = data[0].cols;
    let found = false;
    if (temp.length > 0) {
      temp.forEach((item, i) => {
        if (Object.keys(item)[0] === data[0].cols[index].name) {
          found = true;
          temp[i][data[0].cols[index].name] = val;
          // setrenamedcols(temp);
          //Change name in custom table
          let custom = customtable;
          custom.cols[`${index}`].name = val;
          setcustomtable(custom);
          setrenderresultant(!renderresultant);
        }
      });
    } else {
      found = true;
      let obj = {};
      obj[`${data[0].cols[index].name}`] = val;
      temp.push(obj);
      setrenamedcols(temp);
      //Change name in custom table
      let custom = customtable;
      custom.cols[`${index}`].name = val;
      setcustomtable(custom);
      setrenderresultant(!renderresultant);
    }
    if (found === false) {
      let obj = {};
      obj[`${data[0].cols[index].name}`] = val;
      temp.push(obj);
      setrenamedcols(temp);
      //Change name in custom table
      let custom = customtable;
      custom.cols[`${index}`].name = val;
      setcustomtable(custom);
      setrenderresultant(!renderresultant);
    }
  };

  const saveRenamedCols = () => {
    seteditable(false);
    //Delete Cols in main data
    if (deletedcols.length !== 0) {
      let temp3 = data[0].cols;
      let positions = [];
      temp3.forEach((element, index) => {
        if (deletedcols.includes(element.name)) {
          positions.push(index);
        }
      });
      let count = 0;
      positions.forEach((item) => {
        temp3.splice(item + count, 1);
        count = count - 1;
      });
    }

    ////Change name in main data
    if (renamedcols.length !== 0) {
      let temp = data;
      temp[0].cols.forEach((element) => {
        renamedcols.forEach((item) => {
          if (Object.keys(item)[0] === element.name) {
            element.name = Object.values(item)[0];
          }
        });
      });
      setdata(temp);
      setrendertable(!rendertable);
      //add changed cols in links
      let renamed = {};
      if (renamedcols.length === 1) {
        renamed = renamedcols;
      } else {
        renamedcols.forEach((element) => {
          for (const [key, value] of Object.entries(element)) {
            renamed[`${key}`] = value;
          }
        });
      }
      if (links.length > 0) {
        let temp = links;
        temp[links.length - 1][5] = renamed;
        setlinks(temp);
      }
    } else {
      if (links.length > 0) {
        let temp = links;
        temp[links.length - 1][5] = {};
        setlinks(temp);
      }
    }
    //Add Deleted in links
    if (links[links.length - 1][6]) {
      links[links.length - 1][6] = [
        ...links[links.length - 1][6],
        ...deletedcols,
      ];
    } else {
      links[links.length - 1].push(deletedcols);
    }
    setdeletedcols([]);
    console.log(links);
  };

  const resetcustomtable = () => {
    setrenamedcols([]);
    let cols = [];
    let indexes = [];
    data[0].cols.forEach((element, index) => {
      cols.push({
        id: index,
        name: element.name,
        data_type: element.type,
      });
    });
    setcustomtable({ name: data[0].name, cols: cols });
    setrendertable(!rendertable);
  };

  const resetdata = () => {
    setlinks([]);
    let temp = [];
    SelectedDatasets.datasets.forEach((element) => {
      let cols = [];
      let indexes = [];
      element.selectedcolumns.forEach((item) => {
        indexes.push(element.columns.indexOf(item));
      });
      indexes.forEach((i) => {
        cols.push({ name: element.columns[i], type: element.dtypes[i] });
      });
      temp.push({ name: element.name, cols: cols });
    });
    setdata(temp);
    setunmergeddata(temp);
    let cols = [];
    let indexes = [];
    SelectedDatasets.datasets[0].selectedcolumns.forEach((item) => {
      indexes.push(SelectedDatasets.datasets[0].columns.indexOf(item));
    });
    indexes.forEach((i, index) => {
      cols.push({
        id: index,
        name: SelectedDatasets.datasets[0].columns[i],
        data_type: SelectedDatasets.datasets[0].dtypes[i],
      });
    });
    setcustomtable({ name: SelectedDatasets.datasets[0].name, cols: cols });
    setrenamedcols([]);
    setrendertable(!rendertable);
  };

  const unmergedata = () => {
    if (unmergeddata !== null) {
      console.log("Gone");
      console.log(unmergeddata);
      let temp = unmergeddata;
      let l = [];
      if (temp.links.length === 1) {
        l = [];
      } else {
        l = temp.links.pop();
      }
      setlinks(l);
      setcustomtable(temp.customtable);
      setdata(temp.data);
      setrenderresultant(!renderresultant);
      setrendertable(!rendertable);
      setrenamedcols([]);
      setdeletedcols([]);
      setunmergeddata(null);
    }
  };

  const deletecol = (index) => {
    let temp = data[0].cols;
    let temp1 = customtable.cols;
    let deleted = deletedcols;
    deleted.push(temp1[index].name);
    // temp.splice(index, 1);
    temp1.splice(index, 1);
    setrendertable(!rendertable);
    setrenderresultant(!renderresultant);
    setdeletedcols(deleted);
    //Add Deleted in links
    // if (links[links.length - 1][6]) {
    //   links[links.length - 1][6] = deleted;
    // } else {
    //   links[links.length - 1].push(deleted);
    // }
  };

  return (
    <div className="LinkColumns">
      <h3 className={"titleBold"}>
        {project_id} | <span className={"subtitle"}>{model_id}</span>
      </h3>

      <div style={{ flexGrow: "1", height: "100%" }}>
        <LinkColumnsReactFlow
          data={data}
          makelink={(cols, links) => makelink(cols, links)}
          showresulttable={() => {
            resetcustomtable();
            setshowresultantmodal(true);
          }}
          generateTable={() => setsaveDataset(true)}
          render={rendertable}
          unmerge={unmergedata}
          createdlinks={links}
          resetdata={resetdata}
        />
      </div>
      <Modal
        title="Custom Table"
        visible={showresultantmodal}
        onCancel={handleCancel}
        footer={false}
        wrapClassName="resultantpopup"
        width={"80%"}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3
            style={{
              textAlign: "left",
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "0px",
            }}
          >
            {customtable ? customtable.name : ""}
          </h3>
          {editable === false ? (
            <h3
              className={"titleBold"}
              style={{ cursor: "pointer", marginTop: "15px" }}
              onClick={() => seteditable(true)}
            >
              <img src={editicon} alt="edit icon" /> Edit Column Names
            </h3>
          ) : (
            <h3
              className={"titleBold"}
              style={{ cursor: "pointer", marginTop: "15px", color: "#6d6d6d" }}
              onClick={() => {
                resetcustomtable();
                seteditable(false);
              }}
            >
              <img
                src={discardIcon}
                style={{ marginRight: "3px", paddingBottom: "3px" }}
                alt="edit icon"
              />
              Discard Changes
            </h3>
          )}
          <div>
            <ul
              className="custom_row"
              style={{ marginTop: "2px", paddingBottom: "10px" }}
            >
              {customtable
                ? customtable.cols.map((d, index) => (
                    <li
                      key={index}
                      style={
                        editable
                          ? { display: "inline-block", paddingRight: "6px" }
                          : { display: "inline-block" }
                      }
                    >
                      {editable ? (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <input
                            className="renamecol_input"
                            value={d.name}
                            onChange={(e) =>
                              changecolname(e.target.value, index)
                            }
                          />
                          <img
                            src={DeleteIcon}
                            alt="delete icon"
                            style={{
                              cursor: "pointer",
                              marginTop: "0px",
                              width: "25px",
                              marginLeft: "10px",
                            }}
                            onClick={() => deletecol(index)}
                          />
                        </div>
                      ) : (
                        d.name
                      )}
                    </li>
                  ))
                : null}
            </ul>
          </div>
          {editable === true ? (
            <div style={{ marginTop: "5px" }}>
              {/* <h3
                style={{
                  float: "left",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                  lineHeight: "22px",
                  marginTop: "18px",
                  marginRight: "20px",
                  cursor: "pointer",
                }}
                onClick={() => setshowresultantmodal(false)}
              >
                Cancel
              </h3> */}
              <Button
                style={{ float: "left", marginTop: "10px", width: "100px" }}
                onClick={() => saveRenamedCols()}
              >
                Save
              </Button>
            </div>
          ) : (
            <br />
          )}
        </div>
      </Modal>
      <AutoMLSaveDatasetModal
        isModalVisible={saveDataset}
        handleCancel={() => setsaveDataset(false)}
        handleOk={() => setsaveDataset(false)}
        links={links}
      />
      {/* <div> */}
      {/* <div className="row" style={{ display: "flex", flexDirection: "row" }}> */}
      {/* <div className="box2" style={{ flexGrow: "1" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3
                style={{
                  textAlign: "left",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "0px",
                }}
              >
                Custom Table
              </h3>
              <h3 className={"titleBold"}>(icon) Edit Column Names</h3>
              <div style={{ flexGrow: "1" }}>Custom table Row</div>
              <Button style={{ float: "left" }} onClick={() => generateTable()}>
                Generate Table
              </Button>
            </div>
          </div> */}
      {/* <div className="box3">
            <h3
              style={{
                textAlign: "left",
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "0px",
                margin: "0px",
              }}
            >
              Required Training Parameters
            </h3>
            <div className={"info"}>
              Required No. of Rows:
              <span style={{ float: "right" }}>96</span>
            </div>
            <div className={"info"}>
              Suggested No. of Rows:
              <span style={{ float: "right" }}>255</span>
            </div>
            <div className={"info"}>
              Required Col to Row Ratio:
              <span style={{ float: "right" }}>300</span>
            </div>
            <div className={"info"}>
              Suggested Col to Row Ratio:
              <span style={{ float: "right" }}>25:1</span>
            </div>
          </div> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}
