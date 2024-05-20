import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getProducts } from "@/lib/data";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  console.log("🚀 ~ searchValue:", searchValue);
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  // console.log("🚀 ~ reverse:", reverse);
  // console.log("🚀 ~ sortKey:", sortKey);
  const data = await getProducts({
    keyword: searchValue,
  });
  const resultsText = data.products.length > 1 ? "results" : "result";

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {data.products.length === 0
            ? "There are no products that match "
            : `Showing ${data.products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {data.products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={data.products} />
        </Grid>
      ) : null}
    </>
  );
}
