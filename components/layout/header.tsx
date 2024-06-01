import Link from "next/link";
import LocaleSwitcher from "../LocaleSwitcher";

function Header() {
  return (
    <>
      <section className="bg-black dark:bg-white">
        <div className="mx-4 md:mx-auto">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="space-x-2 text-sm">
              <span className="text-gray-200 dark:text-black ">
                Giảm giá mùa hè cho tất cả các thiết bị điện tử và chuyển phát
                nhanh miễn phí - GIẢM GIÁ 50%!
              </span>
              <Link
                href={"/products"}
                className="font-bold text-gray-50 dark:text-black "
              >
                Xem Ngay
              </Link>
            </div>
            <div className="relative">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
