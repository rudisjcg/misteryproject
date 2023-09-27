import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import Comment from "@/models/comment";

export async function POST(req) {
  const { comment, image, likes, session, subComments } = await req.json();

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
