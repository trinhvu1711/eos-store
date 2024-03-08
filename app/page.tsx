
import Carousel from "@/components/carousel";
import ThreeItemGrid from "@/components/grid/three-item-grid";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <ThreeItemGrid />
      <Suspense>
        <Carousel />
        <Suspense>
          <Footer/>
        </Suspense>
      </Suspense>
    </>
  );
}
