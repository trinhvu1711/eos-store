import BreadCrumb from "@/components/breadcrumb";
import { UserForm } from "@/components/forms/user-form";
import { VariantForm } from "@/components/forms/variant-form";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import the getServerSession function
import { getVariantById } from "@/lib/data";
import React from "react";

export default async function Page({ params }: { params: { variantId: string } }) {
  const breadcrumbItems = [
    { title: "Variant", link: "/admin/variant" },
    { title: "Create", link: "/admin/variant/create" },
  ];
  let initialData = null; 
    console.log("variantId", params.variantId)
    if (Number(params.variantId)) {
      const { variantId } = params;
      initialData = await getVariantById(Number(variantId));
      console.log("initialData", initialData)
    }
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <VariantForm
          initialData={initialData ? {
                  id: initialData.id.toString(),
                  configuration: initialData.options[0].id.toString(),
                  color: initialData.options[1].id.toString(),
                  available_for_sale:initialData.availableForSale ===true?"true":"false",
                  price: initialData.price,
                  discount: initialData.discount*100,
                  currency: initialData.currency,
              }: null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
