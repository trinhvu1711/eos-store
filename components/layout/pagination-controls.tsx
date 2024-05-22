"use client";

import { FC } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPage: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  totalPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = Number(searchParams.get("page") ?? "0");
  const per_page = Number(searchParams.get("per_page") ?? "12");

  const buildUrl = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    params.set("per_page", per_page.toString());
    // Get current pathname
    return `${pathname}?${params.toString()}`; // Construct new URL
  };

  return (
    <div className="inline-flex items-center justify-center gap-3 dark:text-white">
      <a
        href="#"
        className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900  ${
          !hasPrevPage ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={(e) => {
          e.preventDefault();
          if (hasPrevPage) {
            router.push(buildUrl(page - 1));
          }
        }}
      >
        <span className="sr-only">Previous Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </a>

      <p className="text-xs text-gray-900 dark:text-white">
        {page + 1}
        <span className="mx-0.25">/</span>
        {totalPage}
      </p>

      <a
        href="#"
        className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 ${
          !hasNextPage ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={(e) => {
          e.preventDefault();
          if (hasNextPage) {
            router.push(buildUrl(page + 1));
          }
        }}
      >
        <span className="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>
  );
};

export default PaginationControls;
