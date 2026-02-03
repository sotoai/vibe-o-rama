/** @type {import('next').NextConfig} */
const repo = "vibe-o-rama";
const basePath = `/${repo}`;

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: `${basePath}/`,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
