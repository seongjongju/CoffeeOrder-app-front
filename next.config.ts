import type { NextConfig } from "next";
import withPWAInit from "next-pwa";
import runtimeCaching from "next-pwa/cache";

const isDev = process.env.NODE_ENV === "development";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: isDev, 
  customWorkerDir: 'worker/index.js',
  buildExcludes: [
    /app-build-manifest\.json$/, 
    /react-loadable-manifest\.json$/,
    /build-manifest\.json$/,
    /middleware-manifest\.json$/
  ],
});

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default withPWA(nextConfig);