"use client";
import LayoutPage from "@/components/LayoutPage";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();

  const [comment, setComment] = useState("");
  const [image, setImage] = useState([]);
  const [fileName, setFileName] = useState("");
  const likes = [];
  const subComments = [];

  async function submitComment(ev) {
    ev.preventDefault();
    const data = { comment, image, session, likes, subComments };
    if (session) {
      console.log(data);
      await axios.post("/api/comment", data);
    }
    setComment("");
    setImage([]);
  }

  return (
    <LayoutPage>
      <div>
        <form className="flex flex-col" onSubmit={submitComment}>
          <label htmlFor="">Comment your ideas!</label>
          <textarea
            maxLength="200"
            type="text"
            className=""
            value={comment}
            onChange={(ev) => setComment(ev.target.value)}
          />
          <div>
            {image.length > 0 &&
              image.map((img) => (
                <Image key={img.id} src={img} width={100} height={100} alt="" />
              ))}
          </div>
          <div>
            <input
              type="file"
              onChange={({ target: { files } }) => {
                files[0] && setFileName(files[0].name);
                if (files) {
                  setImage((oldImages) => {
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
