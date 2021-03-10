import React from "react";
import "./styles.css";

export default function AutoMLSelectedDatasetsPreviewRowsTable(props) {
  const getrows = () => {
    return props.rows.map((item, index) => {
      return (
        <tr key={index}>
          {item.map((element, i) => {
            return <td key={index + "_" + i}>{element}</td>;
          })}
        </tr>
      );
    });
  };

  return (
    <div className="AutoMLSelectedDatasetsPreviewRowsTable">
      <table>
        <thead></thead>
        <tbody>{getrows()}</tbody>
      </table>
    </div>
  );
}
