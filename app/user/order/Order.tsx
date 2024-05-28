"use client";

import Loading from "@/app/loading";
import {
  CheckIcon,
  InformationCircleIcon,
  TruckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Order, OrderDetail } from "@/lib/type";
import { getOrderDetailsFromToken } from "@/lib/services/order";

export default function OrderPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const filter = searchParams?.get("filter") || "pending";

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (session && session.accessToken && filter !== null) {
        setIsLoading(true);
        setError(null);
        try {
          const userDetails = await getOrderDetailsFromToken(
            session.accessToken,
            filter!,
          );
          setOrders(userDetails);
        } catch (err) {
          setError("Failed to fetch user details");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [filter, session]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Không có đơn hàng nào</div>;
  }
  if (!orders || orders.length === 0) {
    return <div>Không có đơn hàng nào</div>;
  }

  return (
    <div className="flow-root h-full max-h-[400px]">
      <ul role="list" className="-mb-8">
        {orders.map((order: Order) => (
          <li
            key={order.id}
            className="mb-6 rounded-sm border border-gray-200 p-5"
          >
            {order.orderDetails.map((item: OrderDetail) => (
              <div key={item.id} className="relative pb-8">
                <div className="relative flex gap-x-3">
                  {order.status === "pending" && (
                    <div className="flex items-center gap-x-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 ring-8 ring-white">
                        <InformationCircleIcon
                          className="h-5 w-5 text-red-600"
                          aria-hidden="true"
                        />
                      </span>
                      <p className="text-gray-600">Đang xử lý</p>
                    </div>
                  )}
                  {order.status === "shipping" && (
                    <div className="flex items-center gap-x-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 ring-8 ring-white">
                        <TruckIcon
                          className="h-5 w-5 text-amber-600"
                          aria-hidden="true"
                        />
                      </span>
                      <p className="text-gray-600">Đang Vận Chuyển</p>
                    </div>
                  )}
                  {order.status === "delivered" && (
                    <div className="flex items-center gap-x-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 ring-8 ring-white">
                        <CheckIcon
                          className="h-5 w-5 text-sky-600"
                          aria-hidden="true"
                        />
                      </span>
                      <p className="text-gray-600">Vận chuyển thành công</p>
                    </div>
                  )}
                  {order.status === "canceled" && (
                    <div className="flex items-center gap-x-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-100 ring-8 ring-white">
                        <XMarkIcon
                          className="h-5 w-5 text-lime-600"
                          aria-hidden="true"
                        />
                      </span>
                      <p className="text-gray-600">Đơn hàng hủy</p>
                    </div>
                  )}
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-500">
                        {item.product.name}{" "}
                        <Link
                          href={`/order/tracking/${order.trackingNumber}`}
                          className="font-medium text-gray-900"
                        >
                          {order.trackingNumber}
                        </Link>
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
