import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "95.130.227.28",
        port: "8080",
        pathname: "/File/DownloadFile/download",
      },
    ],
  },
};

export default nextConfig;
