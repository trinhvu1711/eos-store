import { getSelectedVariant, Order } from "@/lib/type";
import Image from "next/image";

export default function TrackingOrder({ order }: { order: Order }) {
  return (
    <section className="relative py-24">
      <div className="lg-6 mx-auto w-full max-w-7xl px-4 md:px-5">
        {/* <h2 className="text-4xl font-bold leading-10 text-center text-black font-manrope">
          Payment Successful
        </h2>
        <p className="mt-4 text-lg font-normal leading-8 text-center text-gray-500 mb-11">
          Thanks for making a purchase, you can check our order summary from
          below
        </p> */}
        <div className="main-box max-w-xl rounded-xl border border-gray-200 pt-6 max-lg:mx-auto lg:max-w-full">
          <div className="flex flex-col justify-between border-b border-gray-200 px-6 pb-6 lg:flex-row lg:items-center">
            <div className="data">
              <p className="text-base font-semibold leading-7 text-black">
                Tracking Number:{" "}
                <span className="font-medium text-indigo-600">
                  {order.trackingNumber}
                </span>
              </p>
              <p className="mt-4 text-base font-semibold leading-7 text-black">
                Order Payment:{" "}
                <span className="font-medium text-gray-400">
                  {new Date(order.orderDate).toLocaleDateString()}
                </span>
              </p>
            </div>
            {/* <button className="py-3 text-sm font-semibold leading-7 text-white transition-all duration-500 bg-indigo-600 rounded-full shadow-sm px-7 shadow-transparent hover:bg-indigo-700 hover:shadow-indigo-400 max-lg:mt-5">
              Track Your Order
            </button> */}
          </div>
          {order.orderDetails.map((detail) => {
            const selectedVariant = getSelectedVariant(detail);
            const total = detail.totalMoney;
            return (
              <div key={detail.id} className="w-full px-3 min-[400px]:px-6">
                <div className="flex w-full flex-col items-center gap-6 border-b border-gray-200 py-6 lg:flex-row">
                  <div className="img-box max-lg:w-full">
                    <Image
                      src={`http://localhost:8088/api/v1/products/images/${detail.product.thumbnail}`}
                      alt={detail.product.name}
                      className="aspect-square w-full lg:max-w-[140px]"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="flex w-full flex-row items-center">
                    <div className="grid w-full grid-cols-1 lg:grid-cols-2">
                      <div className="flex items-center">
                        <div>
                          <h2 className="mb-3 text-xl font-semibold leading-8 text-black">
                            {detail.product.name}
                          </h2>
                          <p className="mb-3 text-lg font-normal leading-8 text-gray-500">
                            By: {detail.product.category.name}
                          </p>
                          <div className="flex items-center">
                            <p className="mr-4 border-r border-gray-200 pr-4 text-base font-medium leading-7 text-black">
                              Size:{" "}
                              <span className="text-gray-500">
                                {selectedVariant ? selectedVariant.name : "N/A"}
                              </span>
                            </p>
                            <p className="text-base font-medium leading-7 text-black">
                              Qty:{" "}
                              <span className="text-gray-500">
                                {detail.numberOfProducts}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-5">
                        <div className="col-span-5 flex items-center max-lg:mt-3 lg:col-span-1">
                          <div className="flex gap-3 lg:block">
                            <p className="text-sm font-medium leading-7 text-black">
                              Price
                            </p>
                            <p className="text-sm font-medium leading-7 text-indigo-600 lg:mt-4">
                              ${total}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-5 flex items-center max-lg:mt-3 lg:col-span-2">
                          <div className="flex gap-3 lg:block">
                            <p className="text-sm font-medium leading-7 text-black">
                              Status
                            </p>
                            <p className="whitespace-nowrap rounded-full bg-emerald-50 px-3 py-0.5 text-sm font-medium leading-6 text-emerald-600 lg:mt-3">
                              {order.status}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-5 flex items-center max-lg:mt-3 lg:col-span-2">
                          <div className="flex gap-3 lg:block">
                            <p className="whitespace-nowrap text-sm font-medium leading-6 text-black">
                              Expected Delivery Time
                            </p>
                            <p className="whitespace-nowrap text-base font-medium leading-7 text-emerald-500 lg:mt-3">
                              {new Date(
                                order.shippingDate,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex w-full flex-col items-center justify-between border-t border-gray-200 px-6 lg:flex-row">
            <div className="flex flex-col items-center border-gray-200 max-lg:border-b sm:flex-row">
              <button className="group flex items-center justify-center gap-2 whitespace-nowrap border-gray-200 bg-white py-6 text-lg font-semibold text-black outline-0 transition-all duration-500 hover:text-indigo-600 sm:border-r sm:pr-6">
                <svg
                  className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                    stroke=""
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                Cancel Order
              </button>
              <p className="py-3 pl-6 text-lg font-medium text-gray-900 max-lg:text-center">
                Paid using {order.paymentMethod}{" "}
                {/* <span className="text-gray-500">ending with 8822</span> */}
              </p>
            </div>
            <p className="py-6 text-lg font-semibold text-black">
              Total Price:{" "}
              <span className="text-indigo-600">${order.totalMoney}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
