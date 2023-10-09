'use client'
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <div className="flex sticky h-full flex-col items-center justify-between w-[350px]">
      <nav>
        <ul className="">
          <li>Home</li>
          <li>User</li>
          <li>
            <Link href={"/login"}>Login</Link>
          </li>
          <li>
            <button onClick={() => signOut()}>Logout</button>
          </li>
        </ul>
      </nav>
      <picture className="flex justify-center items-center gap-3">
        <Image
          src={
            "https://avatars.githubusercontent.com/u/82242977?s=400&u=e571011b32f58288d171bfcbf33f75250a9fa82f&v=4"
          }
          width={150}
          height={150}
          alt=""
          className="rounded-full w-[50px]"
        />
        <h1>rudisjcg</h1>
      </picture>
    </div>
  );
}
