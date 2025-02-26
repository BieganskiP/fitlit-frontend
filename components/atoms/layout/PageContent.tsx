import React from "react";

export default function PageContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 flex flex-col gap-4 w-full max-w-[1600px] mx-auto">
      {children}
    </div>
  );
}
