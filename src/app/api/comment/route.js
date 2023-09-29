import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import Comment from "@/models/comment";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

export async function POST(req) {
  const { comment, image, likes, session, subComments, title, commentDat } =
    await req.json();

  if (title && commentDat) {
    const msg = {
      to: "rudisjcg@gmail.com", // Change to your recipient
      from: "rudis@xploy.net", // Change to your verified sender
      subject: title,
      text: commentDat,
      html: commentDat,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  try {
    await mongooseConnect();

    await Comment.create({
      comment,
      image,
      likes,
      session,
      subComments,
    });

    return NextResponse.json({ message: "comment saved!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
