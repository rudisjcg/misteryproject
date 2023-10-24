"use client";
import axios from "axios";
import FormData from "form-data";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default  function () {
    const [images, setImages] = useState([]);
    const [fileName, setFileName] = useState("");
    const [imagesUpload, setImagesUpload] = useState([]);
    const likes = [];
    const subComments = [];
    const [comment, setComment] = useState("");
    const {data: session} = useSession();
    const [isUploading, setIsUploading] = useState(false);

  
    async function handleSubmitComment(event) {
      event.preventDefault();
      const commentData = {
        images: images,
        email: session.user.email,
        likes: likes,
        subComments: subComments,
        comment: comment,
      };
      
      if (session) {
        try {
          await axios.postForm("/api/comment", commentData);
        } catch (error) {
          console.error(error);
        }
      }
      setImages([]);
      setComment("");
      setFileName("");
    }

    async function uploadImages(ev) {
      const files = ev?.target?.files;
      console.log(files)
      const data = []
      for (let i = 0; i < files.length; i++) {
        const fileName = files[i].name;
        data.push(fileName)
      }
      console.log(data)
      /* 
      try {
        const res = await axios.post("api/upload", data);
        console.log(res)
        setImages((oldImages) => {
          return [...oldImages, ...res.data.links];
        });
      } catch(err) {
        console.log(err)
      }
    
      
      setIsUploading(false);
    }
      */
    }
    
    return (
        <form className="flex flex-col" onSubmit={handleSubmitComment}>
          <label htmlFor="comment">Comment</label>
          <textarea
            maxLength="200"
            type="text"
            className=""
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <div>
            {images?.length > 0 &&
              images?.map((image) => (
                <picture  key={image.id}>

                  <img
                   
                    src={image}
                    width={100}
                    height={100}
                    alt=""
                  />
                </picture>
              ))}
          </div>
          <div>
            <input
              type="file"
              onChange={uploadImages}
            />

          </div>
            <button type="submit">Submit</button>
        </form>
    )
}