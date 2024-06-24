import BreadCrumb from "@/components/breadcrumb";
import { OrderForm } from "@/components/forms/order-form";
import TableDemoConst from "@/components/tables/order-table/order-detail-table";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import the getServerSession function
import { getOrderUpdate } from "@/lib/data";
import { tr } from "date-fns/locale";
import React from "react";

export default async function Page({ params }: { params: { order: string } }) {
  const breadcrumbItems = [
    { title: "Order", link: "/admin/order" },
  ];
  console.log(params)
  let initialData = null; 
  let formattedDate = '';
    console.log("order", params.order)
    if (Number(params.order)) {
        const { order } = params;
        initialData = await getOrderUpdate(Number(order));
      console.log("initialData 123", initialData)
      const orderDate = initialData.orderDate;

      // Tạo đối tượng Date từ timestamp
      const date = new Date(orderDate);

      // Định dạng ngày theo dd/MM/yyyy
      formattedDate = date.toLocaleDateString('en-GB'); // 'en-GB' sử dụng định dạng ngày là dd/MM/yyyy
        console.log("formattedDate",formattedDate)
    }
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <div className="md:grid md:grid-cols-2 gap-8">
          <OrderForm
            initialData={initialData ? {
              fullName: initialData.fullName,
              phoneNumber: initialData.phoneNumber,
              trackingNumber: initialData.trackingNumber,
              status: initialData.status,
              orderDate: formattedDate,
              paid: initialData.isPaid ===true?"true":"false",
            }:null}
          key={null}
          />
          <TableDemoConst
              initialData={initialData?.orderDetails?.map((orderDetail: any) => ({
                productName: orderDetail.productName,
                numberOfProducts: orderDetail.numberOfProducts,
                price: orderDetail.price,
                totalMoney: orderDetail.totalMoney,
              })) || []} // Provide an empty array as fallback
            />
        </div>
      </div>
    </ScrollArea>
  );
}
