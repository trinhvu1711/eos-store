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
  role: string | null;
}

export interface Category {
  id: number;
  name: string;
  imageUrl: string;
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

// Function to extract unique options from variants
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

// Function to find the maximum variant price and its currency
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

  return { maxPrice: maxPrice.toFixed(2), currencyCode }; // Use toFixed to format the price
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

// Lấy ra biến thể tương ứng với idProductVariant
export function getSelectedVariant(cartItem: CartItem): Variant | undefined {
  return cartItem.product.variants?.find(
    (variant) => variant.id === cartItem.idProductVariant,
  );
}
