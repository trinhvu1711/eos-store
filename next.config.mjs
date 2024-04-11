/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "cdn.shopify.com", "i.ibb.co"],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
