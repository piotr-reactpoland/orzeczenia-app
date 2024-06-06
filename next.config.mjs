/** @type {import('next').NextConfig} */

const isLocal = process.env.NODE_ENV === "local";

const nextConfig = {
  reactStrictMode: false,
  env: {
    FETCH_URL: isLocal ? "http://localhost:8001/find" : "/api",
    FETCH_NODE_URL: "http://18.222.249.243/find",
  },
};

export default nextConfig;
