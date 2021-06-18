import React, { useState } from "react";
import styles from "./AutoMLSideBar.module.scss";
import { Layout, Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";

export default function AutoMLSideBar() {
  const { Sider } = Layout;
  const [val, setval] = useState("1");

  return (
    <Sider
      width={71}
      className={styles.sidebar}
      style={{ position: "absolute", height: `100vh` }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[val]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item
          key="1"
          icon={<SettingOutlined />}
          onClick={() => setval("1")}
        ></Menu.Item>
        <Menu.Item
          key="2"
          icon={<SettingOutlined />}
          onClick={() => setval("2")}
        ></Menu.Item>
        <Menu.Item
          key="3"
          icon={<SettingOutlined />}
          onClick={() => setval("3")}
        ></Menu.Item>
      </Menu>
    </Sider>
  );
}
