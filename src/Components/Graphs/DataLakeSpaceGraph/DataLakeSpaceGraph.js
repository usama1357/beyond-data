// import React, { useEffect, useState } from "react";
// import Chart from "chart.js";
// import "./styles.css";

// export default function DataLakeSpaceGraph(props) {
//   const [ChartRef, setChartRef] = useState(React.createRef());
//   const [rendered, setrendered] = useState(false);

//   let data = {
//     datasets: [
//       {
//         label: "My First Dataset",
//         // data: props.data
//         //   ? [parseInt(props.data.free_space), parseInt(props.data.used_space)]
//         //   : [5, 1],
//         data: [5, 1],
//         backgroundColor: ["#e1eeff", "#085fab"],
//         borderRadius: 30,
//         borderWidth: 10,
//         borderColor: "#f5faff",
//         hoverOffset: 0,
//       },
//     ],
//   };

//   useEffect(() => {
//     var ctx = ChartRef.current.getContext("2d");
//     var myChart = new Chart(ctx, {
//       type: "doughnut",
//       data: data,
//       options: {
//         responsive: false,
//         cutoutPercentage: "70",
//       },
//     });
//   }, [rendered]);

//   return (
//     <div>
//       {/* <div class="circle">
//         <div className="text">
//           12GB <span class="subtext">Free Space</span>{" "}
//         </div>
//       </div> */}
//       <canvas
//         id="myChart"
//         ref={ChartRef}
//         // width={"60%"}
//         style={{
//           display: "block",
//           margin: "auto",
//           width: "60%",
//           height: "100%",
//         }}
//       ></canvas>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// export default function DataLakeSpaceGraph() {
//   const [data, setdata] = useState({
//     series: [4, 46],
//     options: {
//       labels: ["Used Space", "Free Space"],
//       dataLabels: {
//         enabled: false,
//         // formatter: function (val) {
//         //   return val;
//         // },
//       },
//       highlightOnHover: false,
//       legend: {
//         show: false,
//       },
//       colors: ["#085fab", "#e1eeff"],
//       plotOptions: {
//         pie: {
//           customScale: 0.7,
//         },
//       },
//       chart: {
//         type: "polarArea",
//       },
//       responsive: [
//         {
//           breakpoint: 480,
//           options: {
//             chart: {
//               width: 200,
//             },
//             legend: {
//               position: "bottom",
//             },
//           },
//         },
//       ],
//       tooltip: {
//         fillSeriesColor: false,
//       },
//     },
//     // series: [5, 25],
//     // options: {
//     //   chart: {
//     //     // width: 380,
//     //     type: "polarArea",
//     //   },
//     //   labels: ["Rose A", "Rose B"],
//     //   fill: {
//     //     opacity: 1,
//     //   },
//     //   stroke: {
//     //     width: 0,
//     //     colors: undefined,
//     //   },
//     //   yaxis: {
//     //     show: false,
//     //   },
//     //   legend: {
//     //     show: false,
//     //     position: "bottom",
//     //   },
//     //   plotOptions: {
//     //     polarArea: {
//     //       rings: {
//     //         strokeWidth: 0,
//     //       },
//     //       spokes: {
//     //         strokeWidth: 0,
//     //       },
//     //     },
//     //   },
//     //   theme: {
//     //     monochrome: {
//     //       enabled: true,
//     //       shadeTo: "light",
//     //       shadeIntensity: 0.8,
//     //     },
//     //   },
//     // },
//   });

//   return (
//     <div id="chart">
//       <ReactApexChart
//         options={data.options}
//         series={data.series}
//         type="donut"
//       />
//     </div>
//   );
// }

import "./styles.css";
import React, { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

let data = [
  { name: "Group A", value: 400, color: "#085fab" },
  { name: "Group B", value: 300, color: "#90c1ec" },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy - 10}
        dy={8}
        textAnchor="middle"
        fill={"black"}
        style={{ fontSize: "20px", fontWeight: "bold" }}
      >
        {parseFloat(payload.value).toFixed(2)}
      </text>

      <text
        x={cx}
        y={cy + 10}
        dy={8}
        textAnchor="middle"
        fill={"#6d6d6d"}
        style={{ color: "#6d6d6d" }}
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.color}
      />
      {/* <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={payload.color}
      /> */}
      {/* <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={"#085fab"}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={payload.color} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`( ${(percent * 100).toFixed(2)}%)`}
      </text> */}
    </g>
  );
};

export default function DataLakeSpaceGraph(props) {
  console.log(props);
  const [activeIndex, setActiveIndex] = useState(0);
  const [col, setcol] = useState("#90c1ec");

  useEffect(() => {
    data = [
      { name: "Free Space", value: props.data.free_space, color: "#085fab" },
      { name: "Used Space", value: props.data.used_space, color: "#e1eeff" },
    ];
  }, [props.data]);

  const onPieEnter = useCallback(
    (_, index) => {
      console.log(index);
      if (index === 0) {
        setcol("#90c1ec");
      }
      if (index === 1) {
        setcol("#085fab");
      }
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <ResponsiveContainer height="70%">
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={"55vh"}
          cy={"55vh"}
          innerRadius={"58%"}
          outerRadius={"70%"}
          fill={col}
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
