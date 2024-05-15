import Price from "../price";
import VariantSelector from "./variant-selector";
import Prose from "../prose";
import AddToCart from "../cart/add-to-cart";
import {
  getMaxVariantPriceAndCurrency,
  getOptionsFromVariants,
  Product,
  Variant,
  Option,
} from "@/lib/type";
import { Suspense } from "react";

export default function ProductDescription({ product }: { product: Product }) {
  const variants: Variant[] = product.variants;
  const options: Option[] = getOptionsFromVariants(variants);

  const { maxPrice, currencyCode } = getMaxVariantPriceAndCurrency(product);
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price amount={maxPrice} currencyCode={currencyCode} />
        </div>
      </div>
      <Suspense fallback={null}>
        <VariantSelector
          options={options}
          variants={variants}
          productId={product.id}
        />
      </Suspense>

      {product.description ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.description}
        />
      ) : null}
      <Suspense fallback={null}>
        <AddToCart variants={product.variants} availableForSale={true} />
      </Suspense>
    </>
  );
}
