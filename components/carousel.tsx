import Link from "next/link";
import GridTileImage from "./grid/tile";
import { getCategories } from "@/lib/data";
import noImage from "@/public/images/no-img.png";
import { Category } from "@/lib/type";
import { collections } from "@/lib/data";

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
                  href={`/search/${category.slug}`}
                  className="relative h-full w-full"
                >
                  <GridTileImage
                    alt={category.name}
                    label={{
                      title: category.name,
                      amount: "",
                      currencyCode: "",
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
