import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import "./styles.css";

export default function DataLakeSpaceGraph(props) {
  const [ChartRef, setChartRef] = useState(React.createRef());
  const [rendered, setrendered] = useState(false);

  let data = {
    datasets: [
      {
        label: "My First Dataset",
        // data: props.data
        //   ? [parseInt(props.data.free_space), parseInt(props.data.used_space)]
        //   : [5, 1],
        data: [5, 1],
        backgroundColor: ["#e1eeff", "#085fab"],
        borderRadius: 30,
        borderWidth: 10,
        borderColor: "#f5faff",
        hoverOffset: 0,
      },
    ],
  };

  useEffect(() => {
    var ctx = ChartRef.current.getContext("2d");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        responsive: false,
        cutoutPercentage: "70",
      },
    });
  }, [rendered]);

  return (
    <div>
      {/* <div class="circle">
        <div className="text">
          12GB <span class="subtext">Free Space</span>{" "}
        </div>
      </div> */}
      <canvas
        id="myChart"
        ref={ChartRef}
        // width={"60%"}
        style={{
          display: "block",
          margin: "auto",
          width: "60%",
          height: "100%",
        }}
      ></canvas>
    </div>
  );
}
