import React from "react";

export default function Composition({ children }) {
  return (
    <div className="flex  pt-36  flex-col  items-center  bg-gray-100 h-screen w-screen">
      {children}
    </div>
  );
}
