import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/user-tables/client";
import { users } from "@/constants/data";
import { getAllUser } from "@/lib/data";

const breadcrumbItems = [{ title: "User", link: "/admin/user" }];
export default async function page() {
  const data = await getAllUser();

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={data} />
      </div>
    </>
  );
}
