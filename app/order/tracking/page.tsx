"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (inputValue) {
      router.push(`/order/tracking/${encodeURIComponent(inputValue)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-white p-6">
      <div className="flex flex-col items-center">
        <h2 className="mb-4 text-xl font-semibold">Mã phiếu gửi</h2>
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="VD : 12354,45677"
            className="mb-4 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="w-full rounded-md bg-red-500 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            TRA CỨU
          </button>
        </form>
      </div>
      <div className="mt-6">
        <Image
          src="/images/delivery-image.png"
          alt="Delivery"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
