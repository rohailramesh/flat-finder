import React from 'react';
//import './index.css';
import { UserOutlined, SettingFilled, QuestionCircleFilled, MessageFilled, InboxOutlined } from '@ant-design/icons';
import { Avatar, Space, Button } from 'antd';
import ProfilePicture from "@/components/profilepicture";
import styles from "../styles/dashboardright.module.css";

//const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

const RightDashboard = ({user}) => (
  <div className={styles.outerContainer}>
    <ProfilePicture user={user}/>
    <div className={styles.flexContainer}>
      <InboxOutlined />
      <MessageFilled />
      <QuestionCircleFilled />
      <SettingFilled />
    </div>
    <Button>Manage Profile</Button>
  </div>
);
export default RightDashboard;