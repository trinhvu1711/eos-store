import {
  CartItem,
  getSelectedVariant,
  getTotalPriceOfCartList,
  ListCart,
} from "@/lib/type";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import EditQuantityButton from "@/components/cart/edit-quantity-button";
import ClearCart from "@/components/cart/clear-cart";

function CartList({ item }: { item: CartItem }) {
  // add discount
  const total = item.totalMoney;
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
        {/* {item.product.discount
          ? item.product.discount.toLocaleString()
          : item.product.price.toLocaleString()}{" "}
        VNĐ{" "} */}
        {item.price.toLocaleString()} VNĐ
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
        {total.toLocaleString()} VNĐ
      </div>
    </div>
  );
}

export default function Cart({ listCart }: { listCart: ListCart | undefined }) {
  const totalPrice = getTotalPriceOfCartList(listCart!);
  return (
    <>
      <Link href="/" className="inline-block">
        <div className="flex items-center gap-x-2 rounded-md border border-gray-400 px-4 py-2 hover:bg-gray-100">
          <FontAwesomeIcon icon={"arrow-left-long"} className="h-4 w-4" />
          <span>Trở Về</span>
        </div>
      </Link>
      <section>
        <div className="overflow-x-auto py-5 md:pb-20 md:pt-10">
          {listCart?.carts.length == 0 ? (
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
                <ClearCart listCartId={listCart?.id!} />
              </div>
            </>
          )}
        </div>
      </section>
      <section>
        <div className="grid-cols-3 md:grid">
          <form action="">
            <div className="flex flex-col items-end gap-y-3">
              <input
                type="text"
                placeholder="Gán Mã Giảm Giá Tại Đây"
                className="w-full rounded-md border px-4 py-2"
              />
              <button
                type="submit"
                className="inline rounded-md bg-rose-600 px-6 py-3 text-gray-50 before:border-rose-600"
              >
                Sử Dụng
              </button>
            </div>
          </form>
          <div />
          <div className="mt-5 rounded-md border border-gray-900 p-5 md:mt-0">
            <div className="text-xl font-medium">Tổng Quan</div>
            <div className="divide-y">
              <div className="flex justify-between py-4">
                <span className="font-medium">Tạm Tính:</span>
                <span className="text-sm">
                  {totalPrice.toLocaleString()} VNĐ
                </span>
              </div>
              <div className="flex justify-between py-4">
                <span className="font-medium">Giảm Giá:</span>
                <span className="text-sm">- 0 VNĐ</span>
              </div>
              <div className="flex justify-between py-4">
                <span className="font-medium">Tổng:</span>
                <span className="font-medium">
                  {totalPrice.toLocaleString()} VNĐ
                </span>
              </div>
            </div>
            <div className="mt-3 flex justify-center">
              <Link
                href={"/cart/payment"}
                className="mx-6 w-full rounded-md bg-rose-600 py-2 text-center font-medium text-gray-50"
              >
                Thanh Toán
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
