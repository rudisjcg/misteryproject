"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default  function () {
    const [images, setImages] = useState([]);
    const [fileName, setFileName] = useState("");
    const likes = [];
    const subComments = [];
    const [comment, setComment] = useState("");
    const {data: session} = useSession();

  
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
          await axios.post("/api/comment", commentData);
        } catch (error) {
          console.error(error);
        }
      }
      setImages([]);
      setComment("");
      setFileName("");
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
              onChange={({ target: { files } }) => {
                files[0] && setFileName(files[0].name);
                if (files) {
                  setImages((oldImages) => {
                    return [...oldImages, URL.createObjectURL(files[0])];
                  });
                }
              }}
            />

          </div>
            <button type="submit">Submit</button>
        </form>
    )
}