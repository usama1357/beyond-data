import React, { useContext, useEffect, useState } from "react";
import styles from "./AutoMLHeader.module.scss";
import { Badge, Layout, Popover } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";
import bellIcon from "../../Icons/AutoML/bellicon.svg";
import "./styles.css";
import NotificationPopover from "../../Popover/NotificationPopover";
import axios from "axios";
import { URL } from "../../../Config/config";
import { io } from "socket.io-client";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";

export default function AutoMLHeader() {
  const { Header } = Layout;
  const [popovervisible, setpopovervisible] = useState(false);
  const [unreadcount, setunreadcount] = useState(0);

  const { Auth } = useContext(AuthContext);

  //Script 1
  // const socket = io(`http://10.3.213.149:8001/`, {
  //   // reconnectionDelayMax: 1000,
  //   path: `notifications/${Auth.user_id}`,
  //   // query: {
  //   //   "my-key": "my-value",
  //   // },
  //   transports: ["websocket"],
  // });

  // console.log(socket.connected);

  // socket.onAny((event, ...args) => {
  //   console.log(`got ${event}`);
  // });

  //SCript 2
  // var webSocketEndpoint = `ws://10.3.213.149:8001/notifications/usama/`; // ws : wss   // Websocket URL, Same on as mentioned in the routing.py
  // var socket = new WebSocket(webSocketEndpoint); // Creating a new Web Socket Connection
  // // Socket On receive message Functionality
  // socket.onmessage = function (e) {
  //   console.log("message", e);
  // };
  // socket.onopen = function (e) {
  //   console.log("open", e);
  // };
  // socket.onerror = function (e) {
  //   console.log("error", e);
  // };
  // socket.onclose = function (e) {
  //   console.log("closed", e);
  // };

  //Script 3
  // let socketRef = new WebSocket(
  //   `ws://10.3.213.149:8001/notifications/${Auth.user_id}`
  // );
  // socketRef.onopen = () => {
  //   console.log("WebSocket open");
  // };
  // socketRef.onmessage = (e) => {
  //   this.socketNewMessage(e.data);
  // };

  // socketRef.onerror = (e) => {
  //   console.log(e.message);
  // };
  // socketRef.onclose = () => {
  //   console.log("WebSocket closed let's reopen");
  // };

  //Script 4
  var loc = window.location;
  var user = 4455;
  var wsStart = "ws://";
  if (loc.protocol == "https:") {
    wsStart = "wss://";
  }

  var webSocketEndpoint = wsStart + "10.3.213.149:80" + "/notifications/usama/"; // ws : wss   // Websocket URL, Same on as mentioned in the routing.py
  console.log(webSocketEndpoint);

  var socket = new WebSocket(webSocketEndpoint); // Creating a new Web Socket Connection
  // Socket On receive message Functionality
  socket.onmessage = function (e) {
    console.log("message", e);
    // $("body").append("<h3>" + e.data + "</h3>");
    // Can write any functionality based on your requirement
  };

  // Socket Connet Functionality
  socket.onopen = function (e) {
    console.log("open", e);
  };

  // Socket Error Functionality
  socket.onerror = function (e) {
    console.log("error", e);
  };

  // Socket close Functionality
  socket.onclose = function (e) {
    console.log("closed", e);
  };

  const handlevisiblechange = (visible) => {
    setpopovervisible(visible);
  };

  useEffect(() => {
    console.log(URL);
    // socket.on("message", (value) => {
    //   console.log(value);
    //   setunreadcount(unreadcount + 1);
    // });
  });

  const sendtask = async () => {
    await axios
      .get(`${URL}/background_task/?user_id=${Auth.user_id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
        }
      });
  };

  return (
    <div className={styles.Container} id="AutoMLHeader">
      <Header className={styles.header}>
        <div className="logo" />
        <h2>
          Beyond<span> Data</span>
        </h2>
        <div style={{ display: "flex", height: "56px" }}>
          <div style={{ flexGrow: "1" }}></div>
          <button
            style={{
              marginRight: "30px",
              fontSize: "20px",
              color: "black",
            }}
            onClick={() => sendtask()}
          >
            call for Notification (testing)
          </button>
          <Popover
            placement="bottomRight"
            title="Notifications"
            content={NotificationPopover}
            visible={popovervisible}
            trigger="click"
            overlayClassName="Popover"
            onVisibleChange={handlevisiblechange}
          >
            <Badge
              count={unreadcount}
              style={
                unreadcount === 0
                  ? { display: "none" }
                  : { display: "block", margin: "auto" }
              }
            >
              <img
                src={bellIcon}
                alt={"Bell Icon"}
                onClick={() => setpopovervisible(!popovervisible)}
              />
            </Badge>
          </Popover>
          <Avatar
            icon={<UserOutlined />}
            style={{ display: "block", margin: "auto", marginLeft: "20px" }}
          />
        </div>
      </Header>
    </div>
  );
}
