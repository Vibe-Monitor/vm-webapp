import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/chat/new',
        destination: '/chat',
        permanent: false,
      },
      {
        source: '/settings',
        destination: '/settings/llm',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
