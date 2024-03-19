import { Collection } from "@/lib/type";
import clsx from "clsx";
import { Suspense } from "react";
import FilterList from "./filter";

async function CollectionList() {
  // const collections = await getCollection();
  const collections: Collection[] = [
    {
      handle: "all",
      title: "All",
      description: "All products available in our store.",
      seo: {
        title: "All Products",
        description: "Browse all products in our catalog.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/collections/all",
    },
    {
      handle: "bags",
      title: "Bags",
      description: "High-quality bags for every occasion.",
      seo: {
        title: "Bags Collection",
        description: "Explore our range of bags.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/collections/bags",
    },
    {
      handle: "drinkware",
      title: "Drinkware",
      description: "Stay hydrated with our drinkware collection.",
      seo: {
        title: "Drinkware Collection",
        description: "Find the perfect drinkware for any occasion.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/collections/drinkware",
    },
    {
      handle: "electronics",
      title: "Electronics",
      description: "Latest gadgets and electronics for tech enthusiasts.",
      seo: {
        title: "Electronics Collection",
        description: "Discover the latest in technology.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/collections/electronics",
    },
    {
      handle: "footware",
      title: "Footwear",
      description: "Stylish and comfortable footwear for all.",
      seo: {
        title: "Footwear Collection",
        description: "Shop the latest footwear styles.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/collections/footwear",
    },
    {
      handle: "headwear",
      title: "Headwear",
      description: "Fashionable headwear for any season.",
      seo: {
        title: "Headwear Collection",
        description: "Top off your outfit with our selection of headwear.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/collections/headwear",
    },
    {
      handle: "hoodies",
      title: "Hoodies",
      description: "Comfortable and stylish hoodies for everyone.",
      seo: {
        title: "Hoodies Collection",
        description: "Find your next favorite hoodie.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/collections/hoodies",
    },
    {
      handle: "jackets",
      title: "Jackets",
      description: "Stay warm and stylish with our selection of jackets.",
      seo: {
        title: "Jackets Collection",
        description: "Discover our range of jackets.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/collections/jackets",
    },
    {
      handle: "kids",
      title: "Kids",
      description: "Fun and fashionable choices for kids.",
      seo: {
        title: "Kids Collection",
        description: "Adorable and stylish clothes for children.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/collections/kids",
    },
    {
      handle: "pets",
      title: "Pets",
      description: "Everything your pets need to be happy and healthy.",
      seo: {
        title: "Pet Collection",
        description: "Find the best products for your furry friends.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/collections/pets",
    },
    {
      handle: "shirts",
      title: "Shirts",
      description: "Stylish shirts for every day.",
      seo: {
        title: "Shirts Collection",
        description: "Browse our selection of shirts.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/collections/shirts",
    },
    {
      handle: "stickers",
      title: "Stickers",
      description: "Express yourself with our unique stickers.",
      seo: {
        title: "Stickers Collection",
        description: "Decorate your space with our stickers.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/collections/stickers",
    },
  ];

  return <FilterList list={collections} title="Collections" />;
}

const skeleton = "mb-3 h-4 w-5/6 animate-pulse rounded";
const activeAndTitles = "bg-neutral-800 dark:bg-neutral-300";
const items = "bg-neutral-400 dark:bg-neutral-700";

export default function Collections() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CollectionList />
    </Suspense>
  );
}
