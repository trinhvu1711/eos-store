// components/ThemeToggle.js
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {resolvedTheme === "dark" ? (
        <MoonIcon
          className={clsx("h-4 transition-all ease-in-out hover:scale-110")}
        />
      ) : (
        <SunIcon
          className={clsx("h-4 transition-all ease-in-out hover:scale-110")}
        />
      )}
    </button>
  );
};

export default ThemeToggle;
