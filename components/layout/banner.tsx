import Image from "next/image";
import React from "react";

export default function Banner() {
  return (
    <div className="container mx-auto">
      <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-left ltr:sm:text-left rtl:sm:text-right">
            <h2 className="hidden text-gray-500 md:mt-4 md:block">
              Apple iPhone 15 Pro
            </h2>

            <p className="text-2xl font-bold text-gray-900 md:text-3xl">
              The wait is on: iphone 15 max pro <br />
              <span> 32% </span>
              Off Last call for up to
            </p>

            <div className="mt-4 md:mt-8">
              <a
                href="#"
                className="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
        <Image
          src="/images/banner.jpg"
          alt="banner"
          width={960}
          height={1125}
        />
      </section>
    </div>
  );
}
