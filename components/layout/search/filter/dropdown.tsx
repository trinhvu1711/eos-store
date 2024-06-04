"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ListItem } from ".";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { FilterItem } from "./item";

export default function FilterItemDropdown({ list }: { list: ListItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState("");
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener("click", handleClickOutSide);

    return () => {
      window.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  useEffect(() => {
    list.forEach((listItem: ListItem) => {
      if (
        ("path" in listItem && pathname === listItem.path) ||
        ("slug" in listItem && searchParams!.get("sort") === listItem.slug)
      ) {
        setActive(listItem.title);
      }
    });
  }, [list, pathname, searchParams]);

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => {
          setOpenSelect(!openSelect);
        }}
        className="flex items-center justify-between w-full px-4 py-2 text-sm border rounded border-black/30 dark:border-white/30"
      >
        <div>{active}</div>
        <ChevronDownIcon className="h-4" />
      </div>

      {openSelect && (
        <div
          onClick={() => {
            setOpenSelect(false);
          }}
          className="absolute z-40 w-full p-4 bg-white shadow-md rounded-b-md dark:bg-black"
        >
          {list.map((item: ListItem, i) => (
            <FilterItem key={i} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
