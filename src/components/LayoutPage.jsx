import React from "react";
import Nav from "./Nav";

export default function LayoutPage({ children }) {
  return (
    <div className="flex justify-start gap-10 p-10 h-full">
      <div className="w-fit">
        <Nav />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
