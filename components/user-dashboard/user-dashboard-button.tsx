import { UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

export default function UserDashBoardButton() {
  return (
    <Link href="/user-dashboard">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
        <UserIcon
          className={clsx("h-4 transition-all ease-in-out hover:scale-110 ")}
        />
      </div>
    </Link>
  );
}
