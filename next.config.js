/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    appDir: true,
    scrollRestoration: true,
  },
}

const withMarkdoc = require("@markdoc/next.js")
module.exports = withMarkdoc()(nextConfig)
