import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/user-tables/client";
import { getAllUser } from "@/lib/data";

const breadcrumbItems = [{ title: "User", link: "/admin/user" }];
export default async function page() {
  const data = await getAllUser();

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={data} />
      </div>
    </>
  );
}
