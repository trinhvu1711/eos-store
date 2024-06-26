"use client";
import { Tab } from "@headlessui/react";
import ProductItem from "./product-item";
import { Product } from "@/lib/type";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function TabProduct({ products }: { products: Product[] }) {
  return (
    <Tab.Group>
      <Tab.List className="p1 mb-9 flex items-center justify-between p-1">
        <h3 className="leading-1 text-3xl font-medium">Popular Products</h3>
        <div className="flex gap-x-3 ">
          <Tab
            className={({ selected }) =>
              classNames(
                "text-lg font-medium capitalize ",
                selected
                  ? " text-[#f50963] focus:outline-none"
                  : " hover:text-[#f50963] ",
              )
            }
          >
            top rated
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "text-lg font-medium capitalize ",
                selected
                  ? " text-[#f50963] focus:outline-none"
                  : " hover:text-[#f50963]",
              )
            }
          >
            best selling
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "selected text-lg font-medium capitalize",
                selected
                  ? " text-[#f50963] focus:outline-none"
                  : " hover:text-[#f50963]",
              )
            }
          >
            latest product
          </Tab>
        </div>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel className="grid grid-cols-4 gap-4">
          {products &&
            products.map((product, index: number) => (
              <ProductItem key={product.id || index} product={product} />
            ))}
        </Tab.Panel>
        <Tab.Panel className="grid-cols-4 gap-2">Content 2</Tab.Panel>
        <Tab.Panel className="grid-cols-4 gap-2">Content 3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
