import { Avatar } from "@chakra-ui/avatar";
import { style } from "dom-helpers";
import React from "react";
import { useSelector } from "react-redux";

const DirectMessage = ({ message, otherUser }) => {
  const user = useSelector((state) => state.user);
  const isFromUser = message.sender_id === user.id;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginTop: "15%",
        padding: "2em",
        flexDirection: isFromUser ? "row-reverse" : "row",
      }}
    >
      <Avatar
        size="md"
        name={isFromUser ? user.name : otherUser.name}
        src={isFromUser ? user.avatar_url : otherUser.avatar_url}
      />
      <div style={{ display: "flex" }}>
        <p className={isFromUser ? "senderBubble" : "receiverBubble"}>
          {message.content.trim()} &nbsp;{" "}
        </p>
        <span className="timestamp">
          <strong>
            {new Date(message.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </strong>
        </span>
      </div>
    </div>
  );
};

export default DirectMessage;
