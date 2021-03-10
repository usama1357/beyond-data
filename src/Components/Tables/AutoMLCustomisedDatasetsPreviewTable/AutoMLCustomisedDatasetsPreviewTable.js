import React from "react";
import "./styles.css";
import targetBlue from "../../Icons/AutoML/targetblue.svg";

export default function AutoMLCustomisedDatasetsPreviewTable(props) {
  const getrows = () => {
    return props.rows.map((item, index) => {
      return (
        <tr key={index}>
          {item.map((element, i) => {
            return (
              <td key={index + "_" + i}>
                <img
                  src={targetBlue}
                  alt="target"
                  style={
                    props.target === element
                      ? { marginRight: "5px" }
                      : { display: "none" }
                  }
                />
                {element}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <div className="AutoMLCustomisedDatasetsPreviewTable">
      <table>
        <thead></thead>
        <tbody>{getrows()}</tbody>
      </table>
    </div>
  );
}
