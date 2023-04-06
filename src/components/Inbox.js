import React, { useState, useEffect, useRef } from "react";
import { Card, Avatar, Badge } from "antd";
import {
  MessageOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import ConversationCard from "./ConversationCard";
import { useSelector, useDispatch } from "react-redux";
import { emptyUser } from "@/models/User";
import DirectMessage from "./DirectMessage";
import { messageService } from "@/services/Instances";
import { addMessage } from "@/redux/messagesSlice";
import { addMessageToSelectedChatHistory } from "@/redux/selectedChatHistory";
const { Meta } = Card;

const Inbox = ({ conversations }) => {
  // const [selectedContact, setSelectedContact] = useState(null);
  const [content, setContent] = useState("");
  // const [chatHistory, setChatHistory] = useState([]);
  const selectedChatHistory = useSelector((state) => state.selectedChatHistory);
  const selectedConvo = useSelector((state) => state.selectedConvo);
  const [otherUser, setOtherUser] = useState(emptyUser);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const messagesBoxRef = useRef(null);
  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [selectedChatHistory]);

  const handleChange = (event) => {
    setContent(event.target.value);
  };
  // const handleContactClick = (index) => {
  //   setSelectedContact(cardData[index]);
  // };
  async function handleSendMessage() {
    //async addMessage(sender_id, content, recipient_id){
    if (content) {
      const receiver =
        selectedConvo.user1 === user.id
          ? selectedConvo.user2.id
          : selectedConvo.user1.id;
      const result = await messageService.addMessage(
        user.id,
        content,
        receiver
      );
      setContent("");
      console.log(result);
      const new_message = result.data[0];

      console.log("Message we got back: ", new_message);
      dispatch(addMessageToSelectedChatHistory(new_message));
      dispatch(addMessage(new_message));
    }
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "70%" }}>
          {conversations.map((data, index) => {
            return <ConversationCard data={data} setOtherUser={setOtherUser} />;
          })}
        </div>
        {selectedChatHistory && (
          <div style={{ width: "30%" }}>
            <Card
              style={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                transform: "translateY(-2px)",
                marginBottom: "10px",
                marginLeft: "-400px",
                width: "700px",
                height: "800px",
              }}
            >
              <div style={{ marginTop: 5 }}>
                <a href="#message" style={{ float: "right" }}>
                  <MessageOutlined />
                </a>
              </div>
              <Card>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "650px",
                  }}
                >
                  <div
                    ref={messagesBoxRef}
                    style={{
                      flexGrow: 1,
                      overflowY: "scroll",
                      height: "680px",
                      overflow: "auto",
                    }}
                  >
                    {selectedChatHistory.map((message, index) => (
                      <DirectMessage message={message} otherUser={otherUser} />
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "blue",
                      marginTop: "5rem",
                    }}
                  >
                    <input
                      type="text"
                      value={content}
                      onKeyDown={handleKeyDown}
                      onChange={handleChange}
                      style={{ flexGrow: 1, color: "blue" }}
                    />
                    <button
                      onClick={() => {
                        handleSendMessage();
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
