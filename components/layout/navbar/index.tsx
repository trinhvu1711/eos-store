import Link from "next/link";

const { SITE_NAME } = process.env;
export default function Navbar() {
  const menu = [
    { name: "All", link: "/" },
    { name: "Shirts", link: "/about" },
    { name: "Stickers", link: "/services" },
  ];

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      {/* Mobile menu */}
      <div className="relative flex items-center justify-between p-4">
        <div className="block flex-none md:hidden">
          <div>Mobile Menu</div>
        </div>
      </div>

      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          {/* Logo */}
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <div>Logo</div>
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
        <div className="hidden justify-center md:flex md:w-1/3">search</div>

        {/* Cart */}
        <div className="flex justify-end md:w-1/3">cart</div>
      </div>
    </nav>
  );
}
