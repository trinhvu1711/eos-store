
import Carousel from "@/components/carousel";
import ThreeItemGrid from "@/components/grid/three-item-grid";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <ThreeItemGrid />
      <Suspense>
        <Carousel />
      </Suspense>
    </>
  );
}
