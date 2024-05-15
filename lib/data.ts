// import { getProducts } from "@/lib/data";

import { Category, Product } from "./type";

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
export async function getProducts(
  page = 0,
  limit = 12,
): Promise<GetProductsType> {
  try {
    const response = await fetch(
      `http://localhost:8088/api/v1/products?page=${page}&limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data: GetProductsType = await response.json();
    console.log("🚀 ~ data:", data);

    // console.log(data);

    return data;
  } catch (error: any) {
    throw new Error("Failed to get products: " + error.message);
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
