import React, { useContext, useEffect, useState } from "react";
import NoData from "../../NoData/NoData";
import styles from "./DataLakeDatasetsTable.module.scss";
import bucketIcon from "../../Icons/DataLake/datasetIcon.svg";
import infoIcon from "../../Icons/DataLake/infoIcon.svg";
import configureIcon from "../../Icons/DataLake/configureIcon.svg";
import { DataLakeBucketContext } from "../../../Data/Contexts/DataLake/DataLakeBucketContext/DataLakeBucketContext";
import { URL } from "../../../Config/config";
import axios from "axios";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";
import { serialize } from "object-to-formdata";
import { DataLakeDatasetContext } from "../../../Data/Contexts/DataLake/DataLakeDatasetContext/DataLakeDatasetContext";
import Cliploader from "../../Loader/Cliploader";

export default function DataLakeDatasetsTable(props) {
  const [data, setdata] = useState(null);
  const [selected, setselected] = useState(null);
  const [rendered, setrendered] = useState(false);
  const [mainCheck, setmainCheck] = useState(false);
  const [data1, setdata1] = useState(null);
  const [tempData, settempData] = useState(null);
  const [reset, setreset] = useState(false);

  const [loading, setloading] = useState(false);

  const { Bucket } = useContext(DataLakeBucketContext);
  const { Auth, setAuth } = useContext(AuthContext);
  const { setDataset } = useContext(DataLakeDatasetContext);

  useEffect(() => {
    if (props.value === "") {
      setdata(tempData);
    } else {
      let temp = [];
      tempData.forEach((element) => {
        if (element.name.includes(props.value)) {
          temp.push(element);
        }
      });
      setdata(temp);
    }
  }, [props.value]);

  const loadDatasets = async () => {
    let s = "";
    if (Bucket.type === "My Data") {
      s = "p";
    } else if (Bucket.type === "Downloaded Data") {
      s = "d";
    } else if (Bucket.type === "Global Data") {
      s = "s";
    }
    setloading(true);
    setdata1([{}]);
    let temp = [];
    let obj = {
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      databucket_name: Bucket.bucket.name,
      space: s,
    };
    const formData = serialize(obj);
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
        let temp = [];
        if (response.data) {
          response.data.forEach((element) => {
            temp.push({
              name: element.dataset_name,
              created_by: element.user_name,
              description: element.dataset_desc,
              last_modified: element.last_modified,
              size: element.size,
              checked: false,
              cols_invalid_indexes: element.cols_invalid_indexes,
              dataset_metadata: element.dataset_metadata,
              dataset_preview: element.dataset_preview,
              used_in_models: element.used_in_models,
              used_in_reports: element.used_in_reports,
            });
          });
          setdata(temp);
          settempData(temp);
        } else {
          setdata(null);
          settempData(temp);
        }
      })
      .catch(function (error) {
        setloading(false);
        // setdata(null);
        console.log(error);
      });
  };

  if (data1 === null) {
    loadDatasets();
  }

  useEffect(() => {
    loadDatasets();
  }, [props.recallAPI]);

  useEffect(() => {
    let trs = document.getElementsByTagName("tr");
    setselected(null);
    for (var x of trs) {
      x.style.backgroundColor = "white";
      x.style.borderBottom = "0.5px solid #e2e9ef";
      // var css = "tbody tr:hover { background: red;}";
      // var s = document.createElement("style");

      // if (s.styleSheet) {
      //   s.styleSheet.cssText = css;
      // } else {
      //   s.appendChild(document.createTextNode(css));
      // }
      // x.appendChild(s);
      x.className = "";
    }
    let tds = document.getElementsByTagName("td");
    for (var y of tds) {
      y.style.fontWeight = "normal";
      y.style.color = "#6D6d6d";
    }
  }, [props.reset]);

  const rowclick = (id) => {
    let trs = document.getElementsByTagName("tr");
    for (var x of trs) {
      x.style.backgroundColor = "white";
      x.style.borderBottom = "0.5px solid #e2e9ef";
      // var css = "tbody tr:hover { background: red;}";
      // var s = document.createElement("style");

      // if (s.styleSheet) {
      //   s.styleSheet.cssText = css;
      // } else {
      //   s.appendChild(document.createTextNode(css));
      // }
      // x.appendChild(s);
      x.className = "";
    }
    let tds = document.getElementsByTagName("td");
    for (var y of tds) {
      y.style.fontWeight = "normal";
      y.style.color = "#6D6d6d";
    }
    setselected(id);
    document.getElementById(id).className = "selected";
    document.getElementById(id).style.backgroundColor = "#e1eeff";
    document.getElementById(id).style.borderBottom = "none";
    let list = document.getElementById(id).children;
    for (var i = 0; i < list.length; i++) {
      list[i].style.fontWeight = "700";
      // if (i === 0) {
      //   list[i].style.backgroundColor = "#085FAB";
      // }
    }
    setDataset(data[id]);
    props.selected(id);
    props.selectedDataset(data[id]);
  };

  const Hoverover = (index) => {
    // console.log(document.getElementById(index));
    if (document.getElementsByClassName("selected")[0]) {
      if (document.getElementsByClassName("selected")[0].id !== index) {
        document.getElementById(index).style.backgroundColor = "#e1eeff";
      }
    }
  };
  const Hovercancel = (index) => {
    // console.log(document.getElementById(index));
    if (document.getElementsByClassName("selected")[0]) {
      if (
        parseInt(document.getElementsByClassName("selected")[0].id) !== index
      ) {
        document.getElementById(index).style.backgroundColor = "white";
      } else {
        document.getElementById(index).style.backgroundColor = "#e1eeff";
      }
    }
  };

  // const clickcheckbox = (index, val) => {
  //   let temp = data;
  //   temp[index].checked = !temp[index].checked;
  //   setmainCheck(false);
  //   setdata(temp);
  //   setrendered(!rendered);
  // };

  // const checkall = (val) => {
  //   console.log(val);
  //   let temp = data;
  //   if (mainCheck === false) {
  //     temp.forEach((item, index) => {
  //       temp[index].checked = true;
  //     });
  //     setmainCheck(true);
  //   } else {
  //     temp.forEach((item, index) => {
  //       temp[index].checked = false;
  //     });
  //     setmainCheck(false);
  //   }
  //   setdata(temp);
  //   setrendered(!rendered);
  // };

  const getrows = () => {
    return data.map((item, index) => {
      return (
        <tr
          id={index}
          key={index}
          onClick={() => {
            if (selected !== index) {
              rowclick(index);
            }
            // props.selected(item.key);
          }}
          onMouseOver={() => Hoverover(index)}
          onMouseLeave={() => Hovercancel(index)}
        >
          <td
            style={selected === index ? { backgroundColor: "#085fab" } : null}
          ></td>
          {/* <td>
            <input
              type="checkbox"
              id="vehicle1"
              name="vehicle1"
              style={{
                marginTop: "5px",
                marginLeft: "0px",
                marginRight: "0px",
              }}
              checked={item.checked}
              onChange={(e) => clickcheckbox(index, e.target.value)}
            />
          </td> */}

          <td>
            <img src={bucketIcon} alt={"icon"} style={{ width: "15px" }} />
          </td>
          <td
            className={styles.description}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              paddingRight: "40px",
            }}
          >
            {item.name}
          </td>
          <td
            className={styles.description}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              paddingRight: "40px",
            }}
          >
            {item.description}
          </td>
          <td>{item.created_by}</td>
          <td className={styles.model_last_modified}>
            <p style={{ margin: "0px", padding: "0", fontSize: "13px" }}>
              {item.last_modified}
            </p>
          </td>
          <td>{item.size} GB</td>
          <td>
            <img
              src={infoIcon}
              alt="Text"
              width={14}
              style={{ cursor: "pointer" }}
              onClick={() => props.showdrawer()}
            />
          </td>
          <td>
            <img
              src={configureIcon}
              alt="Text"
              width={18}
              style={{ cursor: "pointer" }}
              onClick={() => props.showpopup()}
            />
          </td>
        </tr>
      );
    });
  };

  return (
    <div className={styles.Container}>
      <Cliploader loading={loading} />
      {data ? (
        <table className={styles.datatable}>
          <thead>
            <tr>
              <th> </th>
              {/* <th>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  style={{
                    marginTop: "5px",
                    marginLeft: "10px",
                    marginRight: "0px",
                  }}
                  checked={mainCheck}
                  onChange={(e) => checkall(e.target.value)}
                />{" "}
              </th> */}
              <th> </th>
              <th>Name</th>
              <th>Description</th>
              <th>Created by</th>
              <th>Last Modified</th>
              <th>Size</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{getrows()}</tbody>
        </table>
      ) : (
        <NoData text="No Data" />
        // <Empty style={{ marginTop: "20px" }} />
      )}
    </div>
  );
}
