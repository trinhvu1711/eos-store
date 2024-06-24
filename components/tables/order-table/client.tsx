"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import {  Order } from "@/lib/type";

interface ProductsClientProps {
  data: Order[];
}

export const OrderClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Order (${data.length})`}
          description="Manage order (Client side table functionalities.)"
        />
      </div>
      <Separator />
       <DataTable searchKey="fullName" columns={columns} data={data} />
    </>
  );
};
