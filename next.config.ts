import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack to avoid font loading issues in Next.js 16.3.0
  experimental: {
    turbo: undefined,
  },
};

export default nextConfig;
