import { Suspense } from "react";
import Wishlist from "./Wishlist";
export const metadata = {
  title: "Sản Phẩm Yêu Thích",
};
export default function Page() {
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <Wishlist />
    </Suspense>
  );
}
