// middleware.ts or .js
import createMiddleware from "next-intl/middleware";
import { pathnames, locales, localePrefix, defaultLocale } from "./config";

export default createMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix,
});

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(vi|en)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    // Exclude API routes from locale redirection
    "/((?!_next|_vercel|.*\\..*|api|api/auth).*)",
  ],
};
