import ForumPostService from "./ForumPostService";
import ForumPost from "@/components/ForumPost";
import MessageService from "./messageService";
import { Tag, notification } from "antd";
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
import DirectMessage from "@/components/DirectMessage";

export default class NotificationService {
  api;
  dispatch;
  setTabKey;

  constructor(api, setTabKey) {
    this.api = api;
    this.dispatch = useDispatch();
    this.setTabKey = setTabKey;
  }

  async playSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createBufferSource();
  
    fetch('/assets/message-blip.mp3')
      .then(response => response.arrayBuffer())
      .then(data => audioContext.decodeAudioData(data))
      .then(buffer => {
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
      })
      .catch(err => console.error('Error with decoding audio data:', err));
  };
 
  async forumPost(fullPost, listing) {
    this.api.info({
      onClick: () => {
        this.setTabKey(1);
        this.dispatch(setSelectedListing(listing));
      },
      icon: <SoundTwoTone twoToneColor="#52c41a" />,
      style: {
        padding: "0.5rem",
      },
      message: (
        <p
          style={{
            margin: 0,
            color: "gray",
            fontWeight: "500",
            fontSize: 10,
            cursor: "pointer",
          }}
        >
          New comment under listing in{" "}
          <span style={{ color: "darkblue" }}>{listing.address.city}</span>
        </p>
      ),
      description: (
        <div style={{ cursor: "pointer" }}>
          <ForumPost forumPost={fullPost} />
        </div>
      ),
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
          style={{ margin: 0, color: "gray", fontWeight: "500", fontSize: 10 }}
        >
          Ticket update
        </p>
      ),
      description: <TicketNotification ticket={ticket} />,
      placement: "topRight",
      duration: 4,
    });
  }

  async privateMessage(message, author) {
    this.api.info({
      onClick: () => {
        this.setTabKey(5);
      },
      icon: <MessageTwoTone twoToneColor="#52c41a" />,
      style: {
        padding: "0.5rem",
      },
      message: (
        <p
          style={{ margin: 0, color: "gray", fontWeight: "500", fontSize: 10, cursor: 'pointer' }}
        >
          New private message from{" "}
          <span style={{ color: "darkblue" }}>{author.name}</span>
        </p>
      ),
      description: <div style={{cursor: 'pointer'}}>
        <DirectMessage otherUser={author} message={message} />
        </div>,
      placement: "topRight",
      duration: 4,
    });
  }

  async verifyCaptchaMessage(placement) {
    this.api.info({
      message: `Error`,
      description: 'Please verify HCaptcha before clicking "Create Listing"',
      placement,
      type: "error",
    });
  }
}
