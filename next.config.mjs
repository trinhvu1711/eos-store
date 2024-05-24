/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  compiler: {
    styledComponents: {
      displayName: false,
    },
  },
};

export default nextConfig;
