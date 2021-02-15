import { Button } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router";
import AutoMLNewModelButton from "../../../Components/Button/AutoMLNewModelButton/AutoMLNewModelButton";
import AutoMLExistingModelsTable from "../../../Components/Tables/AutoMLExistingModels/AutoMLExistingModelsTable";

export default function ExistingModels(props) {
  const { project_id } = useParams();
  const [selected_model, setselected_model] = useState(null);

  const createModel = () => {
    props.history.push({
      pathname: `/automl/projects/${project_id}/models/newmodel`,
      state: { detail: "I am from Models page" },
    });
  };

  return (
    <div
      style={{
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: "12px",
          lineHeight: "13px",
          color: "#085FAB",
        }}
      >
        {project_id}
      </div>
      <h3 style={{ fontWeight: "700", marginTop: "2px", fontSize: "18px" }}>
        New Model
      </h3>
      <hr
        style={{
          backgroundColor: "#E1EEFF",
          marginTop: "0px",
          marginBottom: "20px",
          border: "none",
          height: "1px",
        }}
      />
      <AutoMLNewModelButton createModel={() => createModel()} />
      <h3
        style={{
          display: "inline-block",
          fontWeight: "600",
          fontSize: "18px",
          marginTop: "20px",
          width: "20%",
        }}
      >
        Models
      </h3>

      <hr
        style={{
          backgroundColor: "#E1EEFF",
          marginTop: "2px",
          border: "none",
          height: "1px",
          marginBottom: "0px",
        }}
      />
      <div
        style={{
          flex: "1",
          overflow: "scroll",
        }}
      >
        <AutoMLExistingModelsTable selected={(id) => setselected_model(id)} />
      </div>
      <hr
        style={{
          backgroundColor: "#E1EEFF",
          border: "none",
          height: "1px",
          marginTop: "0px",
        }}
      />
      <div>
        <Button
          style={{
            borderRadius: "64px",
            marginRight: "10px",
            width: "161px",
            height: "40px",
            color: selected_model === null ? "grey" : "#085FAB",
            borderColor: selected_model === null ? "grey" : "#085FAB",
            fontWeight: "bold",
            fontSize: "16px",
          }}
          disabled={selected_model === null ? true : false}
          onClick={() => {
            console.log(selected_model);
          }}
        >
          Predict
        </Button>
        <Button
          style={{
            borderRadius: "64px",
            marginRight: "10px",
            width: "161px",
            height: "40px",
            color: selected_model === null ? "grey" : "#085FAB",
            borderColor: selected_model === null ? "grey" : "#085FAB",
            fontWeight: "bold",
            fontSize: "16px",
          }}
          disabled={selected_model === null ? true : false}
        >
          Retrain Model
        </Button>
        <Button
          style={{
            borderRadius: "64px",
            marginRight: "10px",
            width: "161px",
            height: "40px",
            color: selected_model === null ? "grey" : "#085FAB",
            borderColor: selected_model === null ? "grey" : "#085FAB",
            fontWeight: "bold",
            fontSize: "16px",
          }}
          disabled={selected_model === null ? true : false}
        >
          Modify Model
        </Button>
      </div>
    </div>
  );
}
