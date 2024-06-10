import Link from "next/link";

const PaymentSuccessPage = () => {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">SUCCESS</h1>
        <p className="mt-4 text-gray-500">Payment success.</p>
        <Link
          href="/user/order"
          className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Go Back Order
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
