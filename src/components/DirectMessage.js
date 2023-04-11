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
        // marginTop: "15%",
        width: '100%',
        padding: "1em",
        flexDirection: isFromUser ? "row-reverse" : "row",
      }}
    >
      <Avatar
        size="md"
        name={isFromUser ? user.name : otherUser.name}
        src={isFromUser ? user.avatar_url : otherUser.avatar_url}
      />
      <div className={isFromUser ? "senderBubble" : "receiverBubble"}>
        <p style={{marginBottom: 0}}>
          {message.content.trim()}
        </p>
        {/* <div className="timestamp"> */}
          <p style={{marginBottom: 0, alignSelf: isFromUser ? 'flex-end' : 'flex-start', color: isFromUser ? "#BBDEFB" : "#474747"}} className="timestamp">
            {new Date(message.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        {/* </div> */}
      </div>
    </div>
  );
};

export default DirectMessage;
