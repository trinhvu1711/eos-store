
import BreadCrumb from "@/components/breadcrumb";
import { ProductForm } from "@/components/forms/product-form";
import { getAdminProduct } from "@/lib/data";
import { ProductImage, Variant } from "@/lib/type";
import React from "react";

export default async function Page({ params }: { params: { productId: string } }) {
    let initialData = null; 
    console.log("productId", params.productId)
    if (Number(params.productId)) {
        const { productId } = params;
        initialData = await getAdminProduct(Number(productId));
        
        console.log("initialData", initialData)
    }
    const breadcrumbItems = [
    { title: "Product", link: "/admin/product" },
    { title: "Create", link: "/admin/product/create" },
    ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <ProductForm
              initialData={initialData ? {
                  id: initialData.id.toString(),
                  name: initialData.name,
                  description: initialData.description,
                  category: initialData.categoryId.toString(),
                  thumbnail: initialData.thumbnail,
                  images: initialData.productImages.map((image: ProductImage) => image.imageUrl),
                  variants: initialData.variants.map((variant: Variant) => variant.id.toString()),
              }: null}
        key={null}
      />
    </div>
  );
}
