import { getMaxVariantPriceAndCurrency, Product } from "@/lib/type";
import Link from "next/link";
import Grid from "../grid";
import GridTileImage from "../grid/tile";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => {
        const { maxPrice, currencyCode } =
          getMaxVariantPriceAndCurrency(product);
        const imageLink = `http://localhost:8088/api/v1/products/images/${product.thumbnail}`;
        return (
          <Grid.Item key={product.id} className="animate-fadeIn">
            <Link
              className="relative inline-block h-full w-full"
              href={`/product/${product.id}`}
            >
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                  amount: maxPrice,
                  currencyCode: currencyCode,
                }}
                src={imageLink}
                fill
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </Link>
          </Grid.Item>
        );
      })}
    </>
  );
}
