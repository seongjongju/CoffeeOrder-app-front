import type { NextConfig } from "next";
import withPWAInit from "next-pwa";
import runtimeCaching from "next-pwa/cache";

const isDev = process.env.NODE_ENV === "development";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: isDev, // dev에서는 PWA 비활성화
  buildExcludes: [
    /app-build-manifest\.json$/, // _next 관련 동적 파일 precache 제외
    /react-loadable-manifest\.json$/,
    /build-manifest\.json$/,
    /middleware-manifest\.json$/
  ],
  runtimeCaching, // 기본 runtime caching 사용
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 필요하면 추가 설정
  // basePath, rewrites 등
};

export default withPWA(nextConfig);