/** @type {import('next').NextConfig} */
const nextConfig = {
  exportPathMap: async function (
      defaultPathMap,
      { dev, dir, outDir, distDir, buildId }
    ) {
      return {
        '/': { page: '/' },
        '/about': { page: '/about' }
      }
  },
  reactStrictMode: true,
  trailingSlash: true
}

module.exports = nextConfig;