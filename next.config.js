/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    EMAIL: 'dewasemadi@apps.ipb.ac.id',
    BASE_URL: 'https://todo.api.devcode.gethired.id',
  },
}

module.exports = nextConfig
