"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { setOrderPay } from "@/lib/services/order";
import { useSession } from "next-auth/react";

const PaymentCallbackPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const vnp_ResponseCode = searchParams?.get("vnp_ResponseCode");
  const trackingNumber = searchParams?.get("vnp_OrderInfo");
  const { data: session, status } = useSession();

  useEffect(() => {
    const handlePayment = async () => {
      if (status === "unauthenticated") {
        router.push("/auth");
        return;
      }

      if (vnp_ResponseCode === "00") {
        const token = session?.accessToken;
        try {
          await setOrderPay(token!, trackingNumber!);
          router.push("/order/payment/success");
        } catch (error) {
          console.error("Payment processing error:", error);
          // router.push("/order/payment/failed");
        }
      } else {
        router.push("/order/payment/failed");
      }
    };

    handlePayment();
  }, [vnp_ResponseCode, router, status, session, trackingNumber]);

  return (
    <div>
      <p>Processing your payment, please wait...</p>
    </div>
  );
};

export default PaymentCallbackPage;
