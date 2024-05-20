import clsx from "clsx";
import { Suspense } from "react";
import FilterList from "./filter";

function CollectionList() {
  // const collections = await getCollection();
  const collections = [
    {
      handle: "all",
      title: "All",
      description: "All products available in our store.",
      seo: {
        title: "All Products",
        description: "Browse all products in our catalog.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/search/all",
    },
    {
      id: 1,
      handle: "electronics",
      title: "Ipad Phone & Tablets",
      description: "Latest gadgets and electronics for tech enthusiasts.",
      seo: {
        title: "Electronics Collection",
        description: "Discover the latest in technology.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/search/electronics",
      imageUrl: "product-cat-1.webp",
    },
    {
      id: 2,
      handle: "electronics",
      title: "Planer & Virtual",
      description: "Latest gadgets and electronics for tech enthusiasts.",
      seo: {
        title: "Electronics Collection",
        description: "Discover the latest in technology.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/search/electronics",
      imageUrl: "product-cat-2.webp",
    },
    {
      id: 3,
      handle: "electronics",
      title: "Wireless & Watches",
      description: "Latest gadgets and electronics for tech enthusiasts.",
      seo: {
        title: "Electronics Collection",
        description: "Discover the latest in technology.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/search/electronics",
      imageUrl: "product-cat-3.webp",
    },
    {
      id: 4,
      handle: "electronics",
      title: "Computers Monitor & Laptop",
      description: "Latest gadgets and electronics for tech enthusiasts.",
      seo: {
        title: "Electronics Collection",
        description: "Discover the latest in technology.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/search/electronics",
      imageUrl: "product-cat-4.webp",
    },
    {
      id: 5,
      handle: "exercise",
      title: "Exercise Bike & Shaver Clean",
      description:
        "Stay fit and groomed with our selection of exercise bikes and shavers.",
      seo: {
        title: "Exercise and Grooming Collection",
        description: "Discover our range of exercise bikes and grooming tools.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/search/exercise",
      imageUrl: "product-cat-5.webp",
    },
    {
      id: 6,
      handle: "fishing",
      title: "Spinning Reel & Kettle",
      description:
        "Top-quality spinning reels and kettles for outdoor enthusiasts.",
      seo: {
        title: "Fishing and Camping Collection",
        description: "Find the best gear for your next adventure.",
      },
      updatedAt: "2024-03-10T00:00:00Z",
      path: "/search/fishing",
      imageUrl: "product-cat-6.webp",
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
