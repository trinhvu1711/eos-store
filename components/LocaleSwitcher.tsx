"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };
  return (
    <label className="rounded text-gray-50 dark:text-black ">
      <select
        defaultValue={localActive}
        className="bg-black py-2 dark:bg-transparent "
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value="en">English</option>
        <option value="vi">Việt</option>
      </select>
    </label>
  );
}
