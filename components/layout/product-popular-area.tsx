import { getProducts } from "@/lib/data";
import TabProduct from "../product/tab-product";

export default async function ProductPopularArea() {
  const products = (
    await getProducts({ page: 0, limit: 12, keyword: "", categoryId: 0 })
  ).products;
  return (
    <div className="container mx-auto mt-24">
      <TabProduct products={products} />
    </div>
  );
}
