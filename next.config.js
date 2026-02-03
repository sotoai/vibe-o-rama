/** @type {import('next').NextConfig} */
const repo = "vibe-o-rama";

const nextConfig = {
  output: "export",
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
