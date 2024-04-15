import ProductItem from "@/components/product/product-item";
import { getProducts } from "@/lib/data";
import { Product } from "@/lib/models/product";
import { GetServerSideProps } from "next";

export default async function Test() {
  const { totalPage, products } = await getProducts(0, 12);
  return (
    <div>
      <h1>test server rendering</h1>
      {products.map((product) => (
        <ProductItem key={product.name} product={product} />
      ))}
    </div>
  );
}
