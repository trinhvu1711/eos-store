"use client";
import Image from "next/image";
import Link from "next/link";
import ButtonToolTip from "./button-tooltip";
import ProductAddButton from "./product-add-button";
import Discount from "./discount";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import {
  getDefaultVariant,
  getMaxVariantPriceAndCurrency,
  Product,
} from "@/lib/type";

const addWistListSVG = (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.60361 7.98635C2.83627 11.8048 7.70625 14.8923 9.00046 15.6565C10.2991 14.8844 15.2042 11.7628 16.3973 7.98985C17.1807 5.55102 16.4536 2.46177 13.5645 1.53473C12.1648 1.08741 10.5321 1.35966 9.4049 2.22804C9.16927 2.40837 8.8422 2.41187 8.60481 2.23329C7.41084 1.33952 5.85111 1.07778 4.42941 1.53473C1.5447 2.4609 0.82023 5.55014 1.60361 7.98635ZM9.00138 17.0711C8.89236 17.0711 8.78421 17.0448 8.68574 16.9914C8.41055 16.8417 1.92808 13.2841 0.348132 8.3872C0.347252 8.3872 0.347252 8.38633 0.347252 8.38633C-0.644504 5.30321 0.459792 1.42874 4.02502 0.284605C5.69904 -0.254635 7.52342 -0.0174044 8.99874 0.909632C10.4283 0.00973263 12.3275 -0.238878 13.9681 0.284605C17.5368 1.43049 18.6446 5.30408 17.6538 8.38633C16.1248 13.2272 9.59485 16.8382 9.3179 16.9896C9.21943 17.0439 9.1104 17.0711 9.00138 17.0711Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.2027 6.67485C13.8625 6.67485 13.5741 6.41486 13.546 6.07171C13.4879 5.35214 13.0044 4.74462 12.3159 4.52315C11.9686 4.4111 11.7787 4.04081 11.8904 3.69678C12.0038 3.35188 12.3722 3.16454 12.7204 3.27309C13.9187 3.65914 14.7584 4.71573 14.8613 5.96491C14.8903 6.32645 14.6204 6.64334 14.2572 6.67222C14.2388 6.67398 14.2212 6.67485 14.2027 6.67485Z"
      fill="currentColor"
    />
  </svg>
);

const quickViewSVG = (
  <svg
    width="19"
    height="16"
    viewBox="0 0 19 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className=""
  >
    <path
      d="M9.49943 5.34978C8.23592 5.34978 7.20896 6.37595 7.20896 7.63732C7.20896 8.89774 8.23592 9.92296 9.49943 9.92296C10.7629 9.92296 11.7908 8.89774 11.7908 7.63732C11.7908 6.37595 10.7629 5.34978 9.49943 5.34978M9.49941 11.3456C7.45025 11.3456 5.78394 9.68213 5.78394 7.63738C5.78394 5.59169 7.45025 3.92725 9.49941 3.92725C11.5486 3.92725 13.2158 5.59169 13.2158 7.63738C13.2158 9.68213 11.5486 11.3456 9.49941 11.3456"
      fill="currentColor"
    ></path>
    <path
      d="M1.49145 7.63683C3.25846 11.5338 6.23484 13.8507 9.50001 13.8517C12.7652 13.8507 15.7416 11.5338 17.5086 7.63683C15.7416 3.7408 12.7652 1.42386 9.50001 1.42291C6.23579 1.42386 3.25846 3.7408 1.49145 7.63683V7.63683ZM9.50173 15.2742H9.49793H9.49698C5.56775 15.2714 2.03943 12.5219 0.0577129 7.91746C-0.0192376 7.73822 -0.0192376 7.53526 0.0577129 7.35601C2.03943 2.75248 5.5687 0.00306822 9.49698 0.000223018C9.49888 -0.000725381 9.49888 -0.000725381 9.49983 0.000223018C9.50173 -0.000725381 9.50173 -0.000725381 9.50268 0.000223018C13.4319 0.00306822 16.9602 2.75248 18.942 7.35601C19.0199 7.53526 19.0199 7.73822 18.942 7.91746C16.9612 12.5219 13.4319 15.2714 9.50268 15.2742H9.50173Z"
      fill="currentColor"
    ></path>
  </svg>
);

const productDetailsSVG = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
    <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
  </svg>
);

const ProductItem = ({ product }: { product: Product }) => {
  // console.log("🚀 ~ ProductItem ~ product:", product);
  const [isShowing, setIsShowing] = useState(false);

  function handleMouseEnter() {
    setIsShowing(true);
  }
  function handleMouseLeave() {
    setIsShowing(false);
  }

  const { maxPrice, currencyCode } = getMaxVariantPriceAndCurrency(product);
  const variant = getDefaultVariant(product);
  return (
    <div className="transition-3 relative mb-12 ease-in-out">
      <div
        className="w-img relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          href={`/product/${product.id}`}
          // previewlistener="true"s
        >
          <Image
            alt="product image"
            src={`http://localhost:8088/api/v1/products/images/${product.thumbnail}`}
            width="960"
            height="1125"
            decoding="async"
            data-nimg="1"
            loading="lazy"
            style={{ color: "transparent", width: "100%", height: "100%" }}
          />
        </Link>
        <Discount />
        <Transition show={isShowing} enterFrom="">
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex-column absolute right-[10px] top-10 flex flex-col flex-wrap dark:text-black">
              <ButtonToolTip
                text="Add to Wishlist"
                svg={addWistListSVG}
                productId={product.id}
                productVariantId={variant?.id}
              />
              <ButtonToolTip text="Quick view" svg={quickViewSVG} />
              <ButtonToolTip text="Product Details" svg={productDetailsSVG} />
            </div>
            <ProductAddButton product={product} />
          </Transition.Child>
        </Transition>
      </div>
      <div className="pt-3">
        <h3 className="hover:text-[#f50693]">
          <Link
            href={`/product/${product.id}`}
            // previewlistener="true"
          >
            {product.name}
          </Link>
        </h3>
        <span className="text-base font-medium">{maxPrice}</span>
      </div>
    </div>
  );
};

export default ProductItem;
