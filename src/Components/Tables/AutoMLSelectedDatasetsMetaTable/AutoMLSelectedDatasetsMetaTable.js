import React from "react";
import "./styles.css";

export default function AutoMLSelectedDatasetsMetaTable(props) {
  const getrows = () => {
    return props.rows.map((item, index) => {
      return (
        <tr key={index}>
          <td>
            {index === 0
              ? " "
              : index === 1
              ? "Data Type"
              : index === 2
              ? "Column Scope"
              : index === 3
              ? "Formula"
              : null}
          </td>
          {item.map((element, i) => {
            return <td key={index + "_" + i}>{element}</td>;
          })}
        </tr>
      );
    });
  };

  return (
    <div className="AutoMLSelectedDatasetsMetaTable">
      <table>
        <thead></thead>
        <tbody>{getrows()}</tbody>
      </table>
    </div>
  );
}
