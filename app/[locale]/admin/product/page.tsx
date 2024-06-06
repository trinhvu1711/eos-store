import BreadCrumb from "@/components/breadcrumb";
import { columns } from "@/components/tables/product-tables/columns";
import { ProductTable } from "@/components/tables/product-tables/product-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/constants/data";
import { cn } from "@/lib/utils-admin";
import { Plus } from "lucide-react";
import Link from "next/link";

const breadcrumbItems = [{ title: "Product", link: "/admin/product" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const productName = searchParams.search || null;

  const res = await fetch(
    `http://localhost:8088/api/v1/products/search?` +
      (productName ? `&search=${productName}` : ""),
  );

  let productRes;
  try {
    if (res.ok) {
      productRes = await res.json();
      // console.log(res.status);
      // console.log(productRes);
    } else {
      // console.log(res.status);
      console.error("Server responded with status", res.status);
    }
  } catch (error) {
    console.log(res.status);
    console.error("Failed to parse JSON response", error);
  }
  const start = (page - 1) * pageLimit;
  const end = start + pageLimit;
  const productsToShow = productRes.slice(start, end);
  const pageCount = Math.ceil(productRes.length / pageLimit);
  const totalProduct = productRes.length;
  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Product (${totalProduct})`}
            description="Manage products (Server side table functionalities.)"
          />

          <Link
            href={"/admin/product/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <ProductTable
          searchKey="name"
          pageNo={page}
          columns={columns}
          totalUsers={totalProduct}
          data={productsToShow}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
