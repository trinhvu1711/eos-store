import BreadCrumb from "@/components/breadcrumb";
import { VariantClient } from "@/components/tables/variant-table/client";
import {  getAllVariants } from "@/lib/data";

const breadcrumbItems = [{ title: "Variant", link: "/admin/variant" }];
export default async function page() {
  const data = await getAllVariants();

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <VariantClient data={data} />
      </div>
    </>
  );
}
