"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import OpenCart from "./open-cart";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import CloseCart from "./close-cart";

type Connection<T> = {
  edges: T[];
};

type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: number;
  };
  marchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    };
  };
};

type Cart = Omit<ShoppingCart, "lines"> & {
  lines: CartItem[];
};

type ShoppingCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: number;
    totalAmount: number;
    totalTaxAmount: number;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export default function CartModal({ cart }: { cart: Cart | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (cart?.totalQuantity !== quantityRef.current) {
      if (!isOpen) {
        setIsOpen(true);
      }

      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
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
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[390px]">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>
              <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                <ShoppingCartIcon className="h-16" />
                <p className="mt-6 text-center text-2xl font-bold">
                  Your cart is empty
                </p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
