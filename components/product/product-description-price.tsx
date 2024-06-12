"use client";

import { getDefaultVariant, Product, Variant } from "@/lib/type";
import { useSearchParams } from "next/navigation";
function ProductDescriptionPrice({ product }: { product: Product }) {
  const searchParams = useSearchParams();
  const variants: Variant[] = product.variants;

  if (!variants) return null;

  const variant = variants.find((variant: Variant) =>
    variant.options.every(
      (option) => option.value === searchParams?.get(option.name.toLowerCase()),
    ),
  );

  const defaultVariant = getDefaultVariant(product);
  const price = variant?.price || defaultVariant?.price;
  const currency = variant?.currency || defaultVariant?.currency;
  const discount = (variant?.discount || defaultVariant?.discount)! * price!;
  const discountPrice = price! + discount;

  return (
    <div className="text-2xl">
      {product.variants ? (
        <div className="flex items-center gap-x-2">
          {price!.toLocaleString("vi-VN") + " " + currency}
          {discount > 0 && (
            <span className="text-sm text-gray-600 line-through">
              {discountPrice!.toLocaleString("vi-VN") + " " + currency}
            </span>
          )}
        </div>
      ) : (
        price!.toLocaleString("vi-VN") + " " + { currency }
      )}
    </div>
  );
}

export default ProductDescriptionPrice;
