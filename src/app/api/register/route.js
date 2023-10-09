import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/user";

export async function POST(req) {
  try {
    const { name, email, password, verified, role, image } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    await mongooseConnect();
    await User.create({
      name,
      email,
      password: hashedPassword,
      verified,
      role,
      image,
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user.", error },
      { status: 500 }
    );
  }
}
