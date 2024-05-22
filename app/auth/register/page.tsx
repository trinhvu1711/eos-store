"use client";
import { State } from "country-state-city";
import Link from "next/link";
import { useState } from "react";
import {
  AtSymbolIcon,
  LockClosedIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const cities = State.getStatesOfCountry("VN");

function Page() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //   const response = await axios.post("/api/user", formData);
      //   if (response) {
      //     const email = formData.email;
      //     const password = formData.password;
      // await signIn("credentials", {
      //   email,
      //   password,
      //   redirect: true,
      //   callbackUrl: "/",
      // });
      //   }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="text-center text-4xl font-medium">Đăng Ký</div>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-1 ">
          <label htmlFor="email" className="text-lg font-medium capitalize">
            Email
          </label>
          <div className="flex">
            <div className="flex items-center justify-center rounded-l-md border border-gray-600 bg-gray-100 ">
              <AtSymbolIcon className="h-4 w-4 px-4 text-gray-600" />
            </div>
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
              type="email"
              name="email"
              id="email"
              placeholder="Nhập email..."
              className="w-full rounded-r-md border border-l-0 border-gray-600 py-2 pl-2 pr-4 duration-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-1 ">
          <label htmlFor="name" className="text-lg font-medium capitalize">
            Tên
          </label>
          <div className="flex">
            <div className="flex items-center justify-center rounded-l-md border border-gray-600 bg-gray-100 ">
              <AtSymbolIcon className="h-4 w-4 px-4 text-gray-600" />
            </div>
            <input
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
              type="text"
              name="name"
              id="name"
              placeholder="Nhập họ và tên..."
              className="w-full rounded-r-md border border-l-0 border-gray-600 py-2 pl-2 pr-4 duration-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-1 ">
          <label htmlFor="address" className="text-lg font-medium capitalize">
            Địa Chỉ
          </label>
          <div className="flex">
            <div className="flex items-center justify-center rounded-l-md border border-gray-600 bg-gray-100 ">
              <MapPinIcon className="h-4 w-4 px-4 text-gray-600" />
            </div>
            <select
              name="address"
              id="address"
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full rounded-r-md border border-l-0 border-gray-600 py-2 pl-2 pr-4 duration-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0"
            >
              {cities.map((city) => {
                return (
                  <option value={city.name} key={city.isoCode}>
                    {city.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-y-1 ">
          <label htmlFor="password" className="text-lg font-medium capitalize">
            Mật Khẩu
          </label>
          <div className="flex">
            <div className="flex items-center justify-center rounded-l-md border border-gray-600 bg-gray-100 ">
              <LockClosedIcon className="h-4 w-4 px-4 text-gray-600" />
            </div>
            <input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
              type="password"
              name="password"
              id="password"
              placeholder="Nhập mật khẩu tại đây"
              className="w-full rounded-r-md border border-l-0 border-gray-600 py-2 pl-2 pr-4 duration-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-1 ">
          <label
            htmlFor="re-password"
            className="text-lg font-medium capitalize"
          >
            Nhập lại mật khẩu
          </label>
          <div className="flex">
            <div className="flex items-center justify-center rounded-l-md border border-gray-600 bg-gray-100 ">
              <LockClosedIcon className="h-4 w-4 px-4 text-gray-600" />
            </div>
            <input
              type="password"
              name="re-password"
              id="re-password"
              placeholder="Nhập lại mật khẩu"
              className="w-full rounded-r-md border border-l-0 border-gray-600 py-2 pl-2 pr-4 duration-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        <div className="!mt-5">
          <button
            type="submit"
            className="w-full rounded-md bg-rose-600 px-4 py-2 text-gray-50 duration-500 hover:bg-rose-700"
          >
            Đăng Ký
          </button>
        </div>
        {/* <div className="!mt-5">
                    <LoginWithGoogle/>
                </div> */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <span>Đã có tài khoản</span>
          <Link
            href={"/auth"}
            className="ml-2 text-gray-900 duration-700 hover:underline"
          >
            {" "}
            Đăng nhập thôi
          </Link>
        </div>
      </form>
    </>
  );
}

export default Page;
