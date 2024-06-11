"use client";

import { getDefaultVariant, Product, Variant } from "@/lib/type";
import { useSearchParams } from "next/navigation";
import Price from "../price";
function ProductDescriptionPrice({ product }: { product: Product }) {
  // console.log("🚀 ~ amount:", amount);
  const searchParams = useSearchParams();
  const variants: Variant[] = product.variants;

  if (!variants) return null;
  // const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: Variant) =>
    variant.options.every(
      (option) => option.value === searchParams?.get(option.name.toLowerCase()),
    ),
  );
  // console.log("🚀 ~ variant:", variant);

  const defautVariant = getDefaultVariant(product);
  // const selectVariantId = variant?.id || defaultVariantId;
  const price = variant?.price || defautVariant?.price;
  const currency = variant?.currency || defautVariant?.currency;
  const discountPrice = price! + variant?.discount! * price!;
  return (
    <div className="text-2xl">
      {product.variants ? (
        <div className="flex items-center gap-x-2">
          {price!.toLocaleString() + currency}
          <span className="text-sm text-gray-600 line-through">
            {discountPrice!.toLocaleString()} VNĐ
          </span>
        </div>
      ) : (
        price!.toLocaleString() + " VNĐ"
      )}
    </div>
  );
}

export default ProductDescriptionPrice;
