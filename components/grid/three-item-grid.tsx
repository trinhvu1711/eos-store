import Link from "next/link";
import GridTileImage from "./tile";
import { getProduct, getProducts } from "@/lib/data";
import { getMaxVariantPriceAndCurrency, Product } from "@/lib/type";

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product;
  size: "full" | "half";
  priority?: boolean;
}) {
  let { maxPrice, currencyCode } = getMaxVariantPriceAndCurrency(item);

  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.id}`}
      >
        <GridTileImage
          src={`http://localhost:8088/api/v1/products/images/${item.thumbnail}`}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.name as string,
            amount: maxPrice,
            currencyCode: currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export default async function ThreeItemGrid() {
  // const { products } = await getProducts(0, 3);
  // console.log("🚀 ~ ThreeItemGrid ~ products:", products);

  // if (!products || products.length < 3) return null;
  // const [firstProduct, secondProduct, thirdProduct] = products;
  const firstProduct = await getProduct(1);
  const secondProduct = await getProduct(2);
  const thirdProduct = await getProduct(3);

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
