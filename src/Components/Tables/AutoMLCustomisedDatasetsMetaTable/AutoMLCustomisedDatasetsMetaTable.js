import React from "react";
import { Switch, Tooltip } from "antd";
import "./styles.css";

export default function AutoMLCustomisedDatasetsMetaTable(props) {
  const getrows = () => {
    return props.data.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.name} </td>
          <td>{item.data_type}</td>
          <td>
            <Switch defaultChecked={item.nullable === "true" ? true : false} />
          </td>
          <td
            style={
              item.missing_values === "0%"
                ? { color: "#5BCEAE" }
                : { color: "#EC547A" }
            }
          >
            {item.missing_values}
          </td>
          <td
            style={
              item.invalid_values === "0%"
                ? { color: "#5BCEAE" }
                : { color: "#EC547A" }
            }
          >
            {item.invalid_values}
          </td>
          <td>{item.distinct_values}</td>
          <td>{item.correlation}</td>
        </tr>
      );
    });
  };

  return (
    <div className="AutoMLCustomisedDatasetsMetaTable">
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>
              Column{" "}
              <Tooltip title="prompt text">
                {" "}
                <span>i</span>{" "}
              </Tooltip>
            </td>
            <td>Data Type</td>
            <td>Nullable</td>
            <td>Missing Values (%)</td>
            <td>Invalid Values (%)</td>
            <td>Distinct Values (%)</td>
            <td>Correlation with Target</td>
          </tr>
          {getrows()}
        </tbody>
      </table>
    </div>
  );
}
