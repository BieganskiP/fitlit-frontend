/** @type {import('next').NextConfig} */
const NextPWA = require("next-pwa");

const withPWA = NextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest\.json$/],
  fallbacks: {
    document: "/offline",
  },
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "offlineCache",
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
  scope: "/",
  sw: "/sw.js",
});

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }
    if (config.optimization) {
      config.optimization.providedExports = false;
    }
    return config;
  },
  poweredByHeader: false,
  generateEtags: false,
};

module.exports = withPWA(nextConfig);
