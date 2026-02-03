/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/vibe-o-rama',
  assetPrefix: '/vibe-o-rama/',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
