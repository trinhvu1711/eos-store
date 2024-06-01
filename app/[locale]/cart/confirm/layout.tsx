import { PageProps } from "@/lib/type";
const paths = [
  {
    name: "Giỏ Hàng",
    slug: "/cart",
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
