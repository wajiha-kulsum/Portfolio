import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 95 is for the HD cover pairs in My Work
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
