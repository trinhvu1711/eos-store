import { PageProps } from "@/lib/type";
const paths = [
  {
    name: "Theo dõi đơn hàng",
    slug: "/tracking",
  },
  {
    name: "Hoàn Tất",
    slug: "#",
  },
];
function Layout({ children, params }: PageProps) {
  return <>{children}</>;
}

export default Layout;
