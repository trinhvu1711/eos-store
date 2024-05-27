"use client";

import { UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";

export default function UserDashBoardButton() {
  const { data: session, status, update } = useSession();
  const handleSignOut = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signOut();
    update();
  };
  let authContent;
  const dots = "mx-[1px] inline-block h-1 w-1 animate-blink rounded-md";
  if (status === "loading") {
    authContent = (
      <span className="mx-2 inline-flex items-center">
        <span className={clsx(dots)} />
        <span className={clsx(dots, "animation-delay [200ms]")} />
        <span className={clsx(dots, "animation-delay [400]")} />
      </span>
    ); // You can replace this with a loading spinner if desired
  } else if (session?.user) {
    authContent = (
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
          <UserIcon
            className={clsx("h-4 transition-all ease-in-out hover:scale-110")}
          />
        </Menu.Button>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1">
              <Link href="/user">
                <span className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-[#f50693] hover:text-white">
                  Tài khoản
                </span>
              </Link>

              <Link href="/order">
                <span className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-[#f50693] hover:text-white">
                  Đơn hàng
                </span>
              </Link>

              <Link href="/wishlist">
                <span className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-[#f50693] hover:text-white">
                  Yêu thích
                </span>
              </Link>

              <div>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-[#f50693] hover:text-white"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </Menu>
    );
  } else {
    authContent = (
      <Link href="/auth">
        <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
          <UserIcon
            className={clsx("h-4 transition-all ease-in-out hover:scale-110")}
          />
        </div>
      </Link>
    );
  }

  return (
    <div className="relative flex h-11 w-11 items-center justify-center">
      {authContent}
    </div>
  );
}
