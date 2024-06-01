"use client";

import Link from "next/link";
import Image from "next/image";
import { mutate } from "swr";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "@/app/[locale]/loading";
import { getSelectedVariant, WishList } from "@/lib/type";
import {
  getWishlistDetailsFromToken,
  removeWishList,
} from "@/lib/services/wishlist";

function CartList({
  item,
  onRemove,
}: {
  item: any;
  onRemove: (id: number) => void;
}) {
  const imageLink = `http://localhost:8088/api/v1/products/images/${item.product.thumbnail}`;
  const selectedVariant = getSelectedVariant(item);
  return (
    <div className="group relative flex grid-cols-4 items-center gap-x-1 overflow-x-auto rounded-md border border-gray-100 px-2 py-1 md:grid md:px-10 md:py-7">
      <div className="flex min-w-[80px] items-center gap-x-5">
        <Image
          src={imageLink}
          alt={item?.product?.name}
          className="h-full w-full max-w-[80px] object-cover"
          width={80}
          height={80}
        />
      </div>
      <div className="min-w-[220px] text-gray-900">
        {item?.product?.name}
        <div className="text-sm text-gray-600">{selectedVariant?.name}</div>
      </div>
      <div className="min-w-[100px] text-center text-sm md:text-base">
        <div>{selectedVariant?.price.toLocaleString()} VNĐ </div>
        {selectedVariant?.availableForSale ? (
          <div className="text-xs text-lime-600 md:text-sm">Còn Hàng</div>
        ) : (
          <div className="text-xs text-red-600 md:text-sm">Hết Hàng</div>
        )}
      </div>

      <Link
        href={`/product/${item?.product.id}`}
        className="min-w-[100px] text-right text-sm text-gray-600 hover:text-gray-900 md:text-base"
      >
        Xem sản phẩm
      </Link>
      <button
        onClick={async () => {
          await removeWishList(item.id);
          onRemove(item.id);
        }}
        className="absolute right-3 top-2 hidden group-hover:inline"
      >
        <XMarkIcon className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  );
}

export default function Wishlist() {
  const { data: session } = useSession();
  const [wishList, setWishList] = useState<WishList[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishList = async () => {
      if (session && session.accessToken) {
        try {
          const wishList = await getWishlistDetailsFromToken(
            session.accessToken,
          );
          setWishList(wishList);
        } catch (err) {
          setError("Failed to fetch user details");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchWishList();
  }, [session]);

  const handleRemove = (id: number) => {
    setWishList(
      (prevWishList) => prevWishList?.filter((item) => item.id !== id) || null,
    );
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Lỗi Khổng Thể Tải Trang</div>;
  }
  if (!wishList || wishList.length === 0) {
    return <div>Danh sách yêu thích Trống</div>;
  }
  return (
    <section>
      <div className="space-y-3">
        <div className="flex grid-cols-4 overflow-x-auto px-2 py-1 md:grid md:px-10 md:py-6">
          <div className="min-w-[80px] text-left font-medium">Sản Phẩm</div>
          <div className="min-w-[220px] font-medium">Tên </div>
          <div className="min-w-[80px] text-center font-medium">Trạng Thái</div>
          <div className="min-w-[100px] text-right font-medium"></div>
        </div>
        {wishList?.map((item: any, index: number) => (
          <CartList key={index} item={item} onRemove={handleRemove} />
        ))}
      </div>
    </section>
  );
}
