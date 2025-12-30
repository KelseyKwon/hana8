import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // basePath: '/post',
  reactCompiler: true,
  // cache component를 default로 잡기,
  cacheComponents: false,
  experimental: {
    typedEnv: true,
  },
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
