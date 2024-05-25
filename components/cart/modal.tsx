"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import OpenCart from "./open-cart";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import CloseCart from "./close-cart";
import Link from "next/link";
import DeleteItemButton from "./delete-item-button";
import Image from "next/image";

import Price from "../price";
import EditQuantityButton from "./edit-quantity-button";
import { DEFAULT_OPTION } from "@/lib/constants";
import { CartItem, getSelectedVariant, ListCart } from "@/lib/type";
export const dynamic = "force-dynamic";

function getTotalQuantityOfCartList(cartList: ListCart): number {
  return cartList?.carts.reduce(
    (total, cartItem) => total + cartItem.numberOfProducts,
    0,
  );
}
export default function CartModal({
  listCart,
}: {
  listCart: ListCart | undefined;
}) {
  // console.log("🚀 ~ listCart:", listCart?.carts);
  // { cart }: { cart: Cart | undefined }
  let totalQuantity = getTotalQuantityOfCartList(listCart!)! || 0;
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const subtotals = listCart?.carts.map(
    (cart) => cart.price * cart.numberOfProducts,
  );
  const totalPrice = subtotals?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  const { maxPrice, currencyCode } = { maxPrice: 0, currencyCode: "USD" };
  useEffect(() => {
    if (getTotalQuantityOfCartList(listCart!) !== quantityRef.current) {
      if (!isOpen) {
        setIsOpen(true);
      }

      quantityRef.current = getTotalQuantityOfCartList(listCart!);
    }
  }, [isOpen, listCart]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={getTotalQuantityOfCartList(listCart!)} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveTo="translate-x-full"
          >
            {/* Start cart panel */}
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[390px]">
              {/* Start close button */}
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>
              {/* End close button */}

              {/* Start Display listCart?.carts  */}
              {!listCart?.carts || listCart?.carts.length === 0 ? (
                // Cart is Empty
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    Your cart is empty
                  </p>
                </div>
              ) : (
                // Display all cart item
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {listCart?.carts.map((item: CartItem, i: number) => {
                      const selectedVariant = getSelectedVariant(item);
                      // console.log(
                      //   "🚀 ~ {listCart?.carts.map ~ selectedVariant:",
                      //   selectedVariant,
                      // );
                      return (
                        // Start cart item
                        <li
                          key={i}
                          className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                        >
                          {/* Delete cart item button */}
                          <div className="relative flex w-full flex-row justify-between px-1 py-4">
                            <div className="absolute z-40 -mt-2 ml-[55px]">
                              <DeleteItemButton item={item} />
                            </div>

                            {/* Start each cart item*/}
                            <Link
                              href="#"
                              onClick={closeCart}
                              className="z-30 flex flex-row space-x-4"
                            >
                              {/* Cart item image */}
                              <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-800">
                                <Image
                                  className="h-full w-full object-cover"
                                  width={64}
                                  height={64}
                                  alt="image"
                                  src={`http://localhost:8088/api/v1/products/images/${item.product.thumbnail}`}
                                />
                              </div>

                              {/* Cart item info */}
                              <div className="flex flex-1 flex-col text-base">
                                <span className="leading-tight">
                                  {item.product.name}
                                </span>
                                {selectedVariant?.name !== DEFAULT_OPTION ? (
                                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    {selectedVariant?.name}
                                  </p>
                                ) : null}
                              </div>
                            </Link>

                            {/* Cart item price */}
                            <div className="flex h-16 flex-col justify-between">
                              <Price
                                className="flex justify-end space-y-2 text-right text-sm"
                                amount={item.price.toString()}
                                currencyCode={currencyCode}
                              />
                              {/* Edit cart item quantity */}
                              <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                <EditQuantityButton item={item} type="minus" />
                                <p className="w-6 text-center">
                                  <span className="w-full text-sm">
                                    {item.numberOfProducts}
                                  </span>
                                </p>
                                <EditQuantityButton item={item} type="plus" />
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {/*Start Checkout info */}
                  <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    {/* Tax */}
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                      <p>Taxes</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount="0"
                        currencyCode={currencyCode}
                      />
                    </div>

                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>Shipping</p>
                      <p className="text-right">Calculated at checkout</p>
                    </div>

                    {/* Total */}
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                      <p>Total</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={totalPrice!.toString()}
                        currencyCode={currencyCode}
                      />
                    </div>
                  </div>
                  {/* End Checkout info */}

                  {/* Start Cart button */}
                  <a
                    href="/cart"
                    className="mb-2 block w-full rounded-md border p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                  >
                    Proceed to Cart
                  </a>
                  {/* End Cart button */}

                  {/* Start Checkout button */}
                  <a
                    href="/cart/payment"
                    className="block w-full rounded-md bg-blue-500 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                  >
                    Proceed to Checkout
                  </a>
                  {/* End Checkout button */}
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
