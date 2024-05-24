"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export default function UserDashboard() {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <div className="flex gap-5 bg-gradient-to-b from-cyan-50 to-cyan-200 p-2 ">
      <div className="ml-auto flex gap-2">
        {session?.user ? (
          <>
            <p className="text-sky-600"> {session.user.fullName}</p>
            <button className="text-red-500" onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        ) : (
          <button className="text-green-600" onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
