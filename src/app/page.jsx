"use client";
import LayoutPage from "@/components/LayoutPage";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();

  const [commentText, setCommentText] = useState("");
  const [images, setImages] = useState([]);
  const [fileName, setFileName] = useState("");
  const likes = [];
  const subComments = [];
  const [title, setTitle] = useState("");
  const [commentDat, setComment] = useState("");

  async function handleSubmitComment(event) {
    event.preventDefault();
    const commentData = {
      comment: commentText,
      images,
      session,
      likes,
      subComments,
      title,
      commentDat,
    };
    if (session) {
      try {
        await axios.post("/api/comment", commentData);
      } catch (error) {
        console.error(error);
      }
    }
    setCommentText("");
    setImages([]);
  }

  return (
    <LayoutPage>
      <div>
        <form className="flex flex-col" onSubmit={handleSubmitComment}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className=""
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <label htmlFor="comment">Comment</label>
          <textarea
            maxLength="200"
            type="text"
            className=""
            id="comment"
            value={commentDat}
            onChange={(event) => setComment(event.target.value)}
          />
          <label htmlFor="comment">Comment your ideas!</label>
          <textarea
            maxLength="200"
            type="text"
            className=""
            id="comment"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
          />
          <div>
            {images.length > 0 &&
              images.map((image) => (
                <Image
                  key={image.id}
                  src={image}
                  width={100}
                  height={100}
                  alt=""
                />
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

            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <Image src={session.user.image} width={100} height={100} alt="" />
    </LayoutPage>
  );
}
