import React, { useContext, useEffect, useState } from "react";
import NoData from "../../NoData/NoData";
import styles from "./DataLakeDatabucketstable.module.scss";
import bucketIcon from "../../Icons/DataLake/bucketIcon.svg";
import { DataLakeBucketContext } from "../../../Data/Contexts/DataLake/DataLakeBucketContext/DataLakeBucketContext";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";
import { serialize } from "object-to-formdata";
import axios from "axios";
import { URL } from "../../../Config/config";
import Cliploader from "../../Loader/Cliploader";

export default function DataLakeDatabucketstable(props) {
  const [data, setdata] = useState(null);
  const [selected, setselected] = useState(null);
  const [data1, setdata1] = useState(null);
  const [loading, setloading] = useState(false);

  const [tempData, settempData] = useState(null);

  const { Bucket, setBucket } = useContext(DataLakeBucketContext);
  const { Auth } = useContext(AuthContext);

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

  const loadBuckets = async () => {
    let s = "";
    if (props.tab === "My Data") {
      s = "p";
    } else if (props.tab === "Downloaded Data") {
      s = "d";
    } else if (props.tab === "Global Data") {
      s = "s";
    }
    setloading(true);
    setdata1([{}]);
    let temp = [];
    await axios({
      method: "get",
      url: `${URL}/automl/load_databuckets/?company_name=${Auth.company_name}&company_id=${Auth.company_id}&user_id=${Auth.user_id}&space=${s}&total_user_space=5`,
    })
      .then(function (response) {
        setloading(false);
        if (response.data.buckets_info) {
          response.data.buckets_info.forEach((element) => {
            let obj = {
              name: element.databucket_name,
              desc: element.databucket_desc,
              last_modified: element.last_modified,
              created_by: element.user_name ? element.user_name : Auth.user_id,
              size: element.size + " GB",
            };
            temp.push(obj);
          });
          setdata(temp);
          settempData(temp);
        }
        console.log(response);
        props.SpaceInfo(response.data.space_info);
      })
      .catch(function (error) {
        setloading(false);
        setdata(null);
        settempData(null);
        console.log(error);
      });
  };

  useEffect(() => {
    loadBuckets();
  }, [props.tab]);

  useEffect(() => {
    loadBuckets();
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
    console.log(data[id]);
    setBucket({ bucket: data[id], type: props.tab });
    props.selected(id, data[id]);
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

  const getrows = () => {
    return data.map((item, index) => {
      return (
        <tr
          id={index}
          key={index}
          onClick={() => {
            rowclick(index);
            // props.selected(item.key);
          }}
          onMouseOver={() => Hoverover(index)}
          onMouseLeave={() => Hovercancel(index)}
        >
          <td
            style={selected === index ? { backgroundColor: "#085fab" } : null}
          ></td>
          <td>
            <img src={bucketIcon} alt={"icon"} style={{ width: "15px" }} />
          </td>
          <td
            className={styles.description}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              paddingRight: "70px",
            }}
          >
            {" "}
            {item.name}{" "}
          </td>
          <td>{item.created_by}</td>
          <td className={styles.model_last_modified}>
            <p style={{ margin: "0px", padding: "0", fontSize: "13px" }}>
              {item.last_modified}
            </p>
          </td>
          <td>{item.size}</td>
        </tr>
      );
    });
  };

  return (
    <div className={styles.DataLakeDatabucketstable}>
      <Cliploader loading={loading} handleCancel={() => setloading(false)} />
      {data ? (
        <table className={styles.datatable}>
          <thead>
            <tr>
              <th></th>
              <th> </th>
              <th>Name</th>
              <th>Created by</th>
              <th>Last Modified</th>
              <th>Size</th>
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
