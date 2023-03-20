import React from "react";
import { AutoComplete } from "antd";
import citiesData from "../data/cities.json";
import {
  SearchOutlined,
  AppstoreAddOutlined,
  InboxOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Space, Breadcrumb, Layout, Menu, theme } from "antd";
import { useEffect, useState } from "react";
import UserService from "@/services/user";
import { User, emptyUser } from "@/models/User";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import RecentListingsComponent from "@/components/RecentListings";
import TicketsComponent from "@/components/Tickets";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Home", "1", <HomeOutlined />),
  getItem("Search", "2", <SearchOutlined />),
  getItem("Add listings", "3", <AppstoreAddOutlined />),
  getItem("Inbox", "4", <InboxOutlined />),
  getItem("Logout", "5", <LogoutOutlined />),
];

const FlatifyDashboard = () => {
  const [user, setUser] = useState(new User(emptyUser))
  const [collapsed, setCollapsed] = useState(false);
  const [options, setOptions] = useState([]);
  const userService = new UserService();
  const supabase = useSupabaseClient();

  async function handleLogout() {
    const result = await userService.logout(supabase);
  }
  useEffect(() => {
    (async () => {
      const user_profile = await userService.getAuthUserProfile(supabase);
      setUser(user_profile);
    })();
  }, []);


  const handleSearch = (value) => {
    let res = [];
    if (!value) {
      res = [];
    } else {
      const filteredCities = citiesData.cities.filter((city) =>
        city.name.toLowerCase().includes(value.toLowerCase())
      );
      res = filteredCities.map((city) => ({
        value: `${city.name}, ${city.country}`,
        label: `${city.name}, ${city.country}`,
      }));
    }
    setOptions(res);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 38,
            margin: 12,
            background: "rgba(255, 255, 255, 0.2)",
            color: "white",
            textAlign: "center",
          }}
        >
          FDM
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={({ key }) => {
            if (key === "5") {
              handleLogout();
            }
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            textAlign: "center",
            color: "#fff",
            height: 64,
            paddingInline: 10,
            lineHeight: "64px",
            backgroundColor: "#001628",
            // maxWidth: 800,
          }}
        >
          <AutoComplete
            style={{ width: 800 }}
            onSearch={handleSearch}
            placeholder="Search by city"
            options={options}
          />
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Consultant</Breadcrumb.Item>
            <Breadcrumb.Item>{user.name}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 570,
              background: colorBgContainer,
            }}
          >
            <div>
              <RecentListingsComponent />
            </div>
            <div
              style={{
                margin: 60,
                textAlign: "center",
              }}
            >
              <TicketsComponent />
            </div>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "white",
            color: "black",
          }}
        >
          FDM | FLATIFY
        </Footer>
      </Layout>
      <Sider
        style={{
          textAlign: "center",
          lineHeight: "120px",
          // color: "#fff",
          width: "50",
        }}
      >
        <Space size={26} wrap>
          <Avatar size={100}>USER PROFILE</Avatar>
        </Space>
      </Sider>
    </Layout>
  );
};
export default FlatifyDashboard;
