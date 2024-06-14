import Grid from "@/components/grid";
import PaginationControls from "@/components/layout/pagination-controls";
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
  const page = Number(searchParams?.["page"] ?? "0");
  const per_page = Number(searchParams?.["per_page"] ?? "12");

  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  // console.log("🚀 ~ searchValue:", searchValue);
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const data = await getProducts({
    keyword: searchValue,
    sortKey,
    reverse,
    limit: per_page,
    page: page,
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

      {data.totalPage > 0 ? (
        <div className="mt-4 flex justify-center">
          <PaginationControls
            hasNextPage={page < data.totalPage}
            hasPrevPage={page > 0}
            totalPage={data.totalPage}
          />
        </div>
      ) : null}
    </>
  );
}
