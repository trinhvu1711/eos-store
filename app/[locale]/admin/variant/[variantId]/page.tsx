import BreadCrumb from "@/components/breadcrumb";
import { UserForm } from "@/components/forms/user-form";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import the getServerSession function
import React from "react";

export default async function Page({ params }: { params: { variantId: string } }) {
  const breadcrumbItems = [
    { title: "User", link: "/admin/variant" },
    { title: "Create", link: "/admin/variant/create" },
  ];
  let initialData = null; 
    console.log("variantId", params.variantId)
    if (Number(params.variantId)) {
      const { variantId } = params;
      initialData={id: variantId}
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
