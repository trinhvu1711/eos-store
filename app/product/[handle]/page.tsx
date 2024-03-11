import Footer from "@/components/layout/footer";
import ProductDescription from "@/components/product/product-description";
import { sampleProduct } from "@/lib/type";
import React, { Suspense } from "react";

export default function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const product = sampleProduct;
  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <div>Gallery</div>
          </div>
          <div className="basis-full lg:basis-2/6">
            <ProductDescription product={product} />
          </div>
        </div>
        <Suspense>
          <div>RelativeProduct</div>
        </Suspense>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
