"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getProducts } from "@/lib/data";
import { Product } from "@/lib/type";
import Link from "next/link";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLFormElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("/search", newParams));
  }

  async function onInputChange(e: { target: { value: string } }) {
    setSearchValue(e.target.value);
    const data = await getProducts({
      keyword: e.target.value.toLowerCase(),
      limit: 5,
    });
    setSuggestions(data.products);
  }

  function onSuggestionClick(id: any) {
    router.push(`/product/${id}`);
    setSuggestions([]);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
      ref={searchRef}
    >
      <input
        key={searchParams?.get("q")}
        type="text"
        name="search"
        placeholder="Search for products..."
        autoComplete="off"
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        onChange={onInputChange}
        value={searchValue}
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
      {suggestions.length > 0 && (
        <ul
          className="absolute left-0 right-0 top-full z-10 rounded-lg border bg-white text-black shadow-md"
          ref={suggestionsRef}
        >
          {suggestions.map((product, index) => (
            <li
              key={index}
              onClick={() => onSuggestionClick(product.id)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
