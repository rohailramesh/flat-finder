import ForumPostService from "./ForumPostService";
import ForumPost from "@/components/ForumPost";
import MessageService from "./messageService";
import { Tag } from "antd";
import {
  MessageTwoTone,
  SoundTwoTone,
  HourglassTwoTone,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import TicketNotification from "@/components/TicketNotification";
import { useDispatch } from "react-redux";
import { setSelectedListing } from "@/redux/selectedListingSlice";

export default class NotificationService {
  api;
  dispatch;
  setTabKey;

  constructor(api, setTabKey) {
    this.api = api;
    this.dispatch = useDispatch()   
    this.setTabKey = setTabKey
  }

  async forumPost(fullPost, listing) {
    this.api.info({
      onClick: () => {
        this.setTabKey(1)
        this.dispatch(setSelectedListing(listing))
      },
      icon: <SoundTwoTone twoToneColor="#52c41a" />,
      style: {
        padding: "0.5rem",
      },
      message: (
        <p 
          style={{ margin: 0, color: "gray", fontWeight: "500", fontSize: 10, cursor: 'pointer'}}>
          New comment under listing in{" "}
          <span style={{ color: "darkblue" }}>{listing.address.city}</span>
        </p>
      ),
      description: <div style={{cursor: 'pointer'}}>
        <ForumPost forumPost={fullPost} />
        </div>,
      placement: "topRight",
      duration: 4,
    });
  }

  async ticketUpdate(ticket) {
    this.api.info({
      icon: <HourglassTwoTone twoToneColor="#52c41a" />,
      style: {
        padding: "0.5rem",
      },
      message: (
        <p
          style={{ margin: 0, color: "gray", fontWeight: "500", fontSize: 10 }}>
          Ticket update
        </p>
      ),
      description: <TicketNotification ticket={ticket} />,
      placement: "topRight",
      duration: 4,
    });
  }

  async privateMessage(message, author) {
    //Pretent the message is a forumPost to reuse ForumPost component
    //Idea: Reuse ForumPost component instead of creating a messageNotification component.
    const fullPost = {
      content: message.content,
      author,
    };

    console.log("Inside private message!!!!!!");

    this.api.info({
      icon: <MessageTwoTone twoToneColor="#52c41a" />,
      style: {
        padding: "0.5rem",
      },
      message: (
        <p
          style={{ margin: 0, color: "gray", fontWeight: "500", fontSize: 10 }}>
          New private message from{" "}
          <span style={{ color: "darkblue" }}>{author.name}</span>
        </p>
      ),
      description: <ForumPost forumPost={fullPost} />,
      placement: "topRight",
      duration: 4,
    });
  }
}
