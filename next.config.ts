import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      }
    ]
  }
};

export default nextConfig;
