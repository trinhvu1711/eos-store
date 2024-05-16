"use client";

import {
  getSelectedVariantCurrency,
  getSelectedVariantPrice,
  Product,
  Variant,
} from "@/lib/type";
import { useSearchParams } from "next/navigation";
import Price from "../price";
function ProductDescriptionPrice({
  product,
  amount,
  currencyCode,
}: {
  product: Product;
  amount: string;
  currencyCode?: string;
}) {
  console.log("🚀 ~ amount:", amount);
  const searchParams = useSearchParams();
  const variants: Variant[] = product.variants;

  if (variants) {
    const defaultVariantId =
      variants.length === 1 ? variants[0]?.id : undefined;
    const variant = variants.find((variant: Variant) =>
      variant.options.every(
        (option) =>
          option.value === searchParams.get(option.name.toLowerCase()),
      ),
    );
    const selectVariantId = variant?.id || defaultVariantId;
    let variantPrice = getSelectedVariantPrice(product, selectVariantId!);
    console.log("🚀 ~ variantPrice:", variantPrice);
    amount = variantPrice == undefined ? amount : variantPrice?.toString()!;
    currencyCode = getSelectedVariantCurrency(product, selectVariantId!)!;
  }
  return Price({ amount: amount, currencyCode });
}

export default ProductDescriptionPrice;
