import React from "react";

export default function CTA() {
  return (
    <div className="relative w-full overflow-hidden bg-[url(https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80)] bg-cover bg-top bg-no-repeat py-[50px]">
      <div className="container ml-auto mr-auto">
        <div className="px-[60px] py-[70px] dark:bg-black">
          <div className="-mx-6 -mt-0 flex flex-wrap items-center">
            <div className="w-full px-3 md:w-1/2 lg:w-1/2 xl:w-1/2">
              <h3 className="mb-5 text-4xl font-bold leading-snug sm:mb-5 md:mb-5 lg:mb-0 dark:text-white">
                Subscribe for <br />
                Latest Trends &amp; Offers
              </h3>
            </div>
            <div className="w-full px-3 md:w-1/2 lg:w-1/2 xl:w-1/2">
              <form className="mt-0 max-w-full">
                <div className="relative text-[#525258] focus-visible:outline-none">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className=" h-[64px] w-full border border-black bg-white pl-7 pr-44 text-[15px] leading-[54px] focus-visible:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-[10px] top-[10px] border-none bg-black px-[42px] py-[10px] text-[16px] font-semibold text-white outline-none"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
