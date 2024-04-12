"use client";
import useSWR from "swr";
import { Tab } from "@headlessui/react";
import ProductItem from "../product/product-item";
import { Product } from "@/lib/models/product";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductPopularArea() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8088/api/v1/products?page=0&limit=12",
    fetcher,
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-24">
      <Tab.Group>
        <Tab.List className="p1 mb-9 flex items-center justify-between p-1">
          <h3 className="leading-1 text-3xl font-medium">Popular Products</h3>
          <div className="flex gap-x-3 ">
            <Tab
              className={({ selected }) =>
                classNames(
                  "text-base font-medium capitalize text-white ",
                  selected ? " text-[#f50963] " : " hover:text-[#f50963]",
                )
              }
            >
              top rated
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "text-base font-medium capitalize text-white ",
                  selected ? " text-[#f50963] " : " hover:text-[#f50963]",
                )
              }
            >
              best selling
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "selected text-base font-medium capitalize text-white",
                  selected ? " text-[#f50963] " : " hover:text-[#f50963]",
                )
              }
            >
              latest product
            </Tab>
          </div>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="grid grid-cols-4 gap-4">
            {data.products.map((product: Product, index: number) => (
              <ProductItem key={index} product={product} />
            ))}
          </Tab.Panel>
          <Tab.Panel className="grid-cols-4 gap-2">Content 2</Tab.Panel>
          <Tab.Panel className="grid-cols-4 gap-2">Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
