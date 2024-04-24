import GridTileImage from "@/components/grid/tile";
import Footer from "@/components/layout/footer";
import Gallery from "@/components/product/gallery";
import ProductDescription from "@/components/product/product-description";
import { getProduct } from "@/lib/data";
import { ProductImage } from "@/lib/models/product";
import { Image, products, sampleProduct } from "@/lib/type";
import Link from "next/link";
import React, { Suspense } from "react";

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const product = await getProduct(1);
  if (!product) {
    // handle the case when product is undefined
    console.error("Product not found");
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Gallery
              images={product.productImage.map(
                (image: ProductImage, index: number) => ({
                  key: image.id || index,
                  src: `http://localhost:8088/api/v1/products/images/${image.image_url}`,
                  altText: image.image_url,
                }),
              )}
            />
          </div>
          <div className="basis-full lg:basis-2/6">
            <ProductDescription product={product} />
          </div>
        </div>
        <Suspense>
          <RelatedProducts id={product.id} />
        </Suspense>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = products;
  if (!relatedProducts.length) return null;
  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold ">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.handle}`}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  // amount: product.priceRange.maxVariantPrice.amount,
                  // currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width:640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
