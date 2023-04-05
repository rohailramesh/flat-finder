import React, { useState } from "react";
import { Card, Avatar, Badge } from "antd";
import {
  MessageOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import ConversationCard from "./ConversationCard";
import { useSelector } from "react-redux";
import { emptyUser } from "@/models/User";
import DirectMessage from "./DirectMessage";
const { Meta } = Card;

const Inbox = ({ conversations }) => {
  // const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const selectedConvo = useSelector((state) => state.selectedConvo);
  const [otherUser, setOtherUser] = useState(emptyUser);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newChatHistory = [...chatHistory, message];
      setChatHistory(newChatHistory);
      setMessage("");
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  // const handleContactClick = (index) => {
  //   setSelectedContact(cardData[index]);
  // };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "70%" }}>
          {conversations.map((data, index) => {
            return <ConversationCard data={data} setOtherUser={setOtherUser} />;
          })}
        </div>
        {selectedConvo && (
          <div style={{ width: "30%" }}>
            <Card
              style={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                transform: "translateY(-2px)",
                marginBottom: "10px",
                marginLeft: "-400px",
                width: "700px",
                height: "790px",
              }}
            >
              <div style={{ marginTop: 10 }}>
                <a href="#message" style={{ float: "right" }}>
                  <MessageOutlined />
                </a>
              </div>
              <Card>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "630px",
                  }}
                >
                  <div style={{ flexGrow: 1, overflowY: "auto" }}>
                    {selectedConvo.map((message, index) => (
                      // <p key={index}>{message.content}</p>
                      <DirectMessage message={message} otherUser={otherUser} />
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "blue",
                    }}
                  >
                    <input
                      type="text"
                      value={message}
                      onKeyDown={handleKeyDown}
                      onChange={handleChange}
                      style={{ flexGrow: 1, color: "blue" }}
                    />
                    <button
                      onClick={() => {
                        setChatHistory([...chatHistory, message]);
                        setMessage("");
                      }}
                    >
                      &nbsp; Send
                    </button>
                  </div>
                </div>
              </Card>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default Inbox;
