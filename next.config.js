/** @type {import('next').NextConfig} */
const nextConfig = {
  exportPathMap: async function (
      defaultPathMap,
      { dev, dir, outDir, distDir, buildId }
    ) {
      return {
        '/': { page: '/' }
      }
  },
  reactStrictMode: true,
  trailingSlash: false
}

module.exports = nextConfig;