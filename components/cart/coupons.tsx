"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";
import { GiftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { toast } from "sonner";

interface Coupon {
  id: number;
  code: string;
  active: boolean;
}

export default function Coupons({
  coupons,
  totalAmount,
}: {
  coupons: Coupon[];
  totalAmount: number;
}) {
  const [couponCode, setCouponCode] = useState("");
  const [discountResult, setDiscountResult] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const handleCopyCode = (code: string) => {
    setCouponCode(code);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      couponCode: couponCode,
      totalAmount: totalAmount,
    };

    try {
      const response = await fetch(
        `http://localhost:8088/api/v1/coupons/calculate?couponCode=${payload.couponCode}&totalAmount=${payload.totalAmount}`,
      );
      if (!response.ok) {
        throw new Error("Failed to calculate discount");
      }
      const data: DiscountResponse = await response.json();
      setDiscountResult(data.result);
      setDiscount(totalAmount - data.result);
      setErrorMessage(data.errorMessage);
      toast.success("Use coupon successfully");
    } catch (error: any) {
      setErrorMessage("Failed to calculate discount: " + error.message);
      setDiscountResult(null);
      toast.error("Can't use coupon");
    }
  };

  return (
    <div className="grid-cols-3 md:grid">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-end gap-y-3">
          <div className="flex w-full items-center justify-between gap-x-2">
            <input
              type="text"
              placeholder="Gán Mã Giảm Giá Tại Đây"
              className="w-full rounded-md border px-4 py-2"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <HoverCard>
              <HoverCardTrigger asChild>
                <GiftIcon className="h-6 w-6 text-purple-600 hover:cursor-pointer hover:opacity-70" />
              </HoverCardTrigger>
              <HoverCardContent>
                {coupons && coupons.length === 0 && <p>No coupons available</p>}
                {coupons &&
                  coupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      className="mb-6 flex items-center space-x-2 text-sm"
                    >
                      <span className="w-full rounded-l border border-dashed px-4 py-2 text-black">
                        {coupon.code}
                      </span>
                      <span
                        className="cursor-pointer rounded-r border border-white bg-white px-4 py-2 text-purple-600"
                        onClick={() => handleCopyCode(coupon.code)}
                      >
                        Use Code
                      </span>
                    </div>
                  ))}
              </HoverCardContent>
            </HoverCard>
          </div>

          <button
            type="submit"
            className="inline rounded-md bg-rose-600 px-6 py-3 text-gray-50 before:border-rose-600"
          >
            Sử Dụng
          </button>
        </div>

        {/* {discountResult !== null && (
          <div className="mt-4 text-green-600">
            Discount applied: {discountResult}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 text-red-600">{errorMessage}</div>
        )} */}
      </form>
      <div />
      <div className="mt-5 rounded-md border border-gray-900 p-5 md:mt-0">
        <div className="text-xl font-medium">Tổng Quan</div>
        <div className="divide-y">
          <div className="flex justify-between py-4">
            <span className="font-medium">Tạm Tính:</span>
            <span className="text-sm">
              {totalAmount.toLocaleString("vi-VN")} VNĐ
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="font-medium">Giảm Giá:</span>
            <span className="text-sm">
              - {discount?.toLocaleString("vi-VN") || 0} VNĐ
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="font-medium">Tổng:</span>
            <span className="font-medium">
              {discountResult?.toLocaleString("vi-VN") ||
                totalAmount.toLocaleString("vi-VN")}{" "}
              VNĐ
            </span>
          </div>
        </div>
        <div className="mt-3 flex justify-center">
          <Link
            href={`/cart/payment?totalAmount=${discountResult || totalAmount}`}
            className="mx-6 w-full rounded-md bg-rose-600 py-2 text-center font-medium text-gray-50"
          >
            Thanh Toán
          </Link>
        </div>
      </div>
    </div>
  );
}

interface DiscountResponse {
  result: number;
  errorMessage: string;
}
