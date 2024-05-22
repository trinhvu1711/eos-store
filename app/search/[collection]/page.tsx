import Grid from "@/components/grid";
import PaginationControls from "@/components/layout/pagination-controls";
import ProductGridItems from "@/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getIdFromHandle, getProducts } from "@/lib/data";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.["page"] ?? "0");
  const per_page = Number(searchParams?.["per_page"] ?? "12");
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  // console.log("🚀 ~  params.collection:", params.collection);
  const categoryId = getIdFromHandle(params.collection);
  const data = await getProducts({
    keyword: "",
    categoryId: categoryId!,
    sortKey,
    reverse,
    limit: per_page,
    page: page,
  });

  return (
    <section>
      {data.products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={data.products} />
        </Grid>
      )}
      <div className="mt-4 flex justify-center">
        <PaginationControls
          hasNextPage={page < data.totalPage}
          hasPrevPage={page > 1}
          totalPage={data.totalPage}
        />
      </div>
    </section>
  );
}
