export type Category = {
  name: string;
  imageUrl: string;
};

export const category: Category = {
  name: "tablet",
  imageUrl: "this is image url",
};

export type Option = {
  name: string;
  value: string;
};

export const option: Option = {
  name: "Option Name",
  value: "Option Value",
};

export type Variant = {
  option: Option;
  name: string;
  availableForSale: boolean;
  price: number;
  currency: string;
};

export type Product = {
  name: string;
  thumbnail: string;
  description: string | null;
  updatedAt: string;
  createdAt: string;
  category: Category;
  desccriptionHtml: string;
  variant: Variant[];
  productImage: ProductImage[];
};

export const variant: Variant = {
  option: option,
  name: "Variant Name",
  availableForSale: true,
  price: 0.0,
  currency: "USD",
};

export type ProductImage = {
  image_url: string;
};

export const productImage: ProductImage = {
  image_url: "this is image url",
};

export const product: Product = {
  name: "ipad pro 2013",
  thumbnail: "this is thumbnail",
  description: null,
  updatedAt: "2024-04-04T09:51:46",
  createdAt: "2024-04-04T09:51:46",
  category: category,
  desccriptionHtml: "this is description html",
  variant: [variant, variant],
  productImage: [productImage, productImage],
};
