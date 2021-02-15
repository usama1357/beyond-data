import React from "react";
import styles from "./AutoMLSideBar.module.scss";
import { Layout, Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";

export default function AutoMLSideBar() {
  const { Sider } = Layout;

  return (
    <Sider
      width={71}
      className={styles.sidebar}
      style={{ position: "absolute", height: `100vh` }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<SettingOutlined />}></Menu.Item>
        <Menu.Item key="8" icon={<SettingOutlined />}></Menu.Item>
        <Menu.Item key="12" icon={<SettingOutlined />}></Menu.Item>
      </Menu>
    </Sider>
  );
}
