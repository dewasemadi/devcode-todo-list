/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: 'https://todo.api.devcode.gethired.id',
  },
}

module.exports = nextConfig
