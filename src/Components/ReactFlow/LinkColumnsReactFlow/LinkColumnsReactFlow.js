import { Button } from "antd";
import React, { useState } from "react";
import ReactFlow, {
  Controls,
  updateEdge,
  addEdge,
  isNode,
  getConnectedEdges,
  isEdge,
  removeElements,
  Background,
} from "react-flow-renderer";
import "./styles.css";
import upArrow from "../../Icons/AutoML/DatasetProcessing/uparrow.svg";
import downArrow from "../../Icons/AutoML/DatasetProcessing/downarrow.svg";

export default function LinkColumnsReactFlow(props) {
  let initialElements = [];
  const [CustomTable, setCustomTable] = useState(null);
  const [showresultanttable, setshowresultanttable] = useState(true);

  let data = [
    {
      name: "Customer",
      cols: [
        { name: "Customer Name", type: "int" },
        { name: "Customer Id", type: "str" },
        { name: "Address", type: "str" },
        { name: "Phone", type: "int" },
        { name: "Date", type: "str" },
      ],
    },
    {
      name: "Product",
      cols: [
        { name: "Product Name", type: "str" },
        { name: "Product Id", type: "int" },
        { name: "Date", type: "str" },
      ],
    },
    {
      name: "Branch",
      cols: [
        { name: "Branch Name", type: "str" },
        { name: "Branch Id", type: "int" },
        { name: "Date", type: "int" },
      ],
    },
  ];
  const rendernew = () => {
    let temp = [];
    let initialheight = 0;
    data.map((item, i) => {
      let initialwidth = 0;
      temp.push({
        id: item.name,
        data: {
          label: (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "8px",
                }}
              >
                <img
                  src={upArrow}
                  alt="uparrow"
                  onClick={() => onMoveUp(i)}
                  width={12}
                  style={{
                    marginBottom: "5px",
                    cursor: "pointer",
                  }}
                />
                <img
                  src={downArrow}
                  alt="uparrow"
                  width={12}
                  onClick={() => onMoveDown(i)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <span>{item.name}</span>
            </div>
          ),
        },
        type: "default",
        connectable: false,
        selectable: false,
        position: { x: initialwidth, y: initialheight },
        style: {
          background: "white",
          border: "none",
          fontSize: "12px",
          cursor: "default",
          fontWeight: "bold",
          color: "black",
          paddingTop: "2px",
          paddingBottom: "2px",
        },
      });
      initialwidth = initialwidth + 100;
      item.cols.map((element, index) => {
        let obj = {
          id: item.name + "_" + index + "%" + i,
          data: { label: element.name },
          type: i === 0 ? "input" : i === 1 ? "output" : "default",
          connectable: i > 1 ? false : true,
          position: { x: initialwidth, y: initialheight },
          style: {
            background: "#F5FAFF",
            border: "none",
            borderRadius:
              index === 0
                ? "10px 0 0 10px"
                : index === item.cols.length - 1
                ? "0px 10px 10px 0px"
                : null,
            fontSize: "12px",
            color: "#6D6D6D",
            paddingTop: "2px",
            paddingBottom: "2px",
          },
        };
        temp.push(obj);
        initialwidth = initialwidth + 150;
      });
      initialheight = initialheight + 100;
    });
    setElements({ data: temp, changed: !elements.changed });
  };

  const [processed, setprocessed] = useState(null);

  if (processed === null) {
    let temp = [];
    let initialheight = 0;
    data.map((item, i) => {
      let initialwidth = 0;
      temp.push({
        id: item.name,
        data: {
          label: (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "8px",
                }}
              >
                <img
                  src={upArrow}
                  className="arrowIcon"
                  alt="uparrow"
                  onClick={() => onMoveUp(i)}
                  width={12}
                  style={{
                    marginBottom: "2px",
                    cursor: "pointer",
                  }}
                />
                <img
                  src={downArrow}
                  className="arrowIcon"
                  onClick={() => onMoveDown(i)}
                  alt="downarrow"
                  width={12}
                  style={{ cursor: "pointer", marginTop: "2px" }}
                />
              </div>
              <span>{item.name}</span>
            </div>
          ),
        },
        type: "default",
        connectable: false,
        selectable: false,
        position: { x: initialwidth, y: initialheight },
        style: {
          background: "white",
          border: "none",
          fontSize: "12px",
          cursor: "default",
          fontWeight: "bold",
          color: "black",
          paddingTop: "2px",
          paddingBottom: "2px",
        },
      });
      initialwidth = initialwidth + 100;
      item.cols.map((element, index) => {
        let obj = {
          id: item.name + "_" + index + "%" + i,
          data: { label: element.name },
          type: i === 0 ? "input" : i === 1 ? "output" : "default",
          connectable: i > 1 ? false : true,
          position: { x: initialwidth, y: initialheight },
          style: {
            background: "#F5FAFF",
            border: "none",
            borderRadius:
              index === 0
                ? "10px 0 0 10px"
                : index === item.cols.length - 1
                ? "0px 10px 10px 0px"
                : null,
            fontSize: "12px",
            color: "#6D6D6D",
            paddingTop: "2px",
            paddingBottom: "2px",
          },
        };
        temp.push(obj);
        initialwidth = initialwidth + 150;
      });
      initialheight = initialheight + 100;
    });
    initialElements = temp;
  }

  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.project({ x: 40, y: 10 });
    reactFlowInstance.fitView({ padding: 0.05, includeHiddenNodes: false });
  };

  // gets called after end of edge gets dragged to another source or target
  const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));

  const onConnect = (params) => {
    console.log(params);
    let temp = elements.data;
    let found = false;
    temp.forEach((element) => {
      if (isEdge(element) && params.target === element.target) {
        found = true;
      }
    });
    if (found === false) {
      let source_row = params.source.split("%")[1];
      let source_col = params.source.split("_")[1][0];
      let target_row = params.target.split("%")[1];
      let target_col = params.target.split("_")[1][0];
      if (
        data[source_row].cols[source_col].type ===
        data[target_row].cols[target_col].type
      ) {
        let edge = params;
        edge["animated"] = false;
        edge["label"] = "";
        edge["style"] = { stroke: "#085fab", strokeWidth: "3px" };
        edge["arrowHeadType"] = "arrow";
        // edge["type"] = "step";
        let temp = addEdge(edge, elements.data);
        setshowresultanttable(false);
        setElements({ data: temp, changed: !elements.changed });
      }
    }
  };

  const onConnectStart = (event, { nodeId, handleType }) => {
    let source_row = nodeId.split("%")[1];
    let source_col = nodeId.split("_")[1][0];
    let temp = elements.data;
    temp.forEach((item) => {
      if (item.id.split("%")[1] === "1") {
        if (
          data[source_row].cols[source_col].type ===
          data[1].cols[item.id.split("_")[1][0]].type
        ) {
          item.style.background = "#e1eeff";
        }
      }
    });

    setElements({ data: temp, changed: !elements.changed });
  };
  const onConnectEnd = (event) => {
    let temp = elements.data;
    temp.forEach((item) => {
      if (item.id.split("%")[1] === "1") {
        item.style.background = "#F5FAFF";
      }
    });
    setElements({ data: temp, changed: !elements.changed });
  };

  const onElementClick = (event, element) => {
    if (isEdge(element)) {
      console.log(element);
      let temp = elements.data;
      temp = temp.filter((item, index) => {
        return item.source !== element.source && item.target !== element.target;
      });
      setElements({ data: temp, changed: !elements.changed });
      temp.forEach((i) => {
        if (isEdge(i)) {
          console.log("true");
          setshowresultanttable(false);
        } else {
          setshowresultanttable(true);
        }
      });
    }
  };

  function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  }

  const onMoveUp = (row_id) => {
    let temp = data;
    if (row_id !== 0) {
      array_move(temp, row_id, row_id - 1);
      data = temp;
      setshowresultanttable(true);
      rendernew();
    }
  };

  const onMoveDown = (row_id) => {
    let temp = data;
    if (row_id !== data.length - 1) {
      array_move(temp, row_id, row_id + 1);
      data = temp;
      setshowresultanttable(true);
      rendernew();
    }
  };

  const getElements = () => {
    let temp = elements.data;
    let arr = [];
    temp.forEach((item) => {
      if (item.id.split("%")[1] === "0" || item.id.split("%")[1] === "1") {
        arr.push(item);
      }
      if (isEdge(item)) {
        arr.push(item);
      }
    });
    console.log(arr);
  };

  const mergeElements = () => {
    let temp = elements.data;
    let arr = [];
    temp.forEach((item) => {
      if (item.id.split("%")[1] === "0" || item.id.split("%")[1] === "1") {
        arr.push(item);
      }
      if (isEdge(item)) {
        arr.push(item);
      }
      if (!item.id.includes("%")) {
        arr.push(item);
      }
    });

    let links = { source: [], target: [], sourcetable: "", targettable: "" };
    arr.forEach((element) => {
      if (isEdge(element)) {
        links.source.push(parseInt(element.source.split("_")[1].split("%")[0]));
        links.sourcetable = element.source.split("_")[0];
        links.target.push(parseInt(element.target.split("_")[1].split("%")[0]));
        links.targettable = element.target.split("_")[0];
      }
    });
    // console.log(arr);
    console.log(links);
    let sourcearr = [];
    let targetarr = [];
    arr.forEach((element) => {
      if (isNode(element)) {
        if (element.id.includes("%")) {
          if (
            element.id.includes(links.sourcetable) &&
            links.sourcetable !== ""
          ) {
            sourcearr.push(element.data.label);
          }
          if (
            element.id.includes(links.targettable) &&
            links.sourcetable !== ""
          ) {
            targetarr.push(element.data.label);
          }
        }
      }
    });
    //Same Name Detection and not linked
    sourcearr.forEach((element, index) => {
      if (targetarr.includes(element)) {
        if (!links.source.includes(index)) {
          sourcearr[sourcearr.indexOf(element)] =
            sourcearr[sourcearr.indexOf(element)] + "_1";
          targetarr[targetarr.indexOf(element)] =
            targetarr[targetarr.indexOf(element)] + "_2";
        }
      }
    });
    console.log(sourcearr);
    console.log(targetarr);

    //Make Custom table
    let custom = sourcearr;
    targetarr.forEach((element, index) => {
      if (!sourcearr.includes(element)) {
        custom.push(element);
      }
    });
    console.log(custom);
    setshowresultanttable(true);
  };

  const [elements, setElements] = useState({
    data: initialElements,
    changed: false,
  });

  return (
    <>
      <div
        className="ReactFlowContainer"
        style={{
          width: "100%",
          height: "inherit",
          padding: "0px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ReactFlow
          nodesDraggable={false}
          elements={elements.data}
          onLoad={onLoad}
          snapToGrid
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectStop={onConnectEnd}
          onElementClick={onElementClick}
        >
          <Controls showInteractive={false} style={{ left: "95%" }} />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
        <hr
          style={{
            width: "100%",
            backgroundColor: "#E1EEFF",
            border: "none",
            height: "1px",
            marginBottom: "0px",
          }}
        />
        <div
          style={
            showresultanttable
              ? { display: "none" }
              : { textAlign: "left", marginTop: "10px" }
          }
        >
          <h3 className="anchor">Unmerge</h3>
          <Button onClick={() => mergeElements()}>Merge</Button>
          {/* <Button onClick={() => getElements()}>Download</Button> */}
        </div>
        <div
          className="buttongroup"
          style={
            showresultanttable
              ? { textAlign: "left", marginTop: "10px" }
              : { display: "none" }
          }
        >
          <Button onClick={() => props.showresulttable()}>
            View Resultant Table
          </Button>
          <Button type="primary" onClick={() => props.generateTable()}>
            Generate Table
          </Button>
        </div>
      </div>
    </>
  );
}
