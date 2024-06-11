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
  getDefaultVariant,
} from "@/lib/type";
import { Suspense } from "react";
import ProductDescriptionPrice from "./product-description-price";
import { TruckIcon } from "lucide-react";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ProductDescription({ product }: { product: Product }) {
  const variants: Variant[] = product.variants;
  const options: Option[] = getOptionsFromVariants(variants);

  const variant = getDefaultVariant(product);
  const maxPrice = variant?.price;
  const currencyCode = variant?.currency;
  // console.log("🚀 ~ ProductDescription ~ maxPrice:", maxPrice);

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>

        <ProductDescriptionPrice product={product} />
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
        <AddToCart
          variants={product.variants}
          availableForSale={true}
          id={product.id}
        />
      </Suspense>

      <div className="mt-10 divide-y-2 divide-gray-400 rounded-md border-2 border-gray-400 xl:mt-4">
        <div className="flex items-center gap-x-4 p-3">
          <div>
            <TruckIcon className="h-10 w-10" />
          </div>
          <div>
            <div className="font-medium">Miễn Phí vận chuyển</div>
            <div className="text-xs font-medium">
              Cho đơn hàng trên 1,000,000 VNĐ
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-4 p-3">
          <div>
            <CheckBadgeIcon className="h-10 w-10" />
          </div>
          <div>
            <div className="font-medium">Miễn Phí trả đổi</div>
            <div className="text-xs font-medium">
              Hoàn tiền sau 30 ngày{" "}
              <Link href={"/about"} className="font-normal underline">
                Thông Tin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
