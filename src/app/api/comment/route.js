import { mongooseConnect } from "@/lib/mongoose";
import Comment from "@/models/comment";
import { NextResponse } from "next/server";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

export async function POST(req) {
  const { comment, image, likes, email, subComments } =
    await req.json();
  try {
    await mongooseConnect();

    await Comment.create({
      comment,
      image,
      likes,
      email,
      subComments,
    });

    return NextResponse.json({ message: "comment saved!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An Error occur while trying to post a comment", error },
      { status: 500 }
    );
  }
}
