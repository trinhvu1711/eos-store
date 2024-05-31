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
  return Price({
    amount: price?.toLocaleString()!,
    currencyCode: currency,
  });
}

export default ProductDescriptionPrice;
