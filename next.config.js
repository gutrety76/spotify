/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental:{
    appDir: false
  },
  images: {
    domains: ['127.0.0.1'],
  },
}

module.exports = nextConfig
