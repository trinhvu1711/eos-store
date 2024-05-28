"use client";

import { useSession, getSession, GetSessionParams } from "next-auth/react";

export default function ProtectedPage() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Access Denied</p>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {session?.user?.email}!</p>
      {/* <p>Your token: {session?.}</p> */}
    </div>
  );
}
