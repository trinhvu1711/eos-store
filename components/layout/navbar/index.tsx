import Link from "next/link";
import Search from "./search";
import MobileMenu from "./mobile-menu";
import LogoSquare from "@/components/logo-square";
import Cart from "@/components/cart";
import UserDashBoardButton from "@/components/user-dashboard/user-dashboard-button";
import WishlistButton from "@/components/wishlist/wishlist-button";
import ThemeToggle from "../ThemeToggle";
import { useTranslations } from "next-intl";

const { SITE_NAME } = process.env;

export default function Navbar() {
  const t = useTranslations("menu");

  const menu = [
    { name: t("all"), link: "/search" },
    { name: t("phoneTablets"), link: "/search/phone" },
    { name: t("virtual"), link: "/search/electronics" },
    { name: t("trackingOrder"), link: "/order/tracking" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b bg-background p-4 backdrop-blur first-letter:relative lg:px-6">
      {/* Mobile menu */}

      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>

      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          {/* Logo */}
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>

          {/* Menu */}
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Search bar */}
        <div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>

        {/* Cart */}
        <div className="flex justify-end gap-2 md:w-1/3">
          <ThemeToggle />
          <UserDashBoardButton />
          <WishlistButton />
          <Cart />
        </div>
      </div>
    </nav>
  );
}
