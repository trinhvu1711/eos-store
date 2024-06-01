"use client";
import { OrderStatus } from "@/lib/constants";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const navbar: Array<any> = [
  {
    title: "Tổng Quan",
    slug: "/account",
    subNav: [],
  },
  {
    title: "Tài Khoản",
    slug: "account",
    subNav: [
      {
        title: "Trang Cá Nhân",
        slug: "/profile",
      },
      {
        title: "Địa Chỉ Giao Hàng",
        slug: "/address",
      },
      {
        title: "Thanh Toán",
        slug: "/payment",
      },
    ],
  },
  {
    title: "Đơn Hàng",
    slug: "order",
    subNav: [
      {
        title: "Đang xử lý",
        slug: `?filter=${OrderStatus.PENDING}`,
      },
      {
        title: "Đang Vận Chuyển",
        slug: `?filter=${OrderStatus.SHIPPING}`,
      },
      {
        title: "Vận chuyển thành công",
        slug: `?filter=${OrderStatus.DELIVERED}`,
      },
      {
        title: "Hủy Đơn",
        slug: `?filter=${OrderStatus.CANCELED}`,
      },
    ],
  },
  {
    title: "Yêu Thích",
    slug: "wishlist",
    subNav: [],
  },
];

function DropDown({ navigation }: { navigation: any }) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`group flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-gray-100 ${open ? "bg-gray-100 font-semibold" : ""}`}
          >
            <span className="group-hover:font-semibold">
              {navigation.title}
            </span>
            {open ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </Disclosure.Button>
          <Disclosure.Panel className="pl-4">
            {navigation.subNav.map((subnav: any, index: number) => (
              <div
                key={index}
                className="group relative rounded-lg p-2 before:absolute before:inset-y-0 before:-left-2 before:border-l hover:bg-gray-100 before:hover:border-black"
              >
                <Link
                  className="group-hover:font-semibold"
                  href={`/user/${navigation.slug}${subnav.slug}`}
                >
                  {subnav.title}
                </Link>
              </div>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default function MemberNavigator() {
  return (
    <div className="flex flex-col gap-y-2">
      {navbar.map((navItem, index: number) => {
        return navItem.subNav.length === 0 ? (
          <div key={index} className="group rounded-lg p-2 hover:bg-gray-100">
            <Link
              className="group-hover:font-semibold group-hover:text-gray-600"
              href={`/user/${navItem.slug}`}
            >
              {navItem.title}
            </Link>
          </div>
        ) : (
          <DropDown navigation={navItem} key={index} />
        );
      })}
    </div>
  );
}
