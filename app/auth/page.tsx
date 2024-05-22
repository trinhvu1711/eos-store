"use client";
import Link from "next/link";
import { useState } from "react";
// import { signIn } from "next-auth/react";

import LoginWithGoogle from "./Google";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //   const result = await signIn("credentials", {
      //     email,
      //     password,
      //     redirect: true,
      //     callbackUrl: "/",
      //   });
      //   console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="text-center text-4xl font-medium">Đăng Nhập</div>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-1 ">
          <label htmlFor="email" className="text-lg font-medium">
            Email
          </label>
          <div className="flex">
            <div className="flex items-center justify-center rounded-l-md border border-gray-600 bg-gray-100 ">
              <UserIcon className="h-4 w-4 px-4 text-gray-600" />
            </div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              id="email"
              placeholder="Nhập email tại đây"
              className="w-full rounded-r-md border border-l-0 border-gray-600 py-2 pl-2 pr-4 duration-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-1 ">
          <label htmlFor="password" className="text-lg font-medium">
            Mật Khẩu
          </label>
          <div className="flex">
            <div className="flex items-center justify-center rounded-l-md border border-gray-600 bg-gray-100 ">
              <LockClosedIcon className="h-4 w-4 px-4 text-gray-600" />
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              name="password"
              id="password"
              placeholder="Nhập mật khẩu tại đây"
              className="w-full rounded-r-md border border-l-0 border-gray-600 py-2 pl-2 pr-4 duration-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <button
            type="submit"
            className="rounded-md bg-rose-600 px-4 py-2 text-gray-50 duration-500 hover:bg-rose-700"
          >
            Đăng Nhập
          </button>
          <Link
            href={"/forget"}
            className="text-sm font-medium text-rose-600 hover:underline"
          >
            Quên Mật Khâu?
          </Link>
        </div>
        <div className="mt-4 text-center text-sm text-gray-600">
          <span>Chưa có tài khoản?</span>
          <Link
            href={"/auth/register"}
            className="ml-2 text-gray-900 duration-700 hover:underline"
          >
            {" "}
            Đăng ký ngay
          </Link>
        </div>
        <div className=" relative flex items-center justify-center before:absolute before:inset-x-0 before:top-1/2 before:-z-10 before:h-[1px] before:-translate-y-1/2 before:bg-black before:content-['']">
          <span className="bg-white px-2 font-bold">Hoặc</span>
        </div>
        <div>
          <LoginWithGoogle />
        </div>
      </form>
    </>
  );
}

export default Page;
