export type PageProps = {
  params?: any;
  children?: React.ReactNode;
};

export interface User {
  createdAt: string | null;
  updatedAt: string | null;
  id: number;
  fullName: string;
  phoneNumber: string;
  address: string;
  password: string;
  active: boolean;
  dateOfBirth: string | null;
  facebookAccountId: number;
  googleAccountId: number;
  role: Role;
  image: string;
  email: string;
}

export interface Category {
  id: number;
  name: string;
  imageUrl: string;
  slug: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface ProductImage {
  id: number;
  imageUrl: string;
}
export interface Option {
  id: string;
  name: string;
  values: string[];
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface Variant {
  id: number;
  name: string;
  availableForSale: boolean;
  price: number;
  currency: string;
  options: SelectedOption[];
}

export interface Product {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  thumbnail: string;
  description: string | null;
  category: Category;
  descriptionHtml: string;
  productImages: ProductImage[];
  variants: Variant[];
}

export interface CartItem {
  id: number;
  product: Product;
  price: number;
  numberOfProducts: number;
  totalMoney: number;
  idProductVariant: number;
}

export interface ListCart {
  id: number;
  user: User;
  active: boolean;
  carts: CartItem[];
}

export interface Order {
  id: number;
  user: User;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  note: string;
  orderDate: string;
  status: string;
  totalMoney: number;
  shippingMethod: string;
  shippingAddress: any;
  shippingDate: string;
  trackingNumber: any;
  paymentMethod: string;
  orderDetails: OrderDetail[];
  active: boolean;
}

export interface OrderDetail {
  id: number;
  product: Product;
  price: number;
  numberOfProducts: number;
  totalMoney: number;
  idProductVariant: number;
}

export function getOptionsFromVariants(variants: Variant[]): Option[] {
  const optionsMap: { [key: string]: Option } = {};

  variants?.forEach((variant) => {
    variant.options.forEach((option) => {
      const { name, value } = option;
      const optionId = name.toLowerCase();

      if (!optionsMap[optionId]) {
        optionsMap[optionId] = {
          id: optionId,
          name: name,
          values: [],
        };
      }

      if (!optionsMap[optionId].values.includes(value)) {
        optionsMap[optionId].values.push(value);
      }
    });
  });

  return Object.values(optionsMap);
}

export function getMaxVariantPriceAndCurrency(product: Product): {
  maxPrice: string;
  currencyCode: string;
} {
  let maxPrice = 0;
  let currencyCode = "";

  product.variants?.forEach((variant) => {
    if (variant.price > maxPrice) {
      maxPrice = variant.price;
      currencyCode = variant.currency;
    }
  });

  return { maxPrice: maxPrice.toFixed(2), currencyCode };
}
export function getTotalQuantityOfCartList(cartList: ListCart): number {
  return cartList.carts.reduce(
    (total, cartItem) => total + cartItem.numberOfProducts,
    0,
  );
}

export function getTotalPriceOfCartList(cartList: ListCart): number {
  return cartList.carts.reduce(
    (total, cartItem) => total + cartItem.totalMoney,
    0,
  );
}

export function getSelectedVariant(cartItem: CartItem): Variant | undefined {
  return cartItem.product.variants?.find(
    (variant) => variant.id === cartItem.idProductVariant,
  );
}

export function getSelectedVariantPrice(
  product: Product,
  idSelectedVariant: number,
): number | undefined {
  return product.variants?.find((variant) => variant.id === idSelectedVariant)
    ?.price;
}

export function getSelectedVariantCurrency(
  product: Product,
  idSelectedVariant: number,
): string | undefined {
  return product.variants?.find((variant) => variant.id === idSelectedVariant)
    ?.currency;
}
