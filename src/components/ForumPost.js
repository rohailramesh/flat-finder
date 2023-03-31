import React, { useState } from "react";
// import { Avatar } from "antd";
import { Avatar } from "@chakra-ui/react";
import { Popconfirm } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import ForumPostService from "@/services/ForumPostService";

function ForumPost({ forumPost, user_id, setForumPosts}) {
  const { author } = forumPost;

  const [showDelete, setShowDelete] = useState(false)
  const forumPostService = new ForumPostService()


  return (
    <>
      <div
        className={author.id === user_id && 'hover-up'}
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
        style={{
          borderTop: '1px solid #c7c7c7',
          display: "flex",
          height: 75,
          alignItems: "center",
          gap: "1rem",
          padding: "0.5rem",
        }}
      >
        <Avatar size='md' name={author.name} src={author.avatar_url} />
        <div
          style={{
            height: "100%",
            width: "90%",
          }}
        >
          <p style={{ margin: 0, marginBottom: 5, fontWeight: 600 }}>
            {author.name}
          </p>
          <p style={{ margin: 0 }}>{forumPost.content}</p>
        </div>
          {user_id === author.id && showDelete && 
          <Popconfirm
          title="Delete post"
          description="Do you wish to delete this forum post?"
          onConfirm={async () => {
            const {error} = await forumPostService.removeForumPost(forumPost.id)
            if (!error) setForumPosts((prev) => prev.filter(post => post.id !== forumPost.id))
          }}
          // onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <DeleteTwoTone twoToneColor="#eb2f96" className="fade-in" style={{fontSize: 14}} />
        </Popconfirm>  
        }
      </div>
    </>
  );
}
export default ForumPost;
