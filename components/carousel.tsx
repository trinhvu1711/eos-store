import Link from "next/link";
import GridTileImage from "./grid/tile";
import { getCategories } from "@/lib/data";
import { Category } from "@/lib/models/category";
import noImage from "@/public/images/no-img.png";
export default async function Carousel() {
  const categories = await getCategories();
  return (
    <div className="container m-auto">
      <div className="w-full overflow-x-auto pb-6 pt-1 scrollbar scrollbar-thin scrollbar-track-slate-700 scrollbar-thumb-rose-500">
        <ul className="flex gap-4 ">
          {Array.isArray(categories) &&
            categories.map((category: Category, i) => (
              <li
                key={i}
                className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
              >
                <Link
                  href={`/search/${category.name.toLowerCase().replace(/\s+/g, "-")}}`}
                  className="relative h-full w-full"
                >
                  <GridTileImage
                    alt={category.name}
                    label={{
                      title: category.name,
                      // amount: product.priceRange.maxVariantPrice.amount,
                      // currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                    }}
                    src={
                      `http://localhost:8088/api/v1/products/images/${category.imageUrl}` ||
                      noImage
                    }
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 30vw"
                  />
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
