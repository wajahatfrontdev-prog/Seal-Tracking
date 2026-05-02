/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['@prisma/client', '@prisma/adapter-neon'],
}

module.exports = nextConfig
