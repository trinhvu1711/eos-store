import { PageProps } from "@/lib/type";
import React from "react";

export default function Layout({ children, params }: PageProps) {
  return (
    <div className="mx-4 max-w-7xl xl:mx-auto">
      <section className="py-10">{children}</section>
    </div>
  );
}
