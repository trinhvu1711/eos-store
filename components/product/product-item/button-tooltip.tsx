"use client";
import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
interface ButtonToolTipProps {
  svg: JSX.Element;
  text: string;
}

const ButtonToolTip: React.FC<ButtonToolTipProps> = ({ svg, text }) => {
  return (
    <>
      <button
        data-tooltip-id="my-tooltip"
        data-tooltip-content={text}
        data-tooltip-place="left"
        type="button"
        className="button-tooltip relative mb-[6px] flex h-[38px] w-[38px] items-center justify-center rounded-sm p-2 shadow-md hover:bg-[#f50963] hover:text-white focus:outline-none"
      >
        {svg}
      </button>
      <Tooltip
        className="transition delay-1000 ease-in-out"
        id="my-tooltip"
        style={{
          fontSize: "12px",
          padding: "4px 8px",
          lineHeight: "1",
          fontWeight: "500",
        }}
      />
    </>
  );
};
export default ButtonToolTip;
