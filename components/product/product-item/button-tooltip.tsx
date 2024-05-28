"use client";
import { addWishList } from "@/lib/services/wishlist";
import { useSession } from "next-auth/react";
import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
interface ButtonToolTipProps {
  svg: JSX.Element;
  text: string;
  productId?: number;
  productVariantId?: number;
}

const ButtonToolTip: React.FC<ButtonToolTipProps> = ({
  svg,
  text,
  productId,
  productVariantId,
}) => {
  const { data: session } = useSession();

  const handleClick = async () => {
    if (text === "Add to Wishlist" && productId) {
      const token = session?.accessToken;
      if (!token) {
        console.error("No token found");
        return;
      }

      const wishListData = {
        user_id: session.user.id,
        product_id: productId!,
        id_product_variant: productVariantId!,
      };

      try {
        await addWishList(token, wishListData);
        console.log("Item added to wishlist successfully");
      } catch (error) {
        console.error("Error adding item to wishlist:", error);
      }
    }
  };

  return (
    <>
      <button
        data-tooltip-id="my-tooltip"
        data-tooltip-content={text}
        data-tooltip-place="left"
        type="button"
        className="button-tooltip relative mb-[6px] flex h-[38px] w-[38px] items-center justify-center rounded-sm p-2 shadow-md hover:bg-[#f50963] hover:text-white focus:outline-none"
        onClick={handleClick}
      >
        {svg}
      </button>
      <Tooltip
        className="transition delay-1000 ease-in-out"
        id="my-tooltip"
        style={{
          fontSize: "12px",
          padding: "4px 8px",
          lineHeight: "1",
          fontWeight: "500",
        }}
      />
    </>
  );
};
export default ButtonToolTip;
