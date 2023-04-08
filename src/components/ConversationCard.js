import React, { useState, useEffect } from "react";
import { Card, Badge } from "antd";
import { Avatar } from "@chakra-ui/avatar";
import {
  MessageOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
import { useSelector, useDispatch } from "react-redux";
import { setSelectedChatHistory } from "@/redux/selectedChatHistory";
import { setSelectedConvo } from "@/redux/selectedConvoSlice";

const ConversationCard = ({ data }) => {
  const otherUser = data.user1.email ? data.user1 : data.user2;
  const allMessages = useSelector((state) => state.allMessages);
  const [lastMessage, setLastMessage] = useState("");
  const [convoIndex, setConvoIndex] = useState(null);
  const [badgeCount, setBadgeCount] = useState(0);
  const dispatch = useDispatch();

  const handleConversationPress = (item) => {
    dispatch(setSelectedConvo(item));

    // Mark messages as read
    allMessages[convoIndex].forEach((message) => {
      if (message.sender_id === otherUser.id && !message.is_read) {
        // Dispatch an action to mark the message as read in the store
      }
    });

    setBadgeCount(0); // <-- Add this line to reset the badge count

    for (const exchanges of allMessages) {
      if (exchanges[0].conversation_id === item.id) {
        dispatch(setSelectedChatHistory(exchanges));
        break;
      }
    }
  };

  useEffect(() => {
    if (convoIndex !== null) {
      setLastMessage(
        allMessages[convoIndex][allMessages[convoIndex].length - 1]
      );

      const count = allMessages[convoIndex].filter(
        (message) => message.sender_id === otherUser.id && !message.is_read
      ).length;

      setBadgeCount(count);
    }
  }, [allMessages, convoIndex]);

  useEffect(() => {
    const conversationIndex = allMessages.findIndex(
      (conversation) =>
        conversation.length > 0 && conversation[0].conversation_id === data.id
    );
    console.log("Here is the conversation index: ", conversationIndex);
    setConvoIndex(conversationIndex);
  }, []);

  useEffect(() => {
    if (convoIndex !== null) {
      setLastMessage(
        allMessages[convoIndex][allMessages[convoIndex].length - 1]
      );
      const count = allMessages[convoIndex].filter(
        (message) => message.sender_id === otherUser.id && !message.is_read
      ).length;
      setBadgeCount(count);
    }
  }, [allMessages, convoIndex]);

  useEffect(() => {
    console.log("Last MESSAGE: ⚡️⚡️⚡️⚡️⚡️🔴🔴", lastMessage);
  }, []);

  // function getBadgeCount() {
  //   return (
  //     convoIndex !== null &&
  //     allMessages[convoIndex].filter((message) => !message.is_read).length
  //   );
  // }

  console.log("COnversation card all messages", allMessages.length);
  return (
    <Card
      key={data.id}
      style={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        transform: "translateY(-2px)",
        marginBottom: "10px",
        flexShrink: 1,
        flexGrow: 0,
        // width: "300px",
        // height: "150px",
      }}
      hoverable
      onClick={() => handleConversationPress(data)}
    >
      <p>
        {new Date(lastMessage.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <Meta
        avatar={
          <Avatar size="md" name={otherUser.name} src={otherUser.avatar_url} />
        }
        title={
          <>
            {otherUser.name}
            {badgeCount > 0 && (
              <Badge count={badgeCount} style={{ marginLeft: "5px" }} />
            )}
          </>
        }
        description={
          <>
            <p>
              {lastMessage.sender_id === otherUser.id
                ? otherUser.name.split(" ")[0]
                : "You"}
              : {lastMessage.content}
            </p>
          </>
        }
      />
      {/* <div style={{ marginTop: 10 }}>
        <a href="#message" style={{ float: "right" }}>
          <MessageOutlined />
        </a>
      </div> */}
    </Card>
  );
};

export default ConversationCard;
