const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    opacity: ["responsive", "hover", "focus", "group-hover"],
  },
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      transitionDelay: {
        0: "0ms",
        100: "100ms",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        blink: {
          "0%": { opacity: 0.2 },
          "20%": { opacity: 1 },
          "100% ": { opacity: 0.2 },
        },
      },
      animation: {
        fadeIn: "fadeIn .3s ease-in-out",
        carousel: "marquee 60s linear infinite",
        blink: "blink 1.4s both infinite",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  variants: {
    extend: {
      transitionDelay: ["responsive"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/typography"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        },
      );
    }),
  ],
};
