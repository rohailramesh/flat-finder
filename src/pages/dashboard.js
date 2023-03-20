import { Layout, Space } from "antd";
import { useEffect, useState } from "react";
import { AutoComplete } from "antd";
import citiesData from "../data/cities.json";
import User from "@/services/user";
import LeftDashboard from "@/components/consultantdashboardleft";
import RightDashboard from "@/components/consultantdashboardright";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 10,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
  maxWidth: 800,
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
  maxWidth: 800,
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "100px",
  color: "#fff",
  backgroundColor: "#3ba0e9",
  width: 100,
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

export default function FlatifyDashboard() {
  const userService = new User();
  const supabase = useSupabaseClient();
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar_url: "",
  });

  useEffect(() => {
    (async () => {
      const user = await userService.getAuthUser(supabase);
      setUser({ email: user.email, ...user.user_metadata });
    })();
  }, []);

  async function handleLogout() {
    const result = await userService.logout(supabase);
  }

  const [options, setOptions] = useState([]);

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

  return (
    <div>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
        size={[0, 48]}
      >
        <Layout>
          <Sider style={siderStyle}>
            <LeftDashboard />
          </Sider>

          <Layout>
            <Header style={headerStyle}>
              Search bar
              <AutoComplete
                style={{ width: 200 }}
                onSearch={handleSearch}
                placeholder="Search by city"
                options={options}
              />
            </Header>
            <Content style={contentStyle}>Saved Listings & Tickets</Content>
          </Layout>

          <Layout>
            <Sider style={siderStyle}>
              <RightDashboard />
            </Sider>
          </Layout>

        </Layout>
      </Space>

      <button onClick={handleLogout}>LOGOUT FAM XD</button>
    </div>
  );
}
