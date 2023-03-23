import React from "react";
//import "./index.css";
import { PlusOutlined, LoadingOutlined, ConsoleSqlOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const ProfilePicture = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const supabase = useSupabaseClient();

  const handleChange = async (info) => {
    console.log(info)
    
    const avatarFile = info.file.originFileObj
    if (info.file.status === "uploading") {
      setLoading(true);
      const { data, error } = await supabase
      .storage
      .from('assets')
      .upload(avatarFile.name, avatarFile, {
        cacheControl: '3600',
        upsert: false
      })
      console.log({data, error})
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
      const { data } = supabase.storage
      .from('assets')
      .getPublicUrl(avatarFile.name)
        setLoading(false);
        // console.log("Here is thee info file: ", info.file.originFileObj)
        console.log({data})
        setImageUrl(data.publicUrl);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%"
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};
export default ProfilePicture;
      

      
// import React, { useEffect, useState } from 'react'
// import { useSupabaseClient } from '@supabase/auth-helpers-react'
// import UserService from '@/services/UserService'
// import {Button} from 'antd'
// import styles from '../styles/dashboardright.module.css'

// export default function Avatar({ user, url }) {
//   const supabase = useSupabaseClient()
//   const userService = new UserService()
//   const [avatarUrl, setAvatarUrl] = useState(null)
//   const [uploading, setUploading] = useState(false)

//   useEffect(() => {
//     if (url) downloadImage(url)
//   }, [url])

//   useEffect(() => {
//     if (user) setAvatarUrl(user.avatar_url)
//   }, [user])

//   async function downloadImage(path) {
//     try {
//       const { data, error } = await supabase.storage.from('assets').download(path)
//       if (error) {
//         throw error
//       }
//       const url = URL.createObjectURL(data)
//       setAvatarUrl(url)
//     } catch (error) {
//       console.log('Error downloading image: ', error)
//     }
//   }

//   const onUpload = (filePath) => {
//     const {data} = supabase.storage
//     .from('assets')
//     .getPublicUrl(filePath)

//     // console.log(data)
//     setAvatarUrl(data.publicUrl)
//     userService.updateAvatar(supabase, data.publicUrl, user.id)
//   }


//   const uploadAvatar = async (event) => {
//     try {
//       setUploading(true)

//       if (!event.target.files || event.target.files.length === 0) {
//         throw new Error('You must select an image to upload.')
//       }

//       const file = event.target.files[0]
//       const fileExt = file.name.split('.').pop()
//       const fileName = `${user.id}.${fileExt}`
//       const filePath = `${fileName}`

//       let { error: uploadError } = await supabase.storage
//         .from('assets')
//         .upload(filePath, file, { upsert: true })

//       if (uploadError) {
//         throw uploadError
//       }

//       onUpload(filePath)
//     } catch (error) {
//       alert('Error uploading avatar!')
//       console.log(error)
//     } finally {
//       setUploading(false)
//     }
//   }

//   return (
//     <div>
//       {avatarUrl ? (
//         <img
//           src={avatarUrl}
//           alt="Avatar"
//           className="avatar image"
//           style={{ height: 100, width: 100 }}
//         />
//       ) : (
//         <div className="avatar no-image" style={{ height: 100, width: 100 }} />
//       )}
//       <div style={{height: 30}}>
//         <label htmlFor="single">
//           {uploading ? 'Uploading ...' : 'Upload'}
//         </label>
//         <input
//           style={{
//             // visibility: 'hidden',
//             position: 'absolute',
//           }}
//           className={styles.input}
//           size='60'
//           type="file"
//           id="single"
//           accept="image/*"
//           onChange={uploadAvatar}
//           disabled={uploading}
//         />
//       </div>
//     </div>
//   )
// }