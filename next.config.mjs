/** @type {import('next').NextConfig} */

const isTest = process.env.NODE_ENV === "test";
console.log("🚀 ~ isTest:", isTest);

const nextConfig = {
  reactStrictMode: false,
  env: {
    FETCH_URL: isTest
      ? "http://3.16.160.92/find"
      : "http://localhost:8001/find",
  },
};

export default nextConfig;
