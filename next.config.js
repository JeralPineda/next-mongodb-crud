/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['static.vecteezy.com'],
  },
};

module.exports = nextConfig;
