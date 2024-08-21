/** @type {import('next').NextConfig} */

const isLocal = process.env.NODE_ENV === "local";
const url = "13.58.161.1";
const nextConfig = {
  reactStrictMode: false,
  env: {
    FETCH_URL: isLocal ? "http://localhost:8001/find" : "/api",
    FETCH_TEXT_URL: isLocal
      ? "http://localhost:8001/get-text"
      : "/api/get-text",
    FETCH_CATEGORY_URL: isLocal
      ? "http://localhost:8001/category"
      : "/api/category",
    FETCH_NODE_URL: `http://${url}/find`,
    FETCH_NODE_CAT_URL: `http://${url}/category`,
    FETCH_NODE_TEXT_URL: `http://${url}/get-text`,
  },
};

export default nextConfig;
