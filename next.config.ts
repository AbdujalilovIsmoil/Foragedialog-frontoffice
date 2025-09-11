import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "back.foragedialog.uz",
        pathname: "/File/DownloadFile/download/**", // /** query bilan keladigan barcha URLlarni qamrab oladi
      },
    ],
  },
};

export default nextConfig;
