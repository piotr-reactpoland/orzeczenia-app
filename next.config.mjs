/** @type {import('next').NextConfig} */

const isLocal = process.env.NODE_ENV === "local";

const nextConfig = {
  reactStrictMode: false,
  env: {
    FETCH_URL: isLocal ? "http://localhost:8001/find" : "/api",
    FETCH_CATEGORY_URL: isLocal
      ? "http://localhost:8001/category"
      : "/api/category",
    FETCH_NODE_URL: "http://3.14.87.213/find",
    FETCH_NODE_CAT_URL: "http://3.14.87.213/category",
  },
};

export default nextConfig;
