export type Category = {
  name: string;
  imageUrl: string;
};

export type selectedOptions = {
  id: string;
  name: string;
  value: string;
};

export type Option = {
  id: string;
  name: string;
  values: string[];
};

export type Variant = {
  id: string;
  selectedOptions: selectedOptions[];
  name: string;
  availableForSale: boolean;
  price: number;
  currency: string;
};

export type Product = {
  id: string;
  name: string;
  thumbnail: string;
  description: string | null;
  updatedAt: string;
  createdAt: string;
  category: string;
  descriptionHtml: string;
  availableForSale: boolean | true;
  variant: Variant[];
  productImage: ProductImage[];
};

export type ProductImage = {
  id: string;
  image_url: string;
};

export function getMaxVariantPriceAndCurrency(product: Product): {
  maxPrice: string;
  currencyCode: string;
} {
  let maxPrice = 0;
  let currencyCode = "";

  // Iterate over variants to find maximum price
  product.variant.forEach((variant) => {
    if (variant.price > maxPrice) {
      maxPrice = variant.price;
      currencyCode = variant.currency;
    }
  });

  return { maxPrice: maxPrice.toString(), currencyCode };
}

export function getOptionsFromVariants(variants: Variant[]): Option[] {
  const optionsMap: { [key: string]: Option } = {};
  let idCounter = 1;

  variants.forEach((variant) => {
    if (variant.selectedOptions) {
      variant.selectedOptions.forEach((option: any) => {
        const { name, value } = option;
        const optionId = name.toLowerCase();

        if (!optionsMap[optionId]) {
          optionsMap[optionId] = {
            id: idCounter.toString(),
            name: name,
            values: [],
          };
          idCounter++;
        }

        if (!optionsMap[optionId].values.includes(value)) {
          optionsMap[optionId].values.push(value);
        }
      });
    }
  });

  return Object.values(optionsMap);
}

export function mapApiResponseToProductModel(apiResponse: any): Product {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    thumbnail: apiResponse.thumbnail,
    description: apiResponse.description,
    updatedAt: apiResponse.updated_at,
    createdAt: apiResponse.created_at,
    category: apiResponse.category_id,
    descriptionHtml: apiResponse.descriptionHtml,
    availableForSale: true,
    variant: apiResponse.product_variants.map((variant: Variant) => ({
      id: variant.id,
      selectedOptions: variant.selectedOptions,
      name: variant.name,
      availableForSale: variant.availableForSale,
      price: variant.price,
      currency: variant.currency,
    })),
    productImage: apiResponse.product_images.map((image: any) => ({
      id: image.id,
      image_url: image.imageUrl,
    })),
  };
}
