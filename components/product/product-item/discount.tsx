import React from "react";

export default function Discount() {
  return (
    <div className="absolute left-0 top-5 flex flex-col flex-wrap">
      <span className="has-new leading-1 mb-1 block bg-[#f50963] px-[10px] py-1 text-base capitalize text-white">
        sale
      </span>
      <span className="has-offer leading-1 mb-1 block bg-black px-[10px] py-1 text-base capitalize text-white">
        -12%
      </span>
    </div>
  );
}
