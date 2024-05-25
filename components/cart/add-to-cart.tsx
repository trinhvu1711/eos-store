"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import LoadingDots from "../loading-dots";
import { addItem } from "@/lib/services/cart";
import { useSearchParams } from "next/navigation";
import { Variant } from "@/lib/type";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  onClick,
  pending,
}: {
  availableForSale: boolean;
  selectedVariantId: number | undefined;
  onClick: () => void;
  pending: boolean;
}) {
  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        aria-disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Add to cart"
      aria-disabled={pending}
      className={clsx(buttonClasses, {
        "hover:opacity-90": !pending,
        [disabledClasses]: pending,
      })}
    >
      <div className="absolute left-0 ml-4">
        {pending ? (
          <LoadingDots className="mb-3 bg-white" />
        ) : (
          <PlusIcon className="h-5" />
        )}
      </div>
      Add To Cart
    </button>
  );
}

export default function AddToCart({
  variants,
  availableForSale,
}: {
  variants: Variant[];
  availableForSale: boolean;
}) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  if (!variants) return null;
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: Variant) =>
    variant.options.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );
  const selectVariantId = variant?.id || defaultVariantId;

  const handleAddToCart = async () => {
    setPending(true);
    const resultMessage = await addItem({
      productId: Number(productId),
      variantId: Number(selectVariantId),
      quantity: 1,
      price: variant?.price ?? 0,
    });
    setMessage(resultMessage);
    // console.log("🚀 ~ handleAddToCart ~ resultMessage:", resultMessage);
    setPending(false);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectVariantId}
        onClick={handleAddToCart}
        pending={pending}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
