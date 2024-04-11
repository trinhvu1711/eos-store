import ProductItem from "@/components/product/product-item";

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <ProductItem />
    </div>
  );
}
