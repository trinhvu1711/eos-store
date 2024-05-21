// import { getProducts } from "@/lib/data";

import { Category, getMaxVariantPriceAndCurrency, Product } from "./type";

// Product
export async function getCategory(page = 0, limit = 3) {
  try {
    const response = await fetch(
      `http://localhost:8088/api/v1/categories?page=${page}&limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    // console.log(data);

    return data;
  } catch (error: any) {
    throw new Error("Failed to get categories: " + error.message);
  }
}

export type GetProductsType = {
  products: Product[];
  totalPage: number;
};

// Product
export async function getProducts({
  page = 0,
  limit = 10,
  keyword = "",
  categoryId = 0,
  sortKey,
  reverse = false,
}: {
  page?: number;
  limit?: number;
  keyword?: string;
  categoryId?: number;
  sortKey?: "BEST_SELLING" | "CREATED_AT" | "PRICE" | "RELEVANCE";
  reverse?: boolean;
}): Promise<GetProductsType> {
  try {
    const url = new URL("http://localhost:8088/api/v1/products");
    url.searchParams.append("page", String(page));
    url.searchParams.append("limit", String(limit));
    url.searchParams.append("keyword", keyword);
    url.searchParams.append("category_id", String(categoryId));

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data: GetProductsType = await response.json();
    let products = data.products;

    if (sortKey) {
      products = products.sort((a, b) => {
        const itemA = getMaxVariantPriceAndCurrency(a);
        const itemB = getMaxVariantPriceAndCurrency(b);

        let comparison = 0;

        switch (sortKey) {
          case "PRICE":
            comparison = Number(itemA.maxPrice) - Number(itemB.maxPrice);
            break;
          case "CREATED_AT":
            comparison =
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            break;
          case "BEST_SELLING":
            // Add your logic for BEST_SELLING if applicable
            break;
        }

        return reverse ? -comparison : comparison;
      });
    }

    return { ...data, products };
  } catch (error: any) {
    throw new Error(`Failed to get products: ${error.message}`);
  }
}

// get product
export async function getProduct(id: number): Promise<Product> {
  try {
    const response = await fetch(`http://localhost:8088/api/v1/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data: Product = await response.json();
    // console.log("🚀 ~ getProduct ~ data:", data);

    return data;
  } catch (error: any) {
    // Properly type the error
    throw new Error("Failed to get product: " + error.message);
  }
}
// Order
export async function getOrder(cartId: string) {
  try {
    const response = await fetch(
      "http://localhost:8088/api/v1/orders/" + cartId,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch order");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error("Failed to get order: " + error.message);
  }
}

// Order details
export async function getOrderDetails(orderId: string) {
  try {
    const response = await fetch(
      "http://localhost:8088/api/v1/order_details/" + orderId,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch order details");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error("Failed to get order details " + error.message);
  }
}

// Categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      "http://localhost:8088/api/v1/categories?page=0&limit=6",
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data: Category[] = await response.json();
    return data;
  } catch (error: any) {
    throw new Error("Failed to get categories + error.message");
  }
}

// export function useProducts(page = 0, limit = 12) {
//   const { data, error, isLoading } = useSWR(
//     `http://localhost:8088/api/v1/categories?page=${page}&limit=${limit}`,
//     fetcher,
//   );

//   return {
//     products: data,
//     isLoading,
//     isError: error,
//   };
// }
export const collections = [
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
    handle: "phone",
    title: "Ipad Phone & Tablets",
    description: "Latest gadgets and electronics for tech enthusiasts.",
    seo: {
      title: "Electronics Collection",
      description: "Discover the latest in technology.",
    },
    updatedAt: "2024-03-10T00:00:00Z",
    path: "/search/phone",
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
    handle: "watches",
    title: "Wireless & Watches",
    description: "Latest gadgets and electronics for tech enthusiasts.",
    seo: {
      title: "Electronics Collection",
      description: "Discover the latest in technology.",
    },
    updatedAt: "2024-03-10T00:00:00Z",
    path: "/search/watches",
    imageUrl: "product-cat-3.webp",
  },
  {
    id: 4,
    handle: "computers",
    title: "Computers Monitor & Laptop",
    description: "Latest gadgets and electronics for tech enthusiasts.",
    seo: {
      title: "Electronics Collection",
      description: "Discover the latest in technology.",
    },
    updatedAt: "2024-03-10T00:00:00Z",
    path: "/search/computers",
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
export function getIdFromHandle(handle: string) {
  const collection = collections.find((col) => col.handle === handle);
  return collection ? collection.id : null;
}
