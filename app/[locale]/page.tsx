import Carousel from "@/components/carousel";
import ThreeItemGrid from "@/components/grid/three-item-grid";
import Banner from "@/components/layout/banner";
import CTA from "@/components/layout/cta";
import FeaturesArea from "@/components/layout/features-area";
import Footer from "@/components/layout/footer";
import ProductPopularArea from "@/components/layout/product-popular-area";
import { Suspense } from "react";
export default function Home() {
  return (
    <>
      <ThreeItemGrid />
      <Suspense>
        <Carousel />
        <Suspense>
          <ProductPopularArea />
          {/* <Test /> */}
          <Banner />
          <FeaturesArea />
          <CTA />
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
