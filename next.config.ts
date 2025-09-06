import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.builder.io",
        pathname: "/api/v1/image/assets/**",
      },
      {
        protocol: "https",
        hostname: "cdn.builder.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "perenual.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
