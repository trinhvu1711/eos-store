"use client";

import { deleteCartsInList, deleteListCart } from "@/lib/services/cart";
import { ListCart } from "@/lib/type";
import { useFormState } from "react-dom";

export default function ClearCart({ listCart }: { listCart: ListCart }) {
  const [message, formAction] = useFormState(deleteCartsInList, null);
  const actionWithVariant = formAction.bind(null, listCart);
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
