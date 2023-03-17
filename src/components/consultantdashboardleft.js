import React, { useState } from "react";
// import "./index.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreAddOutlined,
  HomeOutlined,
  SearchOutlined,
  InboxOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";

const { Header, Sider, Content } = Layout;
const LeftDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Home Page",
            },
            {
              key: "2",
              icon: <SearchOutlined />,
              label: "Search Listing",
            },
            {
              key: "3",
              icon: <AppstoreAddOutlined />,
              label: "Add Listing",
            },
            {
              key: "4",
              icon: <InboxOutlined />,
              label: "Inbox",
            },
            {},
            {},
            {},
            {
              key: "5",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
      </Layout>
    </Layout>
  );
};
export default LeftDashboard;
