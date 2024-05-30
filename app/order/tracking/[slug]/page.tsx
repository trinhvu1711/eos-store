import { getOrderByTrackingNumber } from "@/lib/services/order";
import TrackingOrder from "./TrackingOrder";

export default async function page({ params }: { params: { slug: string } }) {
  const order = await getOrderByTrackingNumber(params.slug);
  return <TrackingOrder initialOrder={order} />;
}
