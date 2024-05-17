/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "cdn.shopify.com", "i.ibb.co"],
    formats: ["image/avif", "image/webp"],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: {
      displayName: false,
    },
  },
};

export default nextConfig;
