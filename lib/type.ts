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
export interface UserAdmin {
  id: number;
  fullName: string;
  phoneNumber: string;
  role: string;
  isActive: string;
}
export interface ProductImage {
  id: number;
  imageUrl: string;
}
export interface Option {
  id: number;
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

export interface WishList {
  id: number;
  product: Product;
  idProductVariant: number;
  user: User;
  active: boolean;
}

export function getOptionsFromVariants(variants: Variant[]): Option[] {
  const optionsMap: { [key: string]: Option } = {};

  variants?.forEach((variant) => {
    variant.options.forEach((option, index) => {
      const { name, value } = option;
      const optionId = index;

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

export function getSelectedVariantProduct(
  product: Product,
  id: number,
): Variant | undefined {
  return product.variants?.find((variant) => variant.id === id);
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

export function getDefaultVariant(product: Product): Variant | undefined {
  if (!product.variants || product.variants.length === 0) {
    return undefined;
  }
  return product.variants[0];
}

export interface UpdateUserDTO {
  fullname?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  password?: string;
  retype_password?: string;
  date_of_birth?: string;
  facebook_account_id?: number;
  google_account_id?: number;
  role_id?: number;
}

export interface Coupon {
  id: number;
  code: string;
  active: boolean;
}

export interface Comment {
  content: string;
  user: User;
  updated_at: string;
  created_at: string;
}
