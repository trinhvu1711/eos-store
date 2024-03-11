export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Cart = Omit<ShopifyCart, "lines"> & {
  lines: CartItem[];
};

export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Product;
  };
};

export type Collection = ShopifyCollection & {
  path: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Product = Omit<ShopifyProduct, "variants" | "images"> & {
  variants: ProductVariant[];
  images: Image[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type ShopifyCartOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyCollectionOperation = {
  data: {
    collection: ShopifyCollection;
  };
  variables: {
    handle: string;
  };
};

export type ShopifyCollectionProductsOperation = {
  data: {
    collection: {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type ShopifyPageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type ShopifyPagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type ShopifyProductRecommendationsOperation = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  };
};

export type ShopifyProductsOperation = {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export const cart: Cart = {
  id: "cart123",
  checkoutUrl: "https://example.com/checkout/cart123",
  cost: {
    subtotalAmount: { amount: "280.00", currencyCode: "USD" },
    totalAmount: { amount: "305.00", currencyCode: "USD" },
    totalTaxAmount: { amount: "25.00", currencyCode: "USD" },
  },
  lines: [
    // CartItem objects here
  ],
  totalQuantity: 3,
};

export const sampleProduct: Product = {
  id: "product-123",
  handle: "sample-product",
  availableForSale: true,
  title: "Sample Product",
  description: "This is a sample product.",
  descriptionHtml: "<p>This is a <strong>sample</strong> product.</p>",
  options: [
    {
      id: "color",
      name: "Color",
      values: ["Red", "Blue", "Green"],
    },
    {
      id: "size",
      name: "Size",
      values: ["S", "M", "L"],
    },
  ],
  priceRange: {
    maxVariantPrice: {
      amount: "29.99",
      currencyCode: "USD",
    },
    minVariantPrice: {
      amount: "19.99",
      currencyCode: "USD",
    },
  },
  variants: [
    {
      id: "variant-123",
      title: "Red / S",
      availableForSale: true,
      selectedOptions: [
        { name: "Color", value: "Red" },
        { name: "Size", value: "S" },
      ],
      price: {
        amount: "15.99",
        currencyCode: "USD",
      },
    },
    {
      id: "variant-124",
      title: "Red / M",
      availableForSale: true,
      selectedOptions: [
        { name: "Color", value: "Red" },
        { name: "Size", value: "M" },
      ],
      price: {
        amount: "21.99",
        currencyCode: "USD",
      },
    },
    {
      id: "variant-125",
      title: "Blue / L",
      availableForSale: false, // Giả sử biến thể này hiện không có sẵn
      selectedOptions: [
        { name: "Color", value: "Blue" },
        { name: "Size", value: "L" },
      ],
      price: {
        amount: "22.99",
        currencyCode: "USD",
      },
    },
    {
      id: "variant-126",
      title: "Green / S",
      availableForSale: true,
      selectedOptions: [
        { name: "Color", value: "Green" },
        { name: "Size", value: "S" },
      ],
      price: {
        amount: "20.99",
        currencyCode: "USD",
      },
    },
  ],
  featuredImage: {
    url: "https://i.ibb.co/6ZfzMwb/BGOnmyoji7.jpg",
    altText: "Wireless Headphones Black",
    width: 1000,
    height: 1000,
  },
  images: [
    {
      url: "https://i.ibb.co/mHwksvG/53ef8320-6e21-4f38-9b9f-009dd5a8b277-1151266-blob.webp",
      altText: "Sample Product Image",
      width: 1000,
      height: 1000,
    },
    {
      url: "https://i.ibb.co/SvGPPZS/0f335cf4-5d47-4876-ae5c-2fbfe5ea5e95-849867-blob.webp",
      altText: "Sample Product Image",
      width: 1000,
      height: 1000,
    },
    {
      url: "https://i.ibb.co/g7Xrt2L/8d40c420-0cd1-4f7d-a76a-091414332582-831512-blob.webpp",
      altText: "Sample Product Image",
      width: 1000,
      height: 1000,
    },
    {
      url: "https://i.ibb.co/fCP9f9v/4bb40fda-686c-4e95-9a1c-23ce9085acc9-470916-blob.webpp",
      altText: "Sample Product Image",
      width: 1000,
      height: 1000,
    },
    {
      url: "https://i.ibb.co/tbc19B3/007c3dca-b66d-4956-b36e-22cac543e744-1170805-blob.webp",
      altText: "Sample Product Image",
      width: 1000,
      height: 1000,
    },
    // Thêm các hình ảnh khác tương tự
  ],
  seo: {
    title: "Sample Product",
    description: "This is a sample product for demonstration purposes.",
  },
  tags: ["sample", "product", "demo"],
  updatedAt: "2024-03-10T00:00:00Z",
};

export const product1: Product = {
  id: "prod1",
  handle: "wireless-headphones",
  availableForSale: true,
  title: "Wireless Headphones",
  description: "High-quality sound and noise cancellation.",
  descriptionHtml: "<p>High-quality sound and noise cancellation.</p>",
  options: [{ id: "opt1", name: "Color", values: ["Black", "White"] }],
  priceRange: {
    maxVariantPrice: { amount: "100.00", currencyCode: "USD" },
    minVariantPrice: { amount: "100.00", currencyCode: "USD" },
  },
  variants: [
    {
      id: "var1",
      title: "Wireless Headphones Black",
      availableForSale: true,
      selectedOptions: [{ name: "Color", value: "Black" }],
      price: { amount: "100.00", currencyCode: "USD" },
    },
  ],
  featuredImage: {
    url: "https://i.ibb.co/6ZfzMwb/BGOnmyoji7.jpg",
    altText: "Wireless Headphones Black",
    width: 1000,
    height: 1000,
  },
  images: [
    {
      url: "https://example.com/images/wireless-headphones.jpg",
      altText: "Wireless Headphones Black",
      width: 1000,
      height: 1000,
    },
  ],
  seo: {
    title: "Wireless Headphones",
    description: "High-quality sound and noise cancellation.",
  },
  tags: ["electronics", "audio", "wireless", "noise-cancellation"],
  updatedAt: "2024-03-07T00:00:00Z",
};

// Example CartItem to include in the `lines` array
cart.lines.push({
  id: "item1",
  quantity: 2,
  cost: { totalAmount: { amount: "200.00", currencyCode: "USD" } },
  merchandise: {
    id: "merch1",
    title: "Wireless Headphones",
    selectedOptions: [{ name: "Color", value: "Black" }],
    product: product1,
  },
});

export const product2: Product = {
  id: "prod2",
  handle: "ergonomic-keyboard",
  availableForSale: true,
  title: "Ergonomic Keyboard",
  description: "Comfortable typing for long work sessions.",
  descriptionHtml: "<p>Comfortable typing for long work sessions.</p>",
  options: [{ id: "opt2", name: "Layout", values: ["US", "UK"] }],
  priceRange: {
    maxVariantPrice: { amount: "80.00", currencyCode: "USD" },
    minVariantPrice: { amount: "80.00", currencyCode: "USD" },
  },
  variants: [
    {
      id: "var3",
      title: "Ergonomic Keyboard US",
      availableForSale: true,
      selectedOptions: [{ name: "Layout", value: "US" }],
      price: { amount: "80.00", currencyCode: "USD" },
    },
    // You could add other variants here if needed
  ],
  featuredImage: {
    url: "https://i.ibb.co/bP0bCjW/305060433-823322692023361-9202875701243276683-n.jpg",
    altText: "Wireless Headphones Black",
    width: 1000,
    height: 1000,
  },
  images: [
    {
      url: "https://example.com/images/ergonomic-keyboard.jpg",
      altText: "Ergonomic Keyboard",
      width: 1000,
      height: 1000,
    },
  ],
  seo: {
    title: "Ergonomic Keyboard",
    description: "Comfortable typing for long work sessions.",
  },
  tags: ["computer", "peripherals", "keyboard", "ergonomic"],
  updatedAt: "2024-03-07T00:00:00Z",
};

cart.lines.push({
  id: "item2",
  quantity: 1,
  cost: { totalAmount: { amount: "80.00", currencyCode: "USD" } },
  merchandise: {
    id: "merch2",
    title: "Ergonomic Keyboard",
    selectedOptions: [{ name: "Layout", value: "US" }],
    product: product2,
  },
});

export const product3: Product = {
  id: "prod3",
  handle: "ergonomic-keyboard",
  availableForSale: true,
  title: "Ergonomic Keyboard",
  description: "Comfortable typing for long work sessions.",
  descriptionHtml: "<p>Comfortable typing for long work sessions.</p>",
  options: [{ id: "opt2", name: "Layout", values: ["US", "UK"] }],
  priceRange: {
    maxVariantPrice: { amount: "80.00", currencyCode: "USD" },
    minVariantPrice: { amount: "80.00", currencyCode: "USD" },
  },
  variants: [
    {
      id: "var3",
      title: "Ergonomic Keyboard US",
      availableForSale: true,
      selectedOptions: [{ name: "Layout", value: "US" }],
      price: { amount: "80.00", currencyCode: "USD" },
    },
    // You could add other variants here if needed
  ],
  featuredImage: {
    url: "https://i.ibb.co/bP0bCjW/305060433-823322692023361-9202875701243276683-n.jpg",
    altText: "Wireless Headphones Black",
    width: 1000,
    height: 1000,
  },
  images: [
    {
      url: "https://example.com/images/ergonomic-keyboard.jpg",
      altText: "Ergonomic Keyboard",
      width: 1000,
      height: 1000,
    },
  ],
  seo: {
    title: "Ergonomic Keyboard",
    description: "Comfortable typing for long work sessions.",
  },
  tags: ["computer", "peripherals", "keyboard", "ergonomic"],
  updatedAt: "2024-03-07T00:00:00Z",
};

export const products = [product1, product2, product3];
