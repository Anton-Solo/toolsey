import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "devpro.toolsey.com",
        port: "",
        pathname: "/core/blog_img/**",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);

