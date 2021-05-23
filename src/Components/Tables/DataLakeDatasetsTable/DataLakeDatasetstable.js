import React, { useEffect, useState } from "react";
import NoData from "../../NoData/NoData";
import styles from "./DataLakeDatasetsTable.module.scss";
import bucketIcon from "../../Icons/DataLake/datasetIcon.svg";
import infoIcon from "../../Icons/DataLake/infoIcon.svg";
import configureIcon from "../../Icons/DataLake/configureIcon.svg";

export default function DataLakeDatasetsTable(props) {
  const [data, setdata] = useState([
    {
      name: "XYZ",
      created_by: "Usama",
      description:
        "This is a description This is a description This is a description This is a description This is a description",
      last_modified: "12-04-2020 | 17:24",
      size: "200",
      checked: false,
    },
    {
      name: "abcdeabcdeabcdeabcdeabcdeabcde ",
      created_by: "Usama",
      description: "This is a description",
      last_modified: "2-4-5",
      size: "200",
      checked: false,
    },
    {
      name: "XYZ",
      created_by: "Usama",
      last_modified: "2-4-5",
      description: "This is a description",
      size: "200",
      checked: false,
    },
    {
      name: "XYZ",
      created_by: "Usama",
      description: "This is a description",
      last_modified: "2-4-5",
      size: "200",
      checked: false,
    },
    {
      name: "XYZ",
      created_by: "Usama",
      description: "This is a description",
      last_modified: "2-4-5",
      size: "200",
      checked: false,
    },
    {
      name: "XYZ",
      created_by: "Usama",
      description: "This is a description",
      last_modified: "2-4-5",
      size: "200",
      checked: false,
    },
    {
      name: "XYZ",
      created_by: "Usama",
      description: "This is a description",
      last_modified: "2-4-5",
      size: "200",
      checked: false,
    },
    {
      name: "XYZ",
      created_by: "Usama",
      description: "This is a description",
      last_modified: "2-4-5",
      size: "200",
      checked: false,
    },
    {
      name: "XYZ",
      created_by: "Usama",
      description: "This is a description",
      last_modified: "2-4-5",
      size: "200",
      checked: false,
    },
    {
      name: "XYZ",
      created_by: "Usama",
      description: "This is a description",
      last_modified: "2-4-5",
      size: "200",
      checked: false,
    },
    {
      name: "XYZ",
      created_by: "Usama",
      description: "This is a description",
      last_modified: "2-4-5",
      size: "200",
      checked: false,
    },
    {
      name: "XYZ",
      created_by: "Usama",
      description: "This is a description",
      last_modified: "2-4-5",
      size: "200",
      checked: false,
    },
    {
      name: "XYZ",
      created_by: "Usama",
      description: "This is a description",
      last_modified: "2-4-5",
      size: "200",
      checked: false,
    },
    {
      name: "XYZ",
      created_by: "Usama",
      description: "This is a description",
      last_modified: "2-4-5",
      size: "200",
      checked: false,
    },
    {
      name: "XYZ",
      created_by: "Usama",
      description: "This is a description",
      last_modified: "2-4-5",
      size: "200",
      checked: false,
    },
    {
      name: "XYZ",
      created_by: "Usama",
      description: "This is a description",
      last_modified: "2-4-5",
      size: "200",
      checked: false,
    },
    {
      name: "XYZ",
      created_by: "Usama",
      description: "This is a description",
      last_modified: "2-4-5",
      size: "200",
      checked: false,
    },
    {
      name: "XYZ",
      created_by: "Usama",
      description: "This is a description",
      last_modified: "2-4-5",
      size: "200",
      checked: false,
    },
  ]);
  const [selected, setselected] = useState(null);
  const [rendered, setrendered] = useState(false);
  const [mainCheck, setmainCheck] = useState(false);

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

  const clickcheckbox = (index, val) => {
    let temp = data;
    temp[index].checked = !temp[index].checked;
    setmainCheck(false);
    setdata(temp);
    setrendered(!rendered);
  };

  const checkall = (val) => {
    console.log(val);
    let temp = data;
    if (mainCheck === false) {
      temp.forEach((item, index) => {
        temp[index].checked = true;
      });
      setmainCheck(true);
    } else {
      temp.forEach((item, index) => {
        temp[index].checked = false;
      });
      setmainCheck(false);
    }
    setdata(temp);
    setrendered(!rendered);
  };

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
          <td>
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
          </td>

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
            {item.name}
          </td>
          <td
            className={styles.description}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              paddingRight: "70px",
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
          <td>{item.size}</td>
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
      {data ? (
        <table className={styles.datatable}>
          <thead>
            <tr>
              <th> </th>
              <th>
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
              </th>
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
