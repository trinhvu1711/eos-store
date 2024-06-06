"use client";

import {
  getSelectedVariant,
  getTotalPriceOfCartList,
  ListCart,
  Order,
  OrderDetail,
} from "@/lib/type";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { State } from "country-state-city";
import { useMemo } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import LoadingDots from "@/components/loading-dots";
import {
  addItemOrder,
  addToOrderDetails,
  createOrder,
  NewOrder,
  NewOrderDetail,
} from "@/lib/services/order";
import { deleteCartsInList } from "@/lib/services/cart";
import { useRouter, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
function SubmitButton({
  onClick,
  pending,
}: {
  onClick: () => void;
  pending: boolean;
}) {
  const buttonClasses =
    "w-full rounded-md border border-transparent bg-rose-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-50";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Add to cart"
      aria-disabled={pending}
      className={clsx(buttonClasses, {
        "hover:opacity-90": !pending,
        [disabledClasses]: pending,
      })}
    >
      <div className="absolute left-0 ml-4">
        {pending ? <LoadingDots className="mb-3 bg-white" /> : null}
      </div>
      Xác nhận
    </button>
  );
}
export default function Payment({
  listCart,
}: {
  listCart: ListCart | undefined;
}) {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const deliveryMethods = useMemo(
    () => [
      { id: 1, title: "Bình Thường", turnaround: "3-5 ngày", price: 10000 },
      { id: 2, title: "Nhanh", turnaround: "1-2 ngày", price: 50000 },
    ],
    [],
  );

  const paymentMethods = [
    { id: "visa", title: "Visa" },
    { id: "paypal", title: "PayPal" },
    { id: "etransfer", title: "Ngân Hàng" },
  ];

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0],
  );

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods[0].title,
  );
  const searchParams = useSearchParams();
  const totalAmount = searchParams?.get("totalAmount");
  const cities = State.getStatesOfCountry("VN");
  const totalPrice = Number(totalAmount) || getTotalPriceOfCartList(listCart!);
  const total = selectedDeliveryMethod.price + totalPrice;

  const [form, setForm] = useState({
    name: session?.user.fullName || "",
    address: session?.user.address || "",
    email: session?.user.email || "",
    city: "Hồ Chí Minh",
    phone: session?.user.phoneNumber || "",
  });

  useEffect(() => {
    if (listCart) {
      setForm((prevForm) => ({
        ...prevForm,
        name: session?.user.fullName || "",
        address: session?.user.address || "",
        email: session?.user.email || "",
        city: "Hồ Chí Minh",
        phone: session?.user.phoneNumber || "",
      }));
    }
  }, [listCart, session]);
  const handleAddToOrder = async () => {
    setPending(true);
    const newTrackingNumber = uuidv4().replace(/-/g, "").slice(0, 24);
    const order: NewOrder = {
      user_id: session?.user.id || 0,
      full_name: form.name,
      email: form.email,
      phone_number: form.phone,
      shipping_address: form.address,
      address: form.city,
      note: "",
      total_money: total,
      shipping_method: selectedDeliveryMethod.title,
      payment_method: selectedPaymentMethod,
      tracking_number: newTrackingNumber,
    };
    // console.log("🚀 ~ handleAddToOrder ~ order:", order);

    let newId = await createOrder(order);
    try {
      listCart?.carts.forEach(async (item) => {
        const selectedVariant = getSelectedVariant(item);
        await addToOrderDetails({
          order_id: newId,
          product_id: item.product.id,
          price: selectedVariant?.price!,
          number_of_products: item.numberOfProducts,
          total_money: selectedVariant?.price! * item.numberOfProducts,
          id_product_variant: selectedVariant?.id!,
        });
      });

      setMessage("Item added to order successfully!");
    } catch (error) {
      console.log("🚀 ~ handleAddToOrder ~ error", error);
      setMessage("Error adding item to order: " + error);
    }

    // console.log("🚀 ~ handleAddToCart ~ resultMessage:", resultMessage);
    deleteCartsInList(null, listCart!);
    setPending(false);

    router.push(`/cart/confirm/${newTrackingNumber}`);
  };
  return (
    <section className="pb-10">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Thông Tin Giao Hàng
          </h2>
          <div className="mt-6 border-t border-gray-200">
            <div className="mt-4 grid gap-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-900"
                >
                  Họ và Tên
                </label>
                <div className="mt-1">
                  <input
                    required
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="family-name"
                    value={form.name}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    required
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-900"
                >
                  Tỉnh/TP
                </label>
                <div className="mt-1">
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    {cities.map((city) => {
                      return (
                        <option key={city.isoCode} value={city.name}>
                          {city.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-900"
                >
                  Địa Chỉ
                </label>
                <div className="mt-1">
                  <input
                    required
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    type="text"
                    name="address"
                    id="address"
                    value={form.city}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-900"
                >
                  Số Điện Thoại
                </label>
                <div className="mt-1">
                  <input
                    required
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                    value={form.phone}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-10">
            <RadioGroup
              value={selectedDeliveryMethod}
              onChange={setSelectedDeliveryMethod}
            >
              <RadioGroup.Label className="text-lg font-medium text-gray-900">
                Phương Thức Giao Hàng
              </RadioGroup.Label>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                {deliveryMethods.map((deliveryMethod) => (
                  <RadioGroup.Option
                    key={deliveryMethod.id}
                    value={deliveryMethod}
                    className={({ checked, active }) =>
                      clsx(
                        checked ? "border-transparent" : "border-gray-300",
                        active ? "ring-2 ring-rose-500" : "",
                        "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none",
                      )
                    }
                  >
                    {({ checked, active }) => (
                      <>
                        <span className="flex flex-1 justify-between">
                          <span className="flex flex-col">
                            <RadioGroup.Label
                              as="span"
                              className="block text-sm font-medium text-gray-900"
                            >
                              {deliveryMethod.title}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className="mt-1 flex items-center text-sm text-gray-500"
                            >
                              {deliveryMethod.turnaround}
                            </RadioGroup.Description>
                            <RadioGroup.Description
                              as="span"
                              className="mt-6 text-sm font-medium text-gray-900"
                            >
                              {deliveryMethod.price.toLocaleString()} VNĐ
                            </RadioGroup.Description>
                          </span>
                          {checked ? (
                            <CheckCircleIcon
                              className="h-5 w-5 text-rose-600"
                              aria-hidden="true"
                            />
                          ) : null}
                        </span>

                        <span
                          className={clsx(
                            checked ? "border-rose-500" : "border-transparent",
                            "pointer-events-none absolute -inset-px rounded-lg",
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Payment */}
          <div className="mt-10 border-t border-gray-200 pt-10">
            <h2 className="text-lg font-medium text-gray-900">Thanh Toán</h2>

            <fieldset className="mt-4">
              <legend className="sr-only">Chọn</legend>
              <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                  <div key={paymentMethod.id} className="flex items-center">
                    {paymentMethodIdx === 0 ? (
                      <input
                        id={paymentMethod.id}
                        name="payment-type"
                        type="radio"
                        defaultChecked
                        onChange={() =>
                          setSelectedPaymentMethod(paymentMethod.title)
                        }
                        className="h-4 w-4 border-gray-300 text-rose-600 focus:ring-rose-500"
                      />
                    ) : (
                      <input
                        id={paymentMethod.id}
                        onChange={() =>
                          setSelectedPaymentMethod(paymentMethod.title)
                        }
                        name="payment-type"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-rose-600 focus:ring-rose-500"
                      />
                    )}

                    <label
                      htmlFor={paymentMethod.id}
                      className="ml-3 block text-sm font-medium text-gray-900"
                    >
                      {paymentMethod.title}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        {/* Order summary */}
        <div className="mt-10 lg:mt-0">
          <h2 className="text-lg font-medium text-gray-900">Tổng Quan</h2>

          <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="sr-only">Hàng Trong Giỏ</h3>
            <ul role="list" className="divide-y divide-gray-200">
              {listCart?.carts.map((item, index) => {
                const image = `http://localhost:8088/api/v1/products/images/${item.product.thumbnail}`;
                const slug =
                  "/products/" + item.product.name + "?id=" + item.product.id;
                const selectedVariant = getSelectedVariant(item);
                return (
                  <li key={index} className="flex px-4 py-6 sm:px-6">
                    <div className="flex-shrink-0">
                      <Image
                        src={image}
                        alt={item.product.name}
                        className="rounded-md"
                        width={80}
                        height={80}
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <Link
                              href={slug}
                              className="font-medium text-gray-900 hover:text-gray-800"
                            >
                              {item.product.name}
                            </Link>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            {selectedVariant?.name}
                          </p>
                        </div>

                        <div className="ml-4 flow-root flex-shrink-0">
                          <button
                            type="button"
                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-600 hover:text-red-600"
                          >
                            <span className="sr-only">Remove</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {selectedVariant?.price.toLocaleString()} VNĐ
                        </p>

                        <div className="ml-4">
                          <label htmlFor="quantity" className="sr-only">
                            Quantity
                          </label>
                          <input
                            type="text"
                            name="quantity"
                            id="quantity"
                            value={item.numberOfProducts}
                            disabled
                            className="w-10 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex items-center justify-between">
                <dt className="text-sm">Tạm Tính</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {getTotalPriceOfCartList(listCart!).toLocaleString()} VNĐ
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm">Giảm giá</dt>
                <dd className="text-sm font-medium text-gray-900">
                  -{" "}
                  {(
                    getTotalPriceOfCartList(listCart!) - totalPrice
                  ).toLocaleString()}{" "}
                  VNĐ
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm">Phí Vận Chuyển</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {totalPrice > 0
                    ? selectedDeliveryMethod.price.toLocaleString()
                    : 0}{" "}
                  VNĐ
                </dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base font-medium">Tổng</dt>
                <dd className="text-base font-medium text-gray-900">
                  {totalPrice > 0 ? total.toLocaleString() : 0} VNĐ
                </dd>
              </div>
            </dl>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <form onSubmit={(e) => e.preventDefault()}>
                <SubmitButton onClick={handleAddToOrder} pending={pending} />
                <p aria-live="polite" className="sr-only" role="status">
                  {message}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
