import {
  CartItem,
  Coupon,
  getSelectedVariant,
  getTotalPriceOfCartList,
  ListCart,
} from "@/lib/type";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import EditQuantityButton from "@/components/cart/edit-quantity-button";
import ClearCart from "@/components/cart/clear-cart";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Coupons from "@/components/cart/coupons";
import { GetServerSideProps } from "next";
import { getCoupons } from "@/lib/data";
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const coupons: Coupon[] = await getCoupons();
    return {
      props: {
        coupons,
      },
    };
  } catch (error) {
    return {
      props: {
        coupons: [],
      },
    };
  }
};

function CartList({ item }: { item: CartItem }) {
  const total = Number(item.totalMoney);
  const imageLink = `http://localhost:8088/api/v1/products/images/${item.product.thumbnail}`;
  const selectedVariant = getSelectedVariant(item);

  return (
    <div className="group relative flex grid-cols-4 items-center gap-x-3 rounded-md border-gray-100 py-7 hover:border-gray-600 md:grid md:px-10 lg:border">
      <div className="flex min-w-[240px] items-center  gap-x-1 lg:gap-x-5">
        <Image
          src={imageLink}
          alt={item.product.name}
          className="h-20 w-20 object-cover"
          width={80}
          height={80}
        />
        <div className="space-y-1">
          <div className="text-sm font-bold text-gray-900">
            {item.product.name}
          </div>
          <div className="text-xs text-gray-600">{selectedVariant?.name}</div>
        </div>
      </div>
      <div className="min-w-[140px] text-center text-sm md:text-base">
        {item.price!.toLocaleString("vi-VN") + " VNĐ"}
      </div>
      <div className="flex items-center justify-center">
        <div className="flex h-9 flex-row items-center rounded-sm border border-neutral-200 dark:border-neutral-700">
          <EditQuantityButton item={item} type="minus" />
          <p className="w-6 text-center">
            <span className="w-full text-sm">{item.numberOfProducts}</span>
          </p>
          <EditQuantityButton item={item} type="plus" />
        </div>
      </div>
      <div className="min-w-[140px] text-right">
        {total.toLocaleString("vi-VN") + " VNĐ"}
      </div>
    </div>
  );
}

export default function Cart({
  listCart,
  coupons,
}: {
  listCart: ListCart | undefined;
  coupons: Coupon[];
}) {
  const totalPrice = getTotalPriceOfCartList(listCart!);
  return (
    <>
      <Link href="/" className="inline-block">
        <div className="flex items-center gap-x-2 rounded-md border border-gray-400 px-4 py-2 hover:bg-gray-100">
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Trở Về</span>
        </div>
      </Link>
      <section>
        <div className="overflow-x-auto py-5 md:pb-20 md:pt-10">
          {listCart?.carts.length === 0 ? (
            <div>Giỏ Hàng Trống</div>
          ) : (
            <>
              <div className="space-y-3 overflow-x-auto">
                <div className="l:py-6 flex grid-cols-4 gap-x-3 md:grid lg:px-10">
                  <div className="min-w-[240px] text-left font-medium">
                    Sản Phẩm
                  </div>
                  <div className="min-w-[140px] text-center font-medium">
                    Đơn Giá
                  </div>
                  <div className="min-w-[110px] text-center font-medium">
                    Số Lượng
                  </div>
                  <div className="min-w-[140px] text-right font-medium">
                    Thành Tiền
                  </div>
                </div>
                {listCart?.carts.map((item, index) => (
                  <CartList key={index} item={item} />
                ))}
              </div>
              <div className="mt-3 flex justify-end">
                <ClearCart listCart={listCart!} />
              </div>
            </>
          )}
        </div>
      </section>
      <section>
        <Coupons coupons={coupons} totalAmount={totalPrice} />
      </section>
    </>
  );
}
