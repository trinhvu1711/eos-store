import BreadCrumb from "@/components/breadcrumb";
import { OrderClient } from "@/components/tables/order-table/client";
import { getAllOrder} from "@/lib/data";

const breadcrumbItems = [{ title: "Order Management", link: "/admin/order" }];
export default async function page() {
  const data = await getAllOrder();

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <OrderClient data={data} />
      </div>
    </>
  );
}
