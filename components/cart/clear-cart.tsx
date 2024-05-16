"use client";

import { deleteListCart } from "@/lib/services/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormState } from "react-dom";

export default function ClearCart({ listCartId }: { listCartId: number }) {
  const [message, formAction] = useFormState(deleteListCart, null);
  const actionWithVariant = formAction.bind(null, listCartId);
  // console.log("🚀 ~ ClearCart ~ listCartId:", listCartId);
  return (
    <form action={actionWithVariant}>
      <button
        type="submit"
        className="inline rounded-md bg-rose-600 px-6 py-3 text-gray-50 before:border-rose-600"
      >
        Xóa Hết
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
