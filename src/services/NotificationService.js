import ForumPostService from "./ForumPostService";
import ForumPost from "@/components/ForumPost";
import MessageService from "./messageService";


export default class NotificationService {

  api;

  constructor(api){
    this.api = api
  }

  async forumPost (fullPost, city) {
    this.api.info({
      style: {
        padding: '0.5rem'
      },
      message: <p style={{margin: 0, color: 'gray', fontWeight: '500', fontSize: 10}}>New comment under listing in <span style={{color: 'darkblue'}}>{city}</span></p>,
      description: <ForumPost forumPost={fullPost}/>,
      placement: 'topRight',
      duration: 4
    });
  };



}