import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "devpro.toolsey.com",
        port: "",
        pathname: "/core/blog_img/**",
      },
      {
        protocol: "https",
        hostname: "pro.toolsey.com",
        port: "",
        pathname: "/core/blog_img/**",
      },
      {
        protocol: "https",
        hostname: "web-dev.toolsey.net",
        port: "",
        pathname: "/core/blog_img/**",
      },
      {
        protocol: "https",
        hostname: "toolsey.com",
        port: "",
        pathname: "/core/blog_img/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;

