import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ ignores TS errors during build
  },
}

export default nextConfig
