import { getProducts } from "@/lib/data";
import TabProduct from "../product/tab-product";

export default async function ProductPopularArea() {
  const { products } = await getProducts(0, 12);
  return (
    <div className="container mx-auto mt-24">
      <TabProduct products={products} />
    </div>
  );
}
