import { Button } from "antd";
import React, { useState } from "react";
import ReactFlow, { Controls, updateEdge, addEdge } from "react-flow-renderer";
import "./Demo.scss";

export default function Demo() {
  const initialElements = [
    {
      id: "ffc_1",
      data: { label: "Customer_Name" },
      position: { x: 0, y: 0 },
      style: {
        background: "#F5FAFF",
        border: "none",
        fontSize: "12px",
        color: "#6D6D6D",
      },
    },
    {
      id: "ffc_2",
      data: { label: "Customer_id" },
      position: { x: 150, y: 0 },
      style: {
        background: "#F5FAFF",
        border: "none",
        fontSize: "12px",
        color: "#6D6D6D",
      },
    },
    {
      id: "ffc_3",
      data: { label: "Date" },
      position: { x: 300, y: 0 },
      style: {
        background: "#F5FAFF",
        border: "none",
        fontSize: "12px",
        color: "#6D6D6D",
      },
    },
    {
      id: "abc_1",
      data: { label: "Customer_Name" },
      position: { x: 0, y: 200 },
      style: {
        background: "#F5FAFF",
        border: "none",
        fontSize: "12px",
        color: "#6D6D6D",
      },
    },
    {
      id: "abc_2",
      data: { label: "Customer_id" },
      position: { x: 150, y: 200 },
      style: {
        background: "#F5FAFF",
        border: "none",
        fontSize: "12px",
        color: "#6D6D6D",
      },
    },
    {
      id: "abc_3",
      data: { label: "Date" },
      position: { x: 300, y: 200 },
      style: {
        background: "#F5FAFF",
        border: "none",
        fontSize: "12px",
        color: "#6D6D6D",
      },
    },
    {
      id: "abcd_1",
      data: { label: "Customer_Name" },
      position: { x: 0, y: 400 },
      style: {
        background: "#F5FAFF",
        border: "none",
        fontSize: "12px",
        color: "#6D6D6D",
      },
    },
    {
      id: "abcd_2",
      data: { label: "Customer_id" },
      position: { x: 150, y: 400 },
      style: {
        background: "#F5FAFF",
        border: "none",
        fontSize: "12px",
        color: "#6D6D6D",
      },
    },
    {
      id: "abcd_3",
      data: { label: "Date" },
      position: { x: 300, y: 400 },
      style: {
        background: "#F5FAFF",
        border: "none",
        fontSize: "12px",
        color: "#6D6D6D",
      },
    },
  ];

  const [elements, setElements] = useState(initialElements);

  const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();

  // gets called after end of edge gets dragged to another source or target
  const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));

  const onConnect = (params) => {
    let edge = params;
    edge["animated"] = false;
    edge["label"] = "Connected";
    edge["style"] = { stroke: "blue", strokeWidth: "3px" };
    edge["arrowHeadType"] = "arrow";
    // edge["type"] = "step";
    console.log(edge);
    setElements((els) => addEdge(edge, els));
  };

  return (
    <>
      <div
        className={"ReactFlowContainer"}
        style={{
          width: "100%",
          height: "70%",
          border: "1px solid grey",
          padding: "0px",
          borderRadius: "10px",
        }}
      >
        <ReactFlow
          nodesDraggable={false}
          elements={elements}
          onLoad={onLoad}
          snapToGrid
          onEdgeUpdate={onEdgeUpdate}
          onConnect={onConnect}
        >
          <Controls />
        </ReactFlow>
      </div>
      <br></br>
      <Button onClick={() => console.log(elements)}>Download</Button>
    </>
  );
}
