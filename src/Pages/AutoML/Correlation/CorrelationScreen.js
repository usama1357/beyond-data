import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import Chart from "chart.js";
import { Button, message } from "antd";
import { PageContext } from "../../../Data/Contexts/AutoMLPageState/AutoMLPageStateContext";
import { useHistory, useParams } from "react-router-dom";
import { CustomTableContext } from "../../../Data/Contexts/AutoMLCustomTable/AutoMLCustomTableContext";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";
import { ProjectContext } from "../../../Data/Contexts/AutoMLProject/AutoMLProjectContext";
import { ModelContext } from "../../../Data/Contexts/AutoMLModelContext/AutoMLModelContext";
import axios from "axios";
import { URL } from "../../../Config/config";
import Cliploader from "../../../Components/Loader/Cliploader";
import AutoMLModelTrainingLoader from "../../../Components/Loader/AutoMLModelTrainingLoader/AutoMLModelTrainingLoader";

export default function CorrelationScreen() {
  const [meta, setmeta] = useState({
    totalentries: "1400",
    missingvals: "08",
    targetcols: "08",
    targetfeature: "05",
  });
  const [data, setdata] = useState({
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    points: [12, 19, 3, 5, 2, 3, 20, 3, 5, 6, 2, 1],
  });
  const [rendered, setrendered] = useState(false);
  const [loading, setloading] = useState(false);

  const [ChartRef, setChartRef] = useState(React.createRef());

  let history = useHistory();
  let { project_id, model_id } = useParams();
  const { setCurrentPage } = useContext(PageContext);
  const { CustomTable } = useContext(CustomTableContext);
  const { Auth } = useContext(AuthContext);
  const { Project } = useContext(ProjectContext);
  const { Model } = useContext(ModelContext);

  if (rendered === false) {
    let label = [];
    let points = [];
    CustomTable.customtable.filtered.forEach((element) => {
      label.push(element.name);
      points.push(element.correlation);
    });
    setdata({ labels: label, points: points });
    setrendered(true);
  }

  useEffect(() => {
    var ctx = ChartRef.current.getContext("2d");
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Correlation",
            data: data.points,
            backgroundColor: "#e1eeff",
            borderColor: "#085fab",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          xAxes: [
            {
              ticks: {
                maxRotation: 90,
                minRotation: 80,
              },
              gridLines: {
                offsetGridLines: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                // min: 5,
              },
            },
          ],
        },
      },
    });
  }, [rendered]);

  const confirm = async () => {
    let non_nullable = [];
    let features = [];
    CustomTable.customtable.filtered.forEach((element) => {
      if (element.disabled !== true) {
        features.push(element.name);
        if (element.nullable === "false") {
          non_nullable.push(element.name);
        }
      }
    });
    let FinalObject = {
      company_name: Auth.company_name,
      company_id: Auth.company_id,
      user_id: Auth.user_id,
      target_column: CustomTable.customtable.target,
      databucket_name: CustomTable.customtable.bucket.databucket_name,
      dataset_name: CustomTable.customtable.bucket.dataset_name,
      model_name: Model.model.name,
      project_name: Project.name,
      features: features,
      non_nullable_cols: non_nullable,
    };
    // console.log(FinalObject);
    // setloading(true);
    message.success("Model sent to training");
    // await axios
    //   .post(`${URL}/automl/train/`, FinalObject)
    //   .then(function (response) {
    //     console.log(response);
    //     setloading(false);
    //   })
    //   .catch(function (error) {
    //     setloading(false);
    //     console.log(error);
    //     message.error("Server Error");
    //     if (error.response) {
    //       // Request made and server responded
    //       console.log(error.response.data);
    //       console.log(error.response.status);
    //       message.error(error.response.data);
    //       console.log(error.response.headers);
    //     } else if (error.request) {
    //       // The request was made but no response was received
    //       console.log(error.request);
    //     } else {
    //       // Something happened in setting up the request that triggered an Error
    //     }
    //   });
    // setCurrentPage("modeltype");
    // history.push({
    //   pathname: `/automl/projects/${project_id}/models/${model_id}/model_type/`,
    //   state: {
    //     detail: "I am from New link page",
    //     page_name: "automl_customised_datasets",
    //   },
    // });
  };

  return (
    <div className="correlation">
      <AutoMLModelTrainingLoader
        isModalVisible={loading}
        handleCancel={() => setloading(false)}
      />
      <canvas
        id="myChart"
        ref={ChartRef}
        // width={600}
        style={{
          display: "block",
          margin: "auto",
          width: "100%",
          height: "250px",
        }}
      ></canvas>
      <div style={{ marginTop: "50px" }}>
        <div className="box">
          <h2>{meta.totalentries}</h2> <h4>Total Entries</h4>
        </div>
        <div className="box">
          <h2>{meta.missingvals}</h2> <h4>Missing Values</h4>
        </div>
        <div className="box">
          <h2>{meta.targetcols}</h2> <h4>Target Column</h4>
        </div>
        <div className="box">
          <h2>{meta.targetfeature}</h2> <h4>Target Feature</h4>
        </div>
      </div>
      <Button className="button" onClick={() => confirm()}>
        Continue
      </Button>
      {/* <Cliploader loading={loading} /> */}
    </div>
  );
}
