import BreadCrumb from "@/components/breadcrumb";
import { CategoryForm } from "@/components/forms/category-form";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import the getServerSession function
import { getCategoryById } from "@/lib/data";
import React from "react";

export default async function Page({ params }: { params: { categoryId: string } }) {
  const breadcrumbItems = [
    { title: "Category", link: "/admin/category" },
    { title: "Create", link: "/admin/category/create" },
  ];
  let initialData = null; 
    console.log("categoryId", params.categoryId)
    if (Number(params.categoryId)) {
        const { categoryId } = params;
        initialData = await getCategoryById(Number(categoryId));
        
        console.log("initialData", initialData)
    }
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <CategoryForm
          initialData={initialData ? {
                  id: initialData.id.toString(),
                  name: initialData.name,
                  slug: initialData.slug,
                  thumbnail: initialData.imageUrl,
              }: null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
