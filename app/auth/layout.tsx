"use client";
import { PageProps } from "@/lib/type";
// import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function Layout({ children, params }: PageProps) {
  // const {  status } = useSession();

  return (
    <div className="mx-4 max-w-md py-20 md:mx-auto">
      {status == "authenticated" ? redirect("/") : children}
    </div>
  );
}

export default Layout;
