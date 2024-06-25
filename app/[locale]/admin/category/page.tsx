import BreadCrumb from "@/components/breadcrumb";
import { CategoryClient } from "@/components/tables/category-table/client";
import { getAllCategory, getAllUser, getCategory } from "@/lib/data";

const breadcrumbItems = [{ title: "Category", link: "/admin/category" }];
export default async function page() {
  const data = await getAllCategory();

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CategoryClient data={data} />
      </div>
    </>
  );
}
