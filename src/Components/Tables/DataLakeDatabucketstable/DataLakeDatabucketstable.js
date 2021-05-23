import React, { useEffect, useState } from "react";
import NoData from "../../NoData/NoData";
import styles from "./DataLakeDatabucketstable.module.scss";
import bucketIcon from "../../Icons/DataLake/bucketIcon.svg";

export default function DataLakeDatabucketstable(props) {
  const [data, setdata] = useState([
    {
      name: "XYZ",
      created_by: "Usama",
      last_modified: "12-04-2020 | 17:24",
      size: "200",
    },
    {
      name: "abcdeabcdeabcdeabcdeabcdeabcde ",
      created_by: "Usama",
      last_modified: "2-4-5",
      size: "200",
    },
    { name: "XYZ", created_by: "Usama", last_modified: "2-4-5", size: "200" },
    { name: "XYZ", created_by: "Usama", last_modified: "2-4-5", size: "200" },
    { name: "XYZ", created_by: "Usama", last_modified: "2-4-5", size: "200" },
    { name: "XYZ", created_by: "Usama", last_modified: "2-4-5", size: "200" },
    { name: "XYZ", created_by: "Usama", last_modified: "2-4-5", size: "200" },
    { name: "XYZ", created_by: "Usama", last_modified: "2-4-5", size: "200" },
    { name: "XYZ", created_by: "Usama", last_modified: "2-4-5", size: "200" },
    { name: "XYZ", created_by: "Usama", last_modified: "2-4-5", size: "200" },
    { name: "XYZ", created_by: "Usama", last_modified: "2-4-5", size: "200" },
    { name: "XYZ", created_by: "Usama", last_modified: "2-4-5", size: "200" },
    { name: "XYZ", created_by: "Usama", last_modified: "2-4-5", size: "200" },
    { name: "XYZ", created_by: "Usama", last_modified: "2-4-5", size: "200" },
    { name: "XYZ", created_by: "Usama", last_modified: "2-4-5", size: "200" },
    { name: "XYZ", created_by: "Usama", last_modified: "2-4-5", size: "200" },
    { name: "XYZ", created_by: "Usama", last_modified: "2-4-5", size: "200" },
    { name: "XYZ", created_by: "Usama", last_modified: "2-4-5", size: "200" },
  ]);
  const [selected, setselected] = useState(null);

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

    props.selected(id);
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
    <div className={styles.Container}>
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
