import { Select } from "antd";
import React from "react";
import "./styles.css";

export default function DataLakeConfigureMetaTable(props) {
  const { Option } = Select;
  console.log(props);
  const handleChange = (value, index) => {
    props.changeType(value, index);
  };

  const getrows = () => {
    return props.data.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.name} </td>
          <td>
            <Select
              style={{
                width: "100%",
                display: "inline-block",
                marginRight: "15px",
              }}
              disabled={item.options.length === 0 ? true : false}
              className="select"
              onChange={(value) => handleChange(value, index)}
              placeholder="Data Type"
              value={item.data_type}
            >
              {item.options.map((element, index) => (
                <Option key={index} value={element}>
                  {element}
                </Option>
              ))}
              {/* <Option value="abc">Abc</Option>
              <Option value="new">New Bucket</Option>
              <Option value="Ohio">OHIO Bucket</Option> */}
            </Select>
          </td>
          <td
            style={
              item.missing_values === "0" ||
              item.missing_values === 0 ||
              item.missing_values === "0.0" ||
              item.missing_values === 0.0
                ? { color: "#5BCEAE" }
                : { color: "#EC547A" }
            }
          >
            {item.missing_values}
          </td>
          <td
            style={
              item.invalid_values === "0" ||
              item.invalid_values === 0 ||
              item.invalid_values === "0%" ||
              item.invalid_values === "0.0" ||
              item.invalid_values === 0.0
                ? { color: "#5BCEAE" }
                : { color: "#EC547A" }
            }
          >
            {item.invalid_values}
          </td>
          <td>{item.distinct_values}</td>
        </tr>
      );
    });
  };

  return (
    <div className="DataLakeConfigureMetaTable">
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>
              Column{" "}
              {/* <Tooltip title="prompt text">
                {" "}
                <span>i</span>{" "}
              </Tooltip> */}
            </td>
            <td>Data Type</td>
            <td>Missing Values (%)</td>
            <td>Invalid Values (%)</td>
            <td>Distinct Values (%)</td>
          </tr>
          {getrows()}
        </tbody>
      </table>
    </div>
  );
}
