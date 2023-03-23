import { Form, Select } from "antd";
import {
  SearchOutlined,
  AppstoreAddOutlined,
  InboxOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

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


const { Option } = Select;
const suffixSelector = (
  <Form.Item name="suffix" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="USD">$</Option>
      <Option value="CNY">¥</Option>
      <Option value="GBP">£</Option>
      <Option value="EUR">€</Option>
    </Select>
  </Form.Item>
);



export { items, suffixSelector } 