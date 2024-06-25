import BreadCrumb from "@/components/breadcrumb";
import { UserForm } from "@/components/forms/user-form";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import the getServerSession function
import React from "react";

export default async function Page({ params }: { params: { userId: string } }) {
  const breadcrumbItems = [
    { title: "User", link: "/admin/user" },
    { title: "Create", link: "/admin/user/create" },
  ];
  let initialData = null; 
    console.log("userId", params.userId)
    if (Number(params.userId)) {
      const { userId } = params;
      initialData={id: userId}
    }
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <UserForm
          initialData={initialData ? {
            id: initialData.id.toString()
          } : {}}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
