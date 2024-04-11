import Carousel from "@/components/carousel";
import ThreeItemGrid from "@/components/grid/three-item-grid";
import CTA from "@/components/layout/cta";
import FeaturesArea from "@/components/layout/features-area";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <ThreeItemGrid />
      <Suspense>
        <Carousel />
        <Suspense>
          <FeaturesArea />
          <CTA />
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
