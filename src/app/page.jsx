"use client";
import LayoutPage from "@/components/LayoutPage";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <LayoutPage>
      <Image src={session.user.image} width={100} height={100} alt="" />
    </LayoutPage>
  );
}
