import BreadCrumb from "@/components/breadcrumb";
import { UserForm } from "@/components/forms/user-form";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import the getServerSession function
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
      initialData={id: categoryId}
    }
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <UserForm
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
