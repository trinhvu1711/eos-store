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
  name: string;
  availableForSale: boolean;
  price: number;
  currency: string;
  selectedOptions: selectedOptions[];
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
  variants: Variant[];
  productImages: ProductImage[];
};

export type ProductImage = {
  id: string;
  imageUrl: string;
};

export function getMaxVariantPriceAndCurrency(product: Product): {
  maxPrice: string;
  currencyCode: string;
} {
  let maxPrice = 0;
  let currencyCode = "";

  // Iterate over variants to find maximum price
  product.variants.forEach((variant) => {
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
  if (variants) {
    variants.forEach((variant) => {
      variant.selectedOptions.forEach((option: any) => {
        const { name, value } = option;
        const optionId = name.toLowerCase();

        if (!optionsMap[optionId]) {
          optionsMap[optionId] = {
            id: name,
            name: name,
            values: [],
          };
          idCounter++;
        }

        if (!optionsMap[optionId].values.includes(value)) {
          optionsMap[optionId].values.push(value);
        }
      });
    });
  }

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
    variants: apiResponse.product_variants.map((variant: Variant) => ({
      id: variant.id,
      name: variant.name,
      availableForSale: variant.availableForSale,
      price: variant.price,
      currency: variant.currency,
      selectedOptions: apiResponse.product_variants.options.map(
        (option: selectedOptions) => ({
          id: option.id,
          name: option.name,
          value: option.value,
        }),
      ),
    })),
    productImages: apiResponse.product_images.map((image: any) => ({
      id: image.id,
      image_url: image.imageUrl,
    })),
  };
}

// Function to parse product data
export function parseProductData(data: any): Product {
  return {
    id: data.id,
    name: data.name,
    thumbnail: data.thumbnail,
    description: data.description,
    updatedAt: data.updated_at,
    createdAt: data.created_at,
    category: data.category_id.toString(), // Assuming category_id is a string
    descriptionHtml: data.descriptionHtml,
    availableForSale: data.product_variants.some(
      (variant: any) => variant.availableForSale,
    ),
    variants: data.product_variants.map((variant: any) => ({
      id: variant.id.toString(), // Assuming variant.id is a string
      selectedOptions: variant.options.map((option: any) => ({
        id: option.id,
        name: option.name,
        value: option.value,
      })),
      name: variant.name,
      availableForSale: variant.availableForSale,
      price: variant.price,
      currency: variant.currency,
    })),
    productImages: data.product_images.map((image: any) => ({
      id: image.id.toString(), // Assuming image.id is a string
      imageUrl: image.imageUrl,
    })),
  };
}
