/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["page.tsx", "page.ts", "page.jsx"],
};

module.exports = withPWA({
  ...nextConfig,
});
// module.exports = nextConfig;
