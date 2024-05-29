/** @type {import('next').NextConfig} */

const isLocal = process.env.NODE_ENV === "local";
console.log("🚀 ~ isTest:", isLocal);

const nextConfig = {
  reactStrictMode: false,
  env: {
    FETCH_URL: isLocal
      ? "http://localhost:8001/find"
      : "http://3.16.160.92/find",
  },
};

export default nextConfig;
