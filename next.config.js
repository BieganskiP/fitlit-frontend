/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/],
  fallbacks: {
    document: '/offline',
  },
  runtimeCaching: [],
  dynamicStartUrl: false,
  reloadOnOnline: true,
})

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    trace: false,
  },
  telemetry: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      }
    }
    if (config.optimization) {
      config.optimization.providedExports = false;
    }
    return config
  },
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = withPWA(nextConfig) 