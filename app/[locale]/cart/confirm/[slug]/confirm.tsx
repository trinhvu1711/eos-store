"use client";

import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

export default function Confirm(props: any) {
  return (
    <>
      <p className="text-center text-3xl"> Cảm ơn bạn đã đặt hàng </p>
      <p className="mt-3 text-center text-gray-600">
        Mã theo dõi đơn hàng của bạn
      </p>
      <div
        className="group relative mx-auto mt-3 max-w-xs cursor-pointer rounded-md bg-rose-100 py-4 text-center text-rose-600"
        onClick={() => {
          navigator.clipboard.writeText(props.slug);
        }}
      >
        {props.slug}
        <DocumentDuplicateIcon className="absolute right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 group-hover:inline" />
      </div>
    </>
  );
}
